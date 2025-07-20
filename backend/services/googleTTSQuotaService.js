const { google } = require('googleapis');
const textToSpeech = require('@google-cloud/text-to-speech');

class GoogleTTSQuotaService {
  constructor() {
    // Initialize Google Cloud TTS client with same auth as TTS service
    if (process.env.GOOGLE_CLOUD_API_KEY) {
      this.ttsClient = new textToSpeech.TextToSpeechClient({
        apiKey: process.env.GOOGLE_CLOUD_API_KEY
      });
    } else {
      this.ttsClient = new textToSpeech.TextToSpeechClient();
    }
    
    // Initialize Cloud Monitoring client for quota info
    this.projectId = 'pihappy-456017'; // From service account
    this.monitoringClient = null;
    this.quotaClient = null;
    
    this.initializeMonitoringClients();
  }

  async initializeMonitoringClients() {
    try {
      // Use same auth as TTS client
      const auth = await google.auth.getClient({
        scopes: [
          'https://www.googleapis.com/auth/cloud-platform',
          'https://www.googleapis.com/auth/monitoring.read',
          'https://www.googleapis.com/auth/service.management'
        ]
      });

      this.monitoringClient = google.monitoring({ version: 'v3', auth });
      this.quotaClient = google.serviceusage({ version: 'v1', auth });
    } catch (error) {
      console.warn('Could not initialize monitoring clients:', error.message);
    }
  }

  async getTTSTierInfo() {
    try {
      const tierInfo = {
        projectId: this.projectId,
        service: 'texttospeech.googleapis.com',
        timestamp: new Date().toISOString(),
        quotas: {},
        usage: {},
        tier: 'unknown',
        billing: {}
      };

      // Get basic service info
      const serviceInfo = await this.getServiceInfo();
      if (serviceInfo) {
        tierInfo.service = serviceInfo;
      }

      // Get quota information
      const quotaInfo = await this.getQuotaInfo();
      if (quotaInfo) {
        tierInfo.quotas = quotaInfo;
        // Determine tier based on quota limits
        tierInfo.tier = this.determineTier(quotaInfo);
      }

      // Get usage metrics
      const usageInfo = await this.getUsageMetrics();
      if (usageInfo) {
        tierInfo.usage = usageInfo;
      }

      return tierInfo;
    } catch (error) {
      console.error('Error getting TTS tier info:', error);
      return {
        error: error.message,
        projectId: this.projectId,
        timestamp: new Date().toISOString(),
        tier: 'error'
      };
    }
  }

  async getServiceInfo() {
    try {
      if (!this.quotaClient) {
        await this.initializeMonitoringClients();
      }

      const response = await this.quotaClient.services.get({
        name: `projects/${this.projectId}/services/texttospeech.googleapis.com`
      });

      return {
        name: response.data.config?.name || 'Cloud Text-to-Speech API',
        title: response.data.config?.title || 'Cloud Text-to-Speech API',
        state: response.data.state,
        enabled: response.data.state === 'ENABLED'
      };
    } catch (error) {
      console.warn('Could not get service info:', error.message);
      return null;
    }
  }

  async getQuotaInfo() {
    try {
      if (!this.quotaClient) {
        await this.initializeMonitoringClients();
      }

      // Get consumer quota metrics for TTS
      const response = await this.quotaClient.services.consumerQuotaMetrics.list({
        parent: `projects/${this.projectId}/services/texttospeech.googleapis.com`
      });

      const quotas = {};
      
      if (response.data.metrics) {
        response.data.metrics.forEach(metric => {
          const metricName = metric.metric;
          const quotaInfo = {
            displayName: metric.displayName,
            unit: metric.unit,
            limits: {}
          };

          if (metric.consumerQuotaLimits) {
            metric.consumerQuotaLimits.forEach(limit => {
              const limitKey = limit.dimensions ? 
                Object.keys(limit.dimensions).map(k => `${k}:${limit.dimensions[k]}`).join(',') : 
                'default';
              
              quotaInfo.limits[limitKey] = {
                quota: limit.quota,
                unit: limit.unit,
                dimensions: limit.dimensions
              };
            });
          }

          quotas[metricName] = quotaInfo;
        });
      }

      return quotas;
    } catch (error) {
      console.warn('Could not get quota info:', error.message);
      return {};
    }
  }

  async getUsageMetrics() {
    try {
      if (!this.monitoringClient) {
        await this.initializeMonitoringClients();
      }

      const endTime = new Date();
      const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000); // Last 24 hours

      // Get TTS API usage metrics
      const response = await this.monitoringClient.projects.timeSeries.list({
        name: `projects/${this.projectId}`,
        filter: 'metric.type="serviceruntime.googleapis.com/api/request_count" AND resource.label.service="texttospeech.googleapis.com"',
        'interval.endTime': endTime.toISOString(),
        'interval.startTime': startTime.toISOString(),
        aggregation: {
          alignmentPeriod: '3600s', // 1 hour
          perSeriesAligner: 'ALIGN_RATE',
          crossSeriesReducer: 'REDUCE_SUM'
        }
      });

      const usage = {
        period: '24h',
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        requests: 0,
        characters: 0,
        timeSeries: []
      };

      if (response.data.timeSeries && response.data.timeSeries.length > 0) {
        response.data.timeSeries.forEach(series => {
          if (series.points) {
            series.points.forEach(point => {
              usage.requests += parseFloat(point.value.doubleValue || 0);
            });
          }
          usage.timeSeries.push(series);
        });
      }

      return usage;
    } catch (error) {
      console.warn('Could not get usage metrics:', error.message);
      return {
        period: '24h',
        requests: 0,
        characters: 0,
        error: error.message
      };
    }
  }

  determineTier(quotaInfo) {
    // Determine tier based on quota limits
    // Google TTS tiers: Free (1M chars/month), Standard (pay-per-use), Premium (committed use)
    
    try {
      // Look for character quota limit
      const characterQuota = Object.values(quotaInfo).find(q => 
        q.displayName?.toLowerCase().includes('character') || 
        q.unit?.toLowerCase().includes('character')
      );

      if (characterQuota && characterQuota.limits) {
        const monthlyLimit = Object.values(characterQuota.limits).find(limit => 
          limit.dimensions && 
          Object.values(limit.dimensions).some(dim => dim.includes('month'))
        );

        if (monthlyLimit) {
          const quota = parseInt(monthlyLimit.quota);
          if (quota <= 1000000) { // 1M characters
            return 'free';
          } else if (quota <= 10000000) { // 10M characters
            return 'standard';
          } else {
            return 'premium';
          }
        }
      }

      // If no character quota found, check if service is enabled (likely paid)
      if (Object.keys(quotaInfo).length > 0) {
        return 'standard';
      }

      return 'unknown';
    } catch (error) {
      console.warn('Error determining tier:', error.message);
      return 'unknown';
    }
  }

  async getVoicePricing() {
    // Return pricing info for different voice types
    return {
      standard: {
        price: '$4.00 per 1M characters',
        description: 'Standard voices (not WaveNet)'
      },
      wavenet: {
        price: '$16.00 per 1M characters', 
        description: 'WaveNet voices (premium quality)'
      },
      neural2: {
        price: '$16.00 per 1M characters',
        description: 'Neural2 voices (latest generation)'
      },
      chirp3_hd: {
        price: '$16.00 per 1M characters',
        description: 'Chirp3-HD voices (ultra-premium quality, 2025)',
        features: ['Ultra-realistic speech', 'Natural intonation', 'No SSML support', 'No pitch adjustments']
      },
      studio: {
        price: '$160.00 per 1M characters',
        description: 'Studio voices (highest quality for professional use)'
      },
      free_tier: {
        price: 'Free',
        description: 'First 1M characters per month (includes WaveNet, Neural2, Chirp3-HD)',
        limit: '1,000,000 characters/month'
      }
    };
  }

  async estimateMonthlyUsage(dailyRequests = 100, avgCharactersPerRequest = 500) {
    const monthlyRequests = dailyRequests * 30;
    const monthlyCharacters = monthlyRequests * avgCharactersPerRequest;
    
    const pricing = await this.getVoicePricing();
    
    // Assume WaveNet usage (what the app currently uses)
    const freeChars = 1000000; // 1M free per month
    const paidChars = Math.max(0, monthlyCharacters - freeChars);
    
    const estimatedCost = (paidChars / 1000000) * 16; // $16 per 1M chars for WaveNet
    
    return {
      monthlyRequests,
      monthlyCharacters,
      freeCharacters: Math.min(monthlyCharacters, freeChars),
      paidCharacters: paidChars,
      estimatedCost: estimatedCost.toFixed(2),
      currency: 'USD'
    };
  }
}

module.exports = GoogleTTSQuotaService;