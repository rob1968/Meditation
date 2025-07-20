require('dotenv').config();
const mongoose = require('mongoose');
const SharedMeditation = require('../models/SharedMeditation');
const User = require('../models/User');

async function createTestMeditation() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Find or create a test user
    let testUser = await User.findOne({ username: 'testuser' });
    if (!testUser) {
      testUser = await User.create({
        username: 'testuser',
        password: 'test123' // In real app this would be hashed
      });
      console.log('Created test user');
    }

    // Create a test shared meditation
    const testMeditation = new SharedMeditation({
      title: 'Deep Sleep Journey',
      description: 'A peaceful meditation to help you drift into deep, restful sleep',
      text: `Welcome to this deep sleep meditation. 
      
      Take a moment to get comfortable in your bed. 
      
      Close your eyes gently, and begin to breathe naturally.
      
      With each breath, feel your body becoming heavier, sinking deeper into comfort.
      
      Let go of the day's worries. They can wait until tomorrow.
      
      You are safe. You are peaceful. You are ready for deep, restorative sleep.
      
      Continue breathing slowly and deeply as you drift off into peaceful slumber.`,
      meditationType: 'sleep',
      language: 'en',
      duration: 300, // 5 minutes
      audioFile: {
        filename: 'test-meditation.mp3',
        originalName: 'Deep Sleep Journey.mp3',
        size: 2500000
      },
      author: {
        userId: testUser._id,
        username: testUser.username
      },
      tags: ['sleep', 'relaxation', 'deep rest'],
      status: 'pending' // This will need admin approval
    });

    await testMeditation.save();
    console.log('Created test meditation:', testMeditation._id);

    // Create another one in Dutch
    const dutchMeditation = new SharedMeditation({
      title: 'Ontspanning voor Stress',
      description: 'Een rustgevende meditatie om stress los te laten',
      text: `Welkom bij deze stress verlichting meditatie.
      
      Neem een comfortabele positie in.
      
      Adem diep in door je neus... en langzaam uit door je mond.
      
      Voel hoe met elke uitademing de spanning uit je lichaam stroomt.
      
      Je bent veilig. Je bent kalm. Je bent in controle.`,
      meditationType: 'stress',
      language: 'nl',
      duration: 180, // 3 minutes
      audioFile: {
        filename: 'test-meditation-nl.mp3',
        originalName: 'Stress Relief NL.mp3',
        size: 1800000
      },
      author: {
        userId: testUser._id,
        username: testUser.username
      },
      tags: ['stress', 'ontspanning', 'rust'],
      status: 'pending'
    });

    await dutchMeditation.save();
    console.log('Created Dutch test meditation:', dutchMeditation._id);

    console.log('\nTest meditations created successfully!');
    console.log('Login as "rob" to see them in the admin dashboard.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestMeditation();