const GoogleTTSQuotaService = require('./googleTTSQuotaService');

class QuotaMonitoringService {
  constructor() {
    this.quotaService = new GoogleTTSQuotaService();
    this.alertThresholds = {
      warning: 0.8, // 80% of quota
      critical: 0.95 // 95% of quota
    };
    this.lastCheck = null;
    this.checkInterval = 30 * 60 * 1000; // 30 minutes
  }

  async checkQuotaStatus() {
    try {
      const tierInfo = await this.quotaService.getTTSTierInfo();
      const now = new Date();
      
      // Basic quota analysis
      const alerts = this.analyzeQuotas(tierInfo);
      
      this.lastCheck = now;
      
      return {
        timestamp: now.toISOString(),
        status: alerts.length === 0 ? 'healthy' : 'warning',
        alerts: alerts,
        tierInfo: {
          tier: tierInfo.tier,
          projectId: tierInfo.projectId,
          usage: tierInfo.usage
        }
      };
    } catch (error) {
      console.error('Error checking quota status:', error);
      return {
        timestamp: new Date().toISOString(),
        status: 'error',
        error: error.message,
        alerts: [{
          type: 'error',
          severity: 'critical',
          message: 'Unable to check quota status',
          details: error.message
        }]
      };
    }
  }

  analyzeQuotas(tierInfo) {
    const alerts = [];

    // Check if service is enabled
    if (!tierInfo.service?.enabled) {
      alerts.push({
        type: 'service_disabled',
        severity: 'critical',
        message: 'Google Cloud TTS service is not enabled',
        recommendation: 'Enable the Text-to-Speech API in Google Cloud Console',
        actionUrl: `https://console.cloud.google.com/apis/library/texttospeech.googleapis.com?project=${tierInfo.projectId}`
      });
    }

    // Check for quota information availability
    if (!tierInfo.quotas || Object.keys(tierInfo.quotas).length === 0) {
      alerts.push({
        type: 'quota_info_unavailable',
        severity: 'warning',
        message: 'Quota information is not available',
        recommendation: 'Check API permissions and service account configuration',
        details: 'This might indicate insufficient permissions to read quota data'
      });
    }

    // Analyze usage patterns
    if (tierInfo.usage && tierInfo.usage.requests > 0) {
      const dailyRequests = tierInfo.usage.requests;
      
      // Estimate monthly usage based on daily pattern
      const estimatedMonthlyRequests = dailyRequests * 30;
      
      // Basic threshold checks (these would be more sophisticated with actual quota data)
      if (tierInfo.tier === 'free') {
        // Free tier typically has 1M characters/month limit for WaveNet
        const estimatedMonthlyChars = estimatedMonthlyRequests * 500; // Assume 500 chars per request
        const freeLimit = 1000000; // 1M characters
        
        const usage = estimatedMonthlyChars / freeLimit;
        
        if (usage > this.alertThresholds.critical) {
          alerts.push({
            type: 'quota_critical',
            severity: 'critical',
            message: `Estimated monthly usage will exceed free tier limit`,
            recommendation: 'Consider upgrading to paid plan or reduce usage',
            details: {
              estimatedUsage: estimatedMonthlyChars,
              limit: freeLimit,
              percentage: (usage * 100).toFixed(1)
            },
            actionUrl: `https://console.cloud.google.com/billing?project=${tierInfo.projectId}`
          });
        } else if (usage > this.alertThresholds.warning) {
          alerts.push({
            type: 'quota_warning',
            severity: 'warning',
            message: `Approaching free tier limit`,
            recommendation: 'Monitor usage closely or consider upgrading',
            details: {
              estimatedUsage: estimatedMonthlyChars,
              limit: freeLimit,
              percentage: (usage * 100).toFixed(1)
            }
          });
        }
      }

      // Check for unusual usage spikes
      if (dailyRequests > 1000) {
        alerts.push({
          type: 'high_usage',
          severity: 'warning',
          message: `High daily usage detected: ${dailyRequests} requests`,
          recommendation: 'Monitor for unexpected usage patterns',
          details: {
            dailyRequests: dailyRequests,
            estimatedMonthlyCost: this.estimateMonthlyCost(dailyRequests * 30)
          }
        });
      }
    }

    // Check if using expensive voice types
    if (tierInfo.tier !== 'free') {
      alerts.push({
        type: 'voice_cost_info',
        severity: 'info',
        message: 'Using WaveNet voices (premium pricing)',
        recommendation: 'Current app uses WaveNet voices at $16/1M characters',
        details: {
          voiceType: 'WaveNet',
          cost: '$16.00 per 1M characters',
          freeMonthlyLimit: '1M characters'
        }
      });
    }

    return alerts;
  }

  estimateMonthlyCost(monthlyRequests, avgCharsPerRequest = 500) {
    const monthlyChars = monthlyRequests * avgCharsPerRequest;
    const freeChars = 1000000; // 1M free per month
    const paidChars = Math.max(0, monthlyChars - freeChars);
    const cost = (paidChars / 1000000) * 16; // $16 per 1M chars for WaveNet
    
    return {
      monthlyRequests,
      monthlyChars,
      freeChars: Math.min(monthlyChars, freeChars),
      paidChars,
      estimatedCost: cost.toFixed(2),
      currency: 'USD'
    };
  }

  shouldCheckQuota() {
    if (!this.lastCheck) return true;
    const timeSinceLastCheck = Date.now() - this.lastCheck.getTime();
    return timeSinceLastCheck >= this.checkInterval;
  }

  async getQuotaAlerts() {
    if (this.shouldCheckQuota()) {
      return await this.checkQuotaStatus();
    }
    
    // Return cached result if recent check was performed
    return {
      timestamp: this.lastCheck?.toISOString(),
      status: 'cached',
      message: 'Using cached quota status',
      nextCheck: new Date(this.lastCheck.getTime() + this.checkInterval).toISOString()
    };
  }

  // Get recommendations based on current usage and tier
  async getOptimizationRecommendations() {
    const tierInfo = await this.quotaService.getTTSTierInfo();
    const recommendations = [];

    if (tierInfo.tier === 'free') {
      recommendations.push({
        type: 'cost_optimization',
        title: 'Maximize Free Tier Usage',
        description: 'You have 1M free WaveNet characters per month',
        actions: [
          'Monitor monthly usage carefully',
          'Consider Standard voices for non-critical content',
          'Implement caching for frequently used audio'
        ]
      });
    }

    if (tierInfo.usage?.requests > 100) {
      recommendations.push({
        type: 'performance_optimization',
        title: 'Optimize Request Patterns',
        description: 'High usage detected - consider optimization',
        actions: [
          'Implement audio caching to reduce repeat requests',
          'Consider pre-generating common meditation content',
          'Use shorter meditation scripts for testing'
        ]
      });
    }

    recommendations.push({
      type: 'monitoring',
      title: 'Set Up Monitoring',
      description: 'Keep track of your TTS usage and costs',
      actions: [
        'Set up billing alerts in Google Cloud Console',
        'Monitor quota usage regularly',
        'Review monthly usage patterns'
      ]
    });

    return recommendations;
  }
}

module.exports = QuotaMonitoringService;