const express = require('express');
const router = express.Router();
const GoogleTTSQuotaService = require('../services/googleTTSQuotaService');
const QuotaMonitoringService = require('../services/quotaMonitoring');

// Initialize services
const quotaService = new GoogleTTSQuotaService();
const monitoringService = new QuotaMonitoringService();

// Get comprehensive TTS tier and usage information
router.get('/', async (req, res) => {
  try {
    const tierInfo = await quotaService.getTTSTierInfo();
    res.json({
      success: true,
      data: tierInfo
    });
  } catch (error) {
    console.error('Error fetching TTS tier info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch TTS tier information',
      details: error.message
    });
  }
});

// Get voice pricing information
router.get('/pricing', async (req, res) => {
  try {
    const pricing = await quotaService.getVoicePricing();
    res.json({
      success: true,
      data: pricing
    });
  } catch (error) {
    console.error('Error fetching pricing info:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pricing information',
      details: error.message
    });
  }
});

// Get usage estimation based on provided parameters
router.post('/estimate', async (req, res) => {
  try {
    const { dailyRequests = 100, avgCharactersPerRequest = 500 } = req.body;
    
    // Validate input
    if (dailyRequests < 0 || dailyRequests > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Daily requests must be between 0 and 10,000'
      });
    }
    
    if (avgCharactersPerRequest < 0 || avgCharactersPerRequest > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Average characters per request must be between 0 and 10,000'
      });
    }
    
    const estimate = await quotaService.estimateMonthlyUsage(
      parseInt(dailyRequests), 
      parseInt(avgCharactersPerRequest)
    );
    
    res.json({
      success: true,
      data: estimate
    });
  } catch (error) {
    console.error('Error calculating usage estimate:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate usage estimate',
      details: error.message
    });
  }
});

// Get simplified tier status (for quick checks)
router.get('/status', async (req, res) => {
  try {
    const tierInfo = await quotaService.getTTSTierInfo();
    
    // Return simplified status
    const status = {
      tier: tierInfo.tier,
      enabled: tierInfo.service?.enabled || false,
      projectId: tierInfo.projectId,
      hasQuotas: Object.keys(tierInfo.quotas || {}).length > 0,
      dailyRequests: tierInfo.usage?.requests || 0,
      timestamp: tierInfo.timestamp
    };
    
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error('Error fetching TTS status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch TTS status',
      details: error.message
    });
  }
});

// Get quota alerts and warnings
router.get('/alerts', async (req, res) => {
  try {
    const alertStatus = await monitoringService.getQuotaAlerts();
    
    res.json({
      success: true,
      data: alertStatus
    });
  } catch (error) {
    console.error('Error fetching quota alerts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch quota alerts',
      details: error.message
    });
  }
});

// Get optimization recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const recommendations = await monitoringService.getOptimizationRecommendations();
    
    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recommendations',
      details: error.message
    });
  }
});

// Force quota check (bypasses cache)
router.post('/check', async (req, res) => {
  try {
    const alertStatus = await monitoringService.checkQuotaStatus();
    
    res.json({
      success: true,
      data: alertStatus
    });
  } catch (error) {
    console.error('Error performing quota check:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to perform quota check',
      details: error.message
    });
  }
});

module.exports = router;