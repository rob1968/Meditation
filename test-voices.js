require('dotenv').config({ path: './backend/.env' });
const axios = require('axios');

async function testVoices() {
  const apiKey = process.env.ELEVEN_API_KEY || process.env.ELEVEN_LABS_API_KEY;
  
  if (!apiKey) {
    console.error('No Eleven Labs API key found in environment variables');
    return;
  }
  
  try {
    console.log('Fetching voices from Eleven Labs API...\n');
    
    const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
      headers: {
        "xi-api-key": apiKey,
      }
    });
    
    console.log(`Total voices available: ${response.data.voices.length}\n`);
    
    // Group voices by category
    const categories = {};
    response.data.voices.forEach(voice => {
      const category = voice.category || 'generated';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(voice);
    });
    
    // Display voices by category
    Object.entries(categories).forEach(([category, voices]) => {
      console.log(`\n=== ${category.toUpperCase()} VOICES (${voices.length}) ===`);
      voices.forEach(voice => {
        console.log(`\nName: ${voice.name}`);
        console.log(`ID: ${voice.voice_id}`);
        console.log(`Category: ${voice.category || 'N/A'}`);
        console.log(`Language: ${voice.language || 'N/A'}`);
        if (voice.description) {
          console.log(`Description: ${voice.description}`);
        }
        if (voice.labels) {
          console.log(`Labels: ${JSON.stringify(voice.labels)}`);
        }
        if (voice.preview_url) {
          console.log(`Preview: Available`);
        }
      });
    });
    
    // Show meditation-suitable voices based on current filter
    console.log('\n\n=== MEDITATION-SUITABLE VOICES (Current Filter) ===');
    const meditationVoices = response.data.voices.filter(voice => {
      const name = voice.name.toLowerCase();
      const description = (voice.description || '').toLowerCase();
      
      return name.includes('calm') ||
        name.includes('soft') ||
        name.includes('gentle') ||
        name.includes('sooth') ||
        name.includes('meditat') ||
        name.includes('relax') ||
        name.includes('peace') ||
        name.includes('whisper') ||
        description.includes('calm') ||
        description.includes('soft') ||
        description.includes('gentle') ||
        description.includes('sooth') ||
        description.includes('meditat') ||
        description.includes('relax') ||
        description.includes('peace') ||
        description.includes('whisper');
    });
    
    console.log(`Found ${meditationVoices.length} meditation-suitable voices`);
    
  } catch (error) {
    console.error('Error fetching voices:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.error('Authentication failed - check your API key');
    }
  }
}

testVoices();