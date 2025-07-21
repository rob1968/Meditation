const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

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

// Voice mappings for different languages - using verified existing voices only
// Conservative selection to avoid "voice does not exist" errors
const voiceMap = {
  'en': { languageCode: 'en-US', name: 'en-US-Wavenet-F', ssmlGender: 'FEMALE' }, // Verified WaveNet female voice
  'es': { languageCode: 'es-ES', name: 'es-ES-Wavenet-C', ssmlGender: 'FEMALE' }, // Verified WaveNet female for Spanish
  'fr': { languageCode: 'fr-FR', name: 'fr-FR-Wavenet-C', ssmlGender: 'FEMALE' }, // Verified WaveNet female for French
  'de': { languageCode: 'de-DE', name: 'de-DE-Wavenet-F', ssmlGender: 'FEMALE' }, // Verified WaveNet female for German
  'nl': { languageCode: 'nl-NL', name: 'nl-NL-Wavenet-D', ssmlGender: 'FEMALE' }, // Verified WaveNet female for Dutch
  'zh': { languageCode: 'cmn-CN', name: 'cmn-CN-Wavenet-D', ssmlGender: 'FEMALE' }, // Verified WaveNet female for Chinese
  'hi': { languageCode: 'hi-IN', name: 'hi-IN-Wavenet-D', ssmlGender: 'FEMALE' }, // Verified WaveNet female for Hindi
  'ar': { languageCode: 'ar-XA', name: 'ar-XA-Wavenet-D', ssmlGender: 'FEMALE' }, // Verified WaveNet female for Arabic
  'pt': { languageCode: 'pt-BR', name: 'pt-BR-Wavenet-C', ssmlGender: 'FEMALE' }, // Verified WaveNet female for Portuguese
  'ru': { languageCode: 'ru-RU', name: 'ru-RU-Wavenet-D', ssmlGender: 'FEMALE' }, // Verified WaveNet female for Russian
  'ja': { languageCode: 'ja-JP', name: 'ja-JP-Wavenet-B', ssmlGender: 'FEMALE' }, // Verified WaveNet female for Japanese
  'ko': { languageCode: 'ko-KR', name: 'ko-KR-Wavenet-B', ssmlGender: 'FEMALE' }, // Verified WaveNet female for Korean
  'it': { languageCode: 'it-IT', name: 'it-IT-Wavenet-B', ssmlGender: 'MALE' }  // Verified WaveNet male for Italian (female B not available)
};

// Premium voice mappings - conservative selection to ensure reliability
// Gradually add more premium voices as they are verified to exist
const premiumVoiceMap = {
  'en': { languageCode: 'en-US', name: 'en-US-Chirp3-HD-Kore', ssmlGender: 'FEMALE' }, // Ultra-premium Chirp3-HD (verified in friendlyVoiceNames)
  'es': { languageCode: 'es-ES', name: 'es-ES-Wavenet-C', ssmlGender: 'FEMALE' }, // Conservative WaveNet for Spanish
  'fr': { languageCode: 'fr-FR', name: 'fr-FR-Chirp3-HD-Achernar', ssmlGender: 'FEMALE' }, // Test Chirp3-HD for French (verified in friendlyVoiceNames)
  'de': { languageCode: 'de-DE', name: 'de-DE-Wavenet-F', ssmlGender: 'FEMALE' }, // Conservative WaveNet for German
  'nl': { languageCode: 'nl-NL', name: 'nl-NL-Wavenet-D', ssmlGender: 'FEMALE' }, // Verified WaveNet for Dutch
  // Use verified WaveNet voices for other languages until premium voices are confirmed
  'zh': { languageCode: 'cmn-CN', name: 'cmn-CN-Wavenet-D', ssmlGender: 'FEMALE' },
  'hi': { languageCode: 'hi-IN', name: 'hi-IN-Wavenet-D', ssmlGender: 'FEMALE' },
  'ar': { languageCode: 'ar-XA', name: 'ar-XA-Wavenet-D', ssmlGender: 'FEMALE' },
  'pt': { languageCode: 'pt-BR', name: 'pt-BR-Wavenet-C', ssmlGender: 'FEMALE' },
  'ru': { languageCode: 'ru-RU', name: 'ru-RU-Wavenet-D', ssmlGender: 'FEMALE' },
  'ja': { languageCode: 'ja-JP', name: 'ja-JP-Wavenet-B', ssmlGender: 'FEMALE' },
  'ko': { languageCode: 'ko-KR', name: 'ko-KR-Wavenet-B', ssmlGender: 'FEMALE' },
  'it': { languageCode: 'it-IT', name: 'it-IT-Wavenet-B', ssmlGender: 'MALE' }
};

// Convert text to plain text for Chirp3-HD voices (no SSML support)
const convertToPlainText = (text) => {
  let plainText = text;
  
  // Replace special pause commands with natural punctuation
  plainText = plainText.replace(/\[PAUSE:(\d+)\]/g, (match, seconds) => {
    return seconds > 5 ? '... ' : '. ';
  });
  
  plainText = plainText.replace(/\[SILENCE:(\d+)\]/g, (match, seconds) => {
    return seconds > 5 ? '... ' : '. ';
  });
  
  plainText = plainText.replace(/\[BREATHE:(\d+)\]/g, (match, count) => {
    return '. ';
  });
  
  // Convert dot-based pauses to natural punctuation
  plainText = plainText.replace(/\.{15}/g, '... ');
  plainText = plainText.replace(/\.{12}/g, '... ');
  plainText = plainText.replace(/\.{9}/g, '... ');
  plainText = plainText.replace(/\.{6}/g, '.. ');
  plainText = plainText.replace(/\.{3}/g, '. ');
  
  // Clean up multiple spaces
  plainText = plainText.replace(/\s+/g, ' ').trim();
  
  return plainText;
};

// Convert text to SSML format with proper pause tags
const convertToSSML = (text) => {
  // Google TTS supports proper SSML breaks
  let ssmlText = text;
  
  // Process special pause commands first (e.g., [PAUSE:30], [SILENCE:60], [BREATHE:5])
  ssmlText = ssmlText.replace(/\[PAUSE:(\d+)\]/g, (match, seconds) => {
    return `<break time="${seconds}s"/>`;
  });
  
  ssmlText = ssmlText.replace(/\[SILENCE:(\d+)\]/g, (match, seconds) => {
    return `<break time="${seconds}s"/>`;
  });
  
  ssmlText = ssmlText.replace(/\[BREATHE:(\d+)\]/g, (match, count) => {
    // Each breath cycle is approximately 4 seconds (2s in, 2s out)
    const totalSeconds = parseInt(count) * 4;
    return `<break time="${totalSeconds}s"/>`;
  });
  
  // Process dot-based pauses from longest to shortest
  // Extra long pause: 15 dots → 20 seconds (for deep meditation)
  ssmlText = ssmlText.replace(/\.{15}/g, '<break time="20s"/>');
  
  // Very long pause: 12 dots → 15 seconds (for visualization)
  ssmlText = ssmlText.replace(/\.{12}/g, '<break time="15s"/>');
  
  // Long pause: 9 dots → 10 seconds (for deep stillness)
  ssmlText = ssmlText.replace(/\.{9}/g, '<break time="10s"/>');
  
  // Medium pause: 6 dots → 5 seconds (for reflection)
  ssmlText = ssmlText.replace(/\.{6}/g, '<break time="5s"/>');
  
  // Short pause: 3 dots → 2 seconds (for breathing)
  ssmlText = ssmlText.replace(/\.{3}/g, '<break time="2s"/>');
  
  // Wrap in SSML speak tags
  return `<speak>${ssmlText}</speak>`;
};

const generateGoogleTTS = async (text, language = 'en', voiceId = null, isPreview = false, usePremium = false, customTempo = null) => {
  try {
    let voice;
    
    if (voiceId) {
      // Use specific voice if provided
      // Extract language code from voice name (e.g., en-US-Wavenet-F -> en-US)
      let languageCode = voiceId.split('-').slice(0, 2).join('-');
      
      // Special case for Chinese voices (cmn-CN)
      if (voiceId.startsWith('cmn-')) {
        languageCode = 'cmn-CN';
      }
      
      voice = {
        name: voiceId,
        languageCode: languageCode
      };
    } else {
      // Choose voice map based on premium preference
      const selectedMap = usePremium ? premiumVoiceMap : voiceMap;
      voice = selectedMap[language] || selectedMap['en'] || voiceMap['en'];
    }
    
    // Convert text to appropriate format based on voice capabilities
    const supportsSSML = !voice.name.includes('Chirp3-HD') && 
                         !voice.name.includes('Studio');
    
    const processedText = supportsSSML ? convertToSSML(text) : convertToPlainText(text);
    
    // Intelligent tempo distribution for TTS providers
    let pitch = -2.0;
    let speakingRate = 0.75;
    
    // Don't apply custom tempo - will be handled by FFmpeg for consistency
    if (voiceId) {
      // Extract voice letter (e.g., Wavenet-A, Wavenet-B, etc.)
      const voiceLetter = voiceId.split('-').pop();
      
      // Vary pitch and speed based on voice letter for more distinction
      switch(voiceLetter) {
        case 'A':
          pitch = -1.0;
          speakingRate = 0.8;
          break;
        case 'B':
          pitch = -2.5;
          speakingRate = 0.75;
          break;
        case 'C':
          pitch = 0;
          speakingRate = 0.85;
          break;
        case 'D':
          pitch = -3.0;
          speakingRate = 0.7;
          break;
        case 'E':
          pitch = 1.0;
          speakingRate = 0.9;
          break;
        case 'F':
          pitch = -2.0;
          speakingRate = 0.75;
          break;
        case 'G':
          pitch = -1.5;
          speakingRate = 0.77;
          break;
        case 'H':
          pitch = 0.5;
          speakingRate = 0.82;
          break;
        case 'I':
          pitch = -2.8;
          speakingRate = 0.73;
          break;
        case 'J':
          pitch = -0.5;
          speakingRate = 0.88;
          break;
        default:
          // Keep defaults
      }
    }
    
    // For previews, use normal speed to better hear differences
    if (isPreview) {
      speakingRate = Math.min(1.0, speakingRate + 0.15);
    }
    
    // Construct the request
    const audioConfig = {
      audioEncoding: 'MP3',
      speakingRate: speakingRate,
      volumeGainDb: 0.0,
      effectsProfileId: ['headphone-class-device'] // Optimize for headphone listening
    };
    
    // Chirp3-HD and Studio voices don't support pitch parameters
    const supportsCustomPitch = !voice.name.includes('Chirp3-HD') && 
                               !voice.name.includes('Studio');
    
    if (supportsCustomPitch) {
      audioConfig.pitch = pitch;
    }
    
    console.log(`🔧 GOOGLE TTS CONFIG: speakingRate = ${audioConfig.speakingRate} (tempo will be applied via FFmpeg), pitch = ${audioConfig.pitch || 'not supported'}`);
    
    const request = {
      input: supportsSSML ? { ssml: processedText } : { text: processedText },
      voice: voice,
      audioConfig: audioConfig
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    
    return response.audioContent;
  } catch (error) {
    console.error('Google TTS Error:', error);
    
    // If voice doesn't exist, try fallback voice
    if (error.code === 3 && error.details && error.details.includes('does not exist')) {
      console.log(`Voice ${voice.name} doesn't exist, trying fallback...`);
      
      // Try a basic fallback voice for the language
      const fallbackVoices = {
        'en-US': 'en-US-Wavenet-F',
        'nl-NL': 'nl-NL-Wavenet-D',
        'fr-FR': 'fr-FR-Wavenet-C',
        'de-DE': 'de-DE-Wavenet-F',
        'es-ES': 'es-ES-Wavenet-C',
        'it-IT': 'it-IT-Wavenet-B',
        'pt-BR': 'pt-BR-Wavenet-C',
        'ja-JP': 'ja-JP-Wavenet-B',
        'ko-KR': 'ko-KR-Wavenet-B',
        'cmn-CN': 'cmn-CN-Wavenet-D',
        'hi-IN': 'hi-IN-Wavenet-D',
        'ar-XA': 'ar-XA-Wavenet-D',
        'ru-RU': 'ru-RU-Wavenet-D'
      };
      
      const fallbackVoice = fallbackVoices[voice.languageCode];
      if (fallbackVoice && fallbackVoice !== voice.name) {
        console.log(`Trying fallback voice: ${fallbackVoice}`);
        
        const fallbackRequest = {
          ...request,
          voice: {
            name: fallbackVoice,
            languageCode: voice.languageCode
          }
        };
        
        try {
          const [fallbackResponse] = await client.synthesizeSpeech(fallbackRequest);
          return fallbackResponse.audioContent;
        } catch (fallbackError) {
          console.error('Fallback voice also failed:', fallbackError);
        }
      }
    }
    
    throw error;
  }
};

// Get list of available voices for testing
const listVoices = async () => {
  try {
    const [result] = await client.listVoices({});
    const voices = result.voices;
    
    // Filter WaveNet voices
    const wavenetVoices = voices.filter(voice => 
      voice.name.includes('Wavenet') && 
      voice.ssmlGender === 'FEMALE'
    );
    
    return wavenetVoices;
  } catch (error) {
    console.error('Error listing voices:', error);
    throw error;
  }
};

module.exports = {
  generateGoogleTTS,
  listVoices,
  convertToSSML,
  convertToPlainText,
  voiceMap,
  premiumVoiceMap
};