// ElevenLabs character tracking and cost calculation utilities
const User = require('../models/User');

// ElevenLabs pricing tiers (as of 2024)
const PRICING_TIERS = [
  { limit: 10000, price: 0 },          // Free tier: 10k chars free
  { limit: 30000, price: 5 },          // Starter: $5/month for 30k chars
  { limit: 100000, price: 22 },        // Creator: $22/month for 100k chars
  { limit: 500000, price: 99 },        // Pro: $99/month for 500k chars
  { limit: 2000000, price: 330 }       // Scale: $330/month for 2M chars
];

// Calculate cost based on character usage
function calculateCost(charactersUsed) {
  if (charactersUsed <= 10000) {
    return 0; // Free tier
  }
  
  // Find the appropriate tier
  for (let i = 1; i < PRICING_TIERS.length; i++) {
    if (charactersUsed <= PRICING_TIERS[i].limit) {
      return PRICING_TIERS[i].price;
    }
  }
  
  // If usage exceeds all tiers, calculate based on highest tier
  return PRICING_TIERS[PRICING_TIERS.length - 1].price;
}

// Check if monthly reset is needed
function needsMonthlyReset(lastReset) {
  const now = new Date();
  const lastResetDate = new Date(lastReset);
  
  return now.getMonth() !== lastResetDate.getMonth() || 
         now.getFullYear() !== lastResetDate.getFullYear();
}

// Track ElevenLabs character usage
async function trackElevenlabsUsage(userId, text, isPreview = false) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.warn('User not found for ElevenLabs tracking:', userId);
      return;
    }
    
    const characterCount = text.length;
    
    // Check if monthly reset is needed
    if (needsMonthlyReset(user.lastElevenlabsReset)) {
      user.elevenlabsCharactersThisMonth = 0;
      user.lastElevenlabsReset = new Date();
    }
    
    // Update character counts
    user.elevenlabsCharactersUsed += characterCount;
    user.elevenlabsCharactersThisMonth += characterCount;
    
    // Calculate new cost
    user.elevenlabsCosts = calculateCost(user.elevenlabsCharactersThisMonth);
    
    await user.save();
    
    console.log(`ElevenLabs usage tracked for user ${userId}: ${characterCount} chars, total this month: ${user.elevenlabsCharactersThisMonth}`);
    
  } catch (error) {
    console.error('Error tracking ElevenLabs usage:', error);
  }
}

// Fetch real ElevenLabs subscription data
async function fetchRealElevenlabsData() {
  try {
    const axios = require('axios');
    const response = await axios.get('https://api.elevenlabs.io/v1/user/subscription', {
      headers: {
        'xi-api-key': process.env.ELEVEN_LABS_API_KEY
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching real ElevenLabs data:', error);
    return null;
  }
}

// Get ElevenLabs stats for a user
async function getElevenlabsStats(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return null;
    }
    
    // Try to fetch real ElevenLabs data
    const realData = await fetchRealElevenlabsData();
    
    if (realData) {
      console.log('Real ElevenLabs data:', JSON.stringify(realData, null, 2));
      // Use real data from ElevenLabs API
      return {
        charactersUsedTotal: realData.character_count,
        charactersUsedThisMonth: realData.character_count,
        estimatedCostThisMonth: realData.next_character_count_reset_unix ? 0 : calculateCost(realData.character_count),
        currentTier: {
          name: realData.tier || 'Free',
          limit: realData.character_limit,
          price: realData.tier === 'free' ? 0 : realData.tier === 'starter' ? 5 : realData.tier === 'creator' ? 22 : realData.tier === 'pro' ? 99 : 330
        },
        nextTierLimit: realData.character_limit,
        lastReset: realData.next_character_count_reset_unix ? new Date(realData.next_character_count_reset_unix * 1000) : new Date(),
        source: 'elevenlabs_api'
      };
    }
    
    // Fallback to local tracking if API fails
    // Check if monthly reset is needed
    if (needsMonthlyReset(user.lastElevenlabsReset)) {
      user.elevenlabsCharactersThisMonth = 0;
      user.elevenlabsCosts = 0;
      user.lastElevenlabsReset = new Date();
      await user.save();
    }
    
    return {
      charactersUsedTotal: user.elevenlabsCharactersUsed,
      charactersUsedThisMonth: user.elevenlabsCharactersThisMonth,
      estimatedCostThisMonth: user.elevenlabsCosts,
      currentTier: getCurrentTier(user.elevenlabsCharactersThisMonth),
      nextTierLimit: getNextTierLimit(user.elevenlabsCharactersThisMonth),
      lastReset: user.lastElevenlabsReset,
      source: 'local_tracking'
    };
    
  } catch (error) {
    console.error('Error getting ElevenLabs stats:', error);
    return null;
  }
}

// Get current pricing tier
function getCurrentTier(charactersUsed) {
  for (let i = 0; i < PRICING_TIERS.length; i++) {
    if (charactersUsed <= PRICING_TIERS[i].limit) {
      return {
        name: i === 0 ? 'Free' : `Tier ${i}`,
        limit: PRICING_TIERS[i].limit,
        price: PRICING_TIERS[i].price
      };
    }
  }
  
  const lastTier = PRICING_TIERS[PRICING_TIERS.length - 1];
  return {
    name: 'Scale+',
    limit: lastTier.limit,
    price: lastTier.price
  };
}

// Get next tier limit
function getNextTierLimit(charactersUsed) {
  for (let i = 0; i < PRICING_TIERS.length; i++) {
    if (charactersUsed < PRICING_TIERS[i].limit) {
      return PRICING_TIERS[i].limit;
    }
  }
  return null; // Already at highest tier
}

module.exports = {
  trackElevenlabsUsage,
  getElevenlabsStats,
  calculateCost,
  needsMonthlyReset
};