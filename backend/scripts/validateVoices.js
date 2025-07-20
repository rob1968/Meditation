const textToSpeech = require('@google-cloud/text-to-speech');
const { friendlyVoiceNames } = require('../services/friendlyVoiceNames');

// Initialize client
const client = new textToSpeech.TextToSpeechClient();

async function validateVoices() {
  try {
    console.log('🔍 Fetching actual Google Cloud TTS voices...');
    
    // Get all available voices from Google
    const [result] = await client.listVoices({});
    const actualVoices = result.voices;
    
    console.log(`📊 Found ${actualVoices.length} total voices from Google`);
    
    // Extract voice names
    const actualVoiceNames = new Set(actualVoices.map(voice => voice.name));
    
    // Check our configured voices
    const configuredVoices = Object.keys(friendlyVoiceNames);
    
    console.log('\n✅ EXISTING VOICES:');
    const existingVoices = [];
    const missingVoices = [];
    
    configuredVoices.forEach(voiceName => {
      if (actualVoiceNames.has(voiceName)) {
        existingVoices.push(voiceName);
        console.log(`  ✓ ${voiceName}`);
      } else {
        missingVoices.push(voiceName);
      }
    });
    
    console.log('\n❌ NON-EXISTING VOICES:');
    missingVoices.forEach(voiceName => {
      console.log(`  ✗ ${voiceName}`);
    });
    
    // Group by language and show available voices
    console.log('\n📋 ACTUAL AVAILABLE VOICES BY LANGUAGE:');
    
    const voicesByLang = {};
    actualVoices.forEach(voice => {
      const langCode = voice.languageCodes[0];
      if (!voicesByLang[langCode]) {
        voicesByLang[langCode] = [];
      }
      voicesByLang[langCode].push({
        name: voice.name,
        gender: voice.ssmlGender,
        type: voice.name.includes('Neural2') ? 'Neural2' : 
              voice.name.includes('Wavenet') ? 'WaveNet' :
              voice.name.includes('Chirp3-HD') ? 'Chirp3-HD' :
              voice.name.includes('Studio') ? 'Studio' : 'Standard'
      });
    });
    
    // Show key languages
    const keyLanguages = ['nl-NL', 'fr-FR', 'en-US', 'de-DE', 'es-ES'];
    keyLanguages.forEach(lang => {
      if (voicesByLang[lang]) {
        console.log(`\n${lang} (${voicesByLang[lang].length} voices):`);
        voicesByLang[lang].forEach(voice => {
          console.log(`  • ${voice.name} (${voice.gender}, ${voice.type})`);
        });
      }
    });
    
    console.log('\n📈 SUMMARY:');
    console.log(`Configured voices: ${configuredVoices.length}`);
    console.log(`Existing voices: ${existingVoices.length}`);
    console.log(`Missing voices: ${missingVoices.length}`);
    console.log(`Success rate: ${((existingVoices.length / configuredVoices.length) * 100).toFixed(1)}%`);
    
    return {
      existing: existingVoices,
      missing: missingVoices,
      actualVoices: voicesByLang
    };
    
  } catch (error) {
    console.error('Error validating voices:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  validateVoices().then(() => {
    console.log('\n✨ Voice validation completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });
}

module.exports = { validateVoices };