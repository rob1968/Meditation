const express = require('express');
const router = express.Router();
const textToSpeech = require('@google-cloud/text-to-speech');
const { getFriendlyVoiceInfo, friendlyVoiceNames } = require('../services/friendlyVoiceNames');

// Initialize Google Cloud TTS client with API key if available
let client;
if (process.env.GOOGLE_CLOUD_API_KEY) {
  // Use API key authentication
  client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_CLOUD_API_KEY
  });
} else {
  // Use service account authentication
  client = new textToSpeech.TextToSpeechClient();
}

// Get available Google voices (including our configured voices)
router.get('/', async (req, res) => {
  try {
    // Group voices by language from our configuration
    const voicesByLanguage = {};
    
    // Process all voices from our friendly names configuration
    Object.entries(friendlyVoiceNames).forEach(([voiceId, voiceInfo]) => {
      // Extract language code from voice ID (e.g., fr-FR-Wavenet-A -> fr-FR)
      const parts = voiceId.split('-');
      let languageCode;
      
      if (parts[0] === 'cmn') {
        languageCode = 'cmn-CN';
      } else {
        languageCode = parts.slice(0, 2).join('-');
      }
      
      if (!voicesByLanguage[languageCode]) {
        voicesByLanguage[languageCode] = [];
      }
      
      // Determine voice type with priority order
      let voiceType = 'WaveNet'; // Default
      if (voiceId.includes('Chirp3-HD')) {
        voiceType = 'Chirp3-HD';
      } else if (voiceId.includes('Studio')) {
        voiceType = 'Studio';
      } else if (voiceId.includes('Neural2')) {
        voiceType = 'Neural2';
      } else if (voiceId.includes('Polyglot')) {
        voiceType = 'Polyglot';
      }
      
      // Determine gender from voice info or voice ID patterns
      let gender = voiceInfo.gender.toUpperCase();
      if (gender !== 'MALE' && gender !== 'FEMALE') {
        gender = 'NEUTRAL';
      }
      
      voicesByLanguage[languageCode].push({
        id: voiceId,
        name: voiceInfo.name,
        friendlyName: voiceInfo.name,
        languageCode: languageCode,
        gender: gender,
        type: voiceType,
        technicalId: voiceId,
        premium: voiceType === 'Chirp3-HD' || voiceType === 'Studio',
        quality: voiceType === 'Chirp3-HD' ? 'Ultra-Premium' : 
                voiceType === 'Studio' ? 'Premium' :
                voiceType === 'Neural2' ? 'High' : 'Standard'
      });
    });
    
    // Sort languages and voices within each language by quality and name
    const sortedVoices = {};
    Object.keys(voicesByLanguage).sort().forEach(lang => {
      sortedVoices[lang] = voicesByLanguage[lang].sort((a, b) => {
        // Sort by quality first (Chirp3-HD > Studio > Neural2 > WaveNet), then by name
        const qualityOrder = { 'Chirp3-HD': 0, 'Studio': 1, 'Neural2': 2, 'WaveNet': 3, 'Polyglot': 4 };
        const qualityDiff = (qualityOrder[a.type] || 5) - (qualityOrder[b.type] || 5);
        return qualityDiff !== 0 ? qualityDiff : a.name.localeCompare(b.name);
      });
    });
    
    // Add metadata about voice counts
    const metadata = {
      totalVoices: Object.values(sortedVoices).reduce((sum, voices) => sum + voices.length, 0),
      languageCount: Object.keys(sortedVoices).length,
      voiceTypes: {
        'Chirp3-HD': 0,
        'Studio': 0,
        'Neural2': 0,
        'WaveNet': 0,
        'Polyglot': 0
      }
    };
    
    Object.values(sortedVoices).flat().forEach(voice => {
      metadata.voiceTypes[voice.type] = (metadata.voiceTypes[voice.type] || 0) + 1;
    });
    
    res.json({
      voices: sortedVoices,
      metadata: metadata
    });
  } catch (error) {
    console.error('Error fetching Google voices:', error);
    res.status(500).json({ error: 'Failed to fetch Google voices' });
  }
});

module.exports = router;