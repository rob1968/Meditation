const textToSpeech = require('@google-cloud/text-to-speech');

async function testGoogleVoices() {
  try {
    console.log('🔍 Testing Google Cloud Text-to-Speech API...');
    
    // Check credentials file
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    console.log('📁 Credentials path:', credentialsPath);
    
    // Initialize client
    const client = new textToSpeech.TextToSpeechClient();
    console.log('✅ Client initialized successfully');
    
    // List all voices
    console.log('📞 Calling listVoices API...');
    const [result] = await client.listVoices({});
    const voices = result.voices;
    
    console.log(`🎤 Total voices available: ${voices.length}`);
    
    // Filter for French voices
    const frenchVoices = voices.filter(voice => 
      voice.languageCodes.includes('fr-FR') && 
      (voice.name.includes('Wavenet') || voice.name.includes('Neural2'))
    );
    
    console.log(`🇫🇷 French WaveNet/Neural2 voices: ${frenchVoices.length}`);
    
    frenchVoices.forEach(voice => {
      console.log(`  - ${voice.name} (${voice.ssmlGender})`);
    });
    
    // Test other languages
    const languages = ['en-US', 'es-ES', 'de-DE', 'nl-NL'];
    for (const lang of languages) {
      const langVoices = voices.filter(voice => 
        voice.languageCodes.includes(lang) && 
        (voice.name.includes('Wavenet') || voice.name.includes('Neural2'))
      );
      console.log(`🌍 ${lang}: ${langVoices.length} voices`);
    }
    
  } catch (error) {
    console.error('❌ Error testing Google voices:', error.message);
    console.error('💡 Error details:', error);
  }
}

testGoogleVoices();