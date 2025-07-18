require('dotenv').config();
const axios = require('axios');

async function testUpdatedVoices() {
  const apiKey = process.env.ELEVEN_API_KEY || process.env.ELEVEN_LABS_API_KEY;
  
  if (!apiKey) {
    console.error('No Eleven Labs API key found in environment variables');
    return;
  }
  
  try {
    console.log('Testing updated voice filter...\n');
    
    const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
      headers: {
        "xi-api-key": apiKey,
      }
    });
    
    console.log(`Total voices available: ${response.data.voices.length}\n`);
    
    // Apply the new filter logic
    const meditationVoices = response.data.voices.filter(voice => {
      const name = voice.name.toLowerCase();
      const description = (voice.description || '').toLowerCase();
      const labels = voice.labels || {};
      
      // Exclude voices that are explicitly NOT suitable for meditation
      const unsuitableVoices = 
        name.includes('hyped') ||
        name.includes('energetic') ||
        name.includes('quirky') ||
        name.includes('sassy') ||
        description.includes('hyped') ||
        description.includes('energetic') ||
        description.includes('quirky') ||
        description.includes('sassy') ||
        labels.descriptive === 'hyped' ||
        labels.descriptive === 'sassy';
      
      if (unsuitableVoices) {
        return false;
      }
      
      // Include all other voices that could work for meditation
      const isMeditationVoice = 
        name.includes('calm') ||
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
        description.includes('whisper') ||
        description.includes('warm') ||
        description.includes('resonant') ||
        description.includes('comforting') ||
        description.includes('professional') ||
        description.includes('mature') ||
        description.includes('deep') ||
        description.includes('smooth') ||
        description.includes('clear') ||
        labels.descriptive === 'calm' ||
        labels.descriptive === 'professional' ||
        labels.descriptive === 'mature' ||
        labels.descriptive === 'warm' ||
        labels.descriptive === 'confident' ||
        labels.descriptive === 'relaxed' ||
        labels.descriptive === 'classy' ||
        labels.descriptive === 'crisp' ||
        labels.descriptive === 'deep' ||
        labels.descriptive === 'husky' ||
        labels.use_case === 'narrative_story' ||
        labels.use_case === 'informative_educational' ||
        labels.use_case === 'narration' ||
        voice.category === 'cloned' ||
        voice.category === 'professional' ||
        voice.category === 'custom' ||
        !unsuitableVoices;
      
      return isMeditationVoice;
    });
    
    console.log(`Meditation-suitable voices (new filter): ${meditationVoices.length}\n`);
    console.log('Voices that passed the filter:\n');
    
    meditationVoices.forEach(voice => {
      console.log(`- ${voice.name} (${voice.category || 'premade'})`);
      if (voice.labels?.descriptive) {
        console.log(`  Characteristic: ${voice.labels.descriptive}`);
      }
    });
    
    console.log('\nExcluded voices:');
    response.data.voices.filter(v => !meditationVoices.includes(v)).forEach(voice => {
      console.log(`- ${voice.name} (reason: ${voice.labels?.descriptive || 'unsuitable characteristics'})`);
    });
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testUpdatedVoices();