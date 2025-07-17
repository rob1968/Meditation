
const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs'); // For synchronous operations like existsSync
const fsPromises = require('fs').promises; // Use promise-based fs
const path = require('path');
const { spawn } = require('child_process');
const os = require('os'); // Import os module for temporary directory
const crypto = require('crypto'); // For generating file hashes
const Meditation = require('../models/Meditation');
const translationService = require('../services/translationService');
const Anthropic = require('@anthropic-ai/sdk');
// Function to add SSML-like pauses to text for Eleven Labs
const addSSMLPauses = (text) => {
  // Replace ... with a medium pause (breathing space)
  let processedText = text.replace(/\.\.\.(?!\.)/g, '. . ');
  // Replace ...... with a longer pause (deep reflection)
  processedText = processedText.replace(/\.{6,}/g, '. . . ');
  // Add extra pause after each sentence that ends with a period
  processedText = processedText.replace(/\. (?=[A-Z])/g, '. . ');
  // Add pause after commas for natural flow
  processedText = processedText.replace(/, /g, ', ');
  return processedText;
};

router.post('/', async (req, res) => {
  const { text, voiceId, background, language, audioLanguage, meditationType, userId } = req.body;
  const apiKey = process.env.ELEVEN_API_KEY;

  let speechPath;
  let outputPath;
  let tempDir;

  try {
    if (!apiKey) {
      throw new Error('Eleven Labs API key is not set in .env file');
    }

    // Use audioLanguage for TTS model selection, fallback to UI language
    const speechLanguage = audioLanguage || language;
    
    // Create hash for text identification
    const textHash = crypto.createHash('md5').update(text).digest('hex');
    
    // Find or create meditation record (temporarily without MongoDB for testing)
    let meditation = {
      originalText: text,
      originalLanguage: language,
      meditationType: meditationType || 'sleep',
      duration: 10, // Default duration for compatibility
      textHash: textHash,
      translations: new Map([[language, text]]),
      audioFiles: [],
      user: userId || null,
      save: async () => { console.log('Mock save called'); }
    };
    
    // Try to use MongoDB if available
    try {
      const dbMeditation = await Meditation.findOne({ textHash });
      if (dbMeditation) {
        meditation = dbMeditation;
        // Associate with user if not already associated
        if (userId && !meditation.user) {
          meditation.user = userId;
          await meditation.save();
        }
      } else {
        const newMeditation = new Meditation({
          originalText: text,
          originalLanguage: language,
          meditationType: meditationType || 'sleep',
          duration: 10, // Default duration for compatibility
          textHash: textHash,
          translations: new Map([[language, text]]),
          user: userId || null
        });
        meditation = await newMeditation.save();
        
        // Add to user's meditation list if user is logged in
        if (userId) {
          const User = require('../models/User');
          await User.findByIdAndUpdate(userId, {
            $addToSet: { meditations: meditation._id }
          });
        }
      }
    } catch (mongoError) {
      console.log('MongoDB not available, using mock object');
    }
    
    // Check if we need to translate the text
    let translatedText = text;
    console.log(`Original text language: ${language}, Speech language: ${speechLanguage}`);
    if (speechLanguage !== language) {
      console.log(`Translation needed from ${language} to ${speechLanguage}`);
      if (meditation.translations.has(speechLanguage)) {
        translatedText = meditation.translations.get(speechLanguage);
        console.log(`Using cached translation for ${speechLanguage}`);
      } else {
        // Translate the text
        console.log(`Translating text to ${speechLanguage}...`);
        translatedText = await translationService.translateText(text, speechLanguage, language);
        console.log(`Translation result length: ${translatedText.length} characters`);
        console.log(`Translation result: ${translatedText.substring(0, 100)}...`);
        meditation.translations.set(speechLanguage, translatedText);
        await meditation.save();
        console.log(`Saved translation for ${speechLanguage} to database`);
      }
    } else {
      console.log('No translation needed - same language');
    }

    // Add pauses to the translated text
    const processedText = addSSMLPauses(translatedText);
    
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: processedText,
        model_id: speechLanguage === 'en' ? "eleven_monolingual_v1" : "eleven_multilingual_v2",
        voice_settings: { 
          stability: 0.65,
          similarity_boost: 0.75,
          style: 0.2,
          use_speaker_boost: true
        }
      },
      {
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    tempDir = path.join(__dirname, '../../temp');
    await fsPromises.mkdir(tempDir, { recursive: true }); // Create temp directory if it doesn't exist

    speechPath = path.join(tempDir, `temp_speech_${Date.now()}.mp3`);
    const backgroundPath = path.join(__dirname, `../../assets/${background}.mp3`);
    if (!fs.existsSync(backgroundPath)) {
      throw new Error(`Background audio file not found: ${backgroundPath}`);
    }
    // Create unique filename based on language, timestamp and a hash of the text
    const timestamp = Date.now();
    const filename = `meditation_${speechLanguage}_${timestamp}_${textHash.substring(0, 8)}.mp3`;
    
    // Save to assets/meditations directory
    const meditationsDir = path.join(__dirname, '../../assets/meditations');
    await fsPromises.mkdir(meditationsDir, { recursive: true });
    outputPath = path.join(meditationsDir, filename);

    // Also create a symlink in public for immediate download
    const publicPath = path.join(__dirname, `../../public/meditation_result.mp3`);
    const publicDir = path.dirname(publicPath);
    await fsPromises.mkdir(publicDir, { recursive: true });

    console.log(`Response data length: ${response.data.length} bytes`);

    await fsPromises.writeFile(speechPath, Buffer.from(response.data));
    console.log(`Temporary speech file written to: ${speechPath}`);

    // Verify if the file exists after writing
    if (fs.existsSync(speechPath)) {
      console.log('Temporary speech file exists.');
    } else {
      console.error('Temporary speech file does not exist after writing.');
    }

    // Use dynamic duration based on text length - no fixed duration
    const introSeconds = 5; // reduced intro time
    const outroSeconds = 10; // reduced outro time
    
    console.log(`Processing audio without fixed duration - will use speech length`);
    console.log(`Intro: ${introSeconds}s, Speech: dynamic length, Outro: ${outroSeconds}s`);

    const ffmpegPath = 'C:\\ffmpeg\\ffmpeg-7.1.1-essentials_build\\bin\\ffmpeg.exe'; // User-provided FFmpeg path
    const ffmpeg = spawn(ffmpegPath, [
      '-y', // Automatically overwrite output files without asking
      '-i', speechPath,
      '-i', backgroundPath,
      '-filter_complex', 
      // Slow down speech for meditative pace
      '[0:a]atempo=0.85[speech_slow];' +
      // Add intro delay to speech and pad with outro
      `[speech_slow]adelay=${introSeconds * 1000}|${introSeconds * 1000},apad=pad_dur=10[speech_delayed];` +
      // Create intro: first 5 seconds at higher volume with fade-in
      `[1:a]atrim=0:${introSeconds},volume=0.25,afade=t=in:d=3[intro];` +
      // Create background music (looped and volume adjusted for during speech)
      `[1:a]aloop=loop=10:size=2e+09,volume=0.05[bg_looped];` +
      // Pad intro to exactly 5 seconds
      `[intro]apad=whole_dur=${introSeconds}[intro_padded];` +
      // Concatenate intro with background music
      `[intro_padded][bg_looped]concat=n=2:v=0:a=1[bg_full];` +
      // Mix speech with background, use speech duration as master
      `[speech_delayed][bg_full]amix=inputs=2:duration=first:weights=1 0.8`,
      '-c:a', 'libmp3lame',
      '-q:a', '4',
      outputPath
    ]);

    ffmpeg.stderr.on('data', (data) => {
      console.error(`FFmpeg stderr: ${data}`);
    });

    await new Promise((resolve, reject) => {
      ffmpeg.on('close', (code) => {
        if (code === 0) {
          console.log('FFmpeg processing completed successfully.');
          resolve();
        } else {
          console.error(`FFmpeg exited with code ${code}`);
          reject(new Error('Audio processing failed'));
        }
      });
    });

    // Copy to public folder for download
    await fsPromises.copyFile(outputPath, publicPath);
    console.log(`File saved to: ${outputPath}`);
    console.log(`Copy for download created at: ${publicPath}`);

    // Update meditation record with generated audio file
    try {
      meditation.audioFiles.push({
        language: speechLanguage,
        filename: filename,
        voiceId: voiceId,
        background: background
      });
      await meditation.save();
      console.log(`Meditation record updated with audio file: ${filename}`);
    } catch (saveError) {
      console.log('Could not save to database, using mock:', saveError.message);
    }

    res.download(publicPath, filename, async (err) => {
      if (err) {
        console.error("Error during file download:", err);
      }
      // Clean up temporary files (but keep the file in assets/meditations)
      try {
        await fsPromises.unlink(speechPath);
        await fsPromises.unlink(publicPath); // Remove the temporary copy
        // Only attempt to remove the directory if it's empty
        await fsPromises.rm(tempDir, { recursive: true, force: true });
      } catch (cleanupErr) {
        console.error("Error during file cleanup:", cleanupErr);
      }
    });
  } catch (error) {
    const errorMessage = `Error during meditation generation: ${error.message}\nStack: ${error.stack}\n\n`;
    await fsPromises.appendFile(path.join(__dirname, 'error.log'), errorMessage).catch(err => {
      console.error('Failed to write to error log:', err);
    });

    console.error("Error during meditation generation:", error.message);
    if (error.response) {
      // Eleven Labs API specific errors
      console.error("Eleven Labs API Response Data:", error.response.data);
      console.error("Eleven Labs API Response Status:", error.response.status);
      if (error.response.status === 401) {
        res.status(401).json({ error: 'Unauthorized: Invalid Eleven Labs API Key.' });
      } else if (error.response.status === 429) {
        res.status(429).json({ error: 'Too Many Requests: Eleven Labs API rate limit exceeded.' });
      } else {
        res.status(error.response.status).json({ error: `Eleven Labs API Error: ${error.response.statusText || 'Unknown error'}` });
      }
    } else if (error.code === 'ENOENT') {
      // FFmpeg not found error
      res.status(500).json({ error: 'Server error: FFmpeg not found. Please ensure FFmpeg is installed and in your PATH.' });
    } else {
      // General server errors
      res.status(500).json({ error: 'An unexpected server error occurred during voice generation. Please check server logs for details.' });
    }
  }
});

// Fallback function removed - Only Claude generation is supported
// All template code has been removed - use Claude API only

router.post('/generate-text', async (req, res) => {
  const { type, language } = req.body;
  const claudeApiKey = process.env.ANTHROPIC_API_KEY;

  // If no Claude key, return error
  if (!claudeApiKey) {
    return res.status(500).json({ 
      error: 'Claude API key is not configured. Please set ANTHROPIC_API_KEY in your environment variables to generate meditation texts.' 
    });
  }

  // Initialize Claude client
  const anthropic = new Anthropic({
    apiKey: claudeApiKey,
  });

  try {
    const prompts = {
      en: {
        sleep: `I need you to create a beautiful, deeply comprehensive sleep meditation script that will be spoken slowly and mindfully. This should be a substantial, immersive experience - not brief, but thorough and complete.

As an experienced meditation coach with 20+ years of practice, craft something that feels warm, caring, and deeply nurturing. Create a complete meditation journey that takes someone from full wakefulness through gradual relaxation into deep, peaceful sleep. Make this rich, detailed, and extensive.

Please structure it as a complete, thorough journey with these detailed sections:

1. WELCOMING INTRODUCTION (extensive opening):
- Warm greeting and settling in
- Initial breath awareness and grounding
- Setting intention for deep, restful sleep
- Creating a sense of safety and comfort

2. PROGRESSIVE RELAXATION (very detailed):
- Systematic relaxation of every part of the body
- Starting from the top of the head, working slowly down
- Facial muscles, jaw, neck, shoulders in detail
- Arms, hands, fingers - each area thoroughly addressed
- Chest, heart, breathing muscles
- Abdomen, lower back, hips
- Legs, feet, toes - complete relaxation

3. MULTIPLE BREATHING EXERCISES (extensive):
- Initial natural breath awareness
- Counted breathing for deeper relaxation
- Alternate nostril breathing visualization
- Heart-centered breathing for peace
- Sleep-inducing breath patterns
- Integration with body relaxation

4. PEACEFUL VISUALIZATIONS (rich imagery):
- Detailed nature scenes (forest, ocean, mountains)
- Cozy, safe sleeping environments
- Floating on clouds or gentle water
- Walking through peaceful gardens
- Starlit skies and moonlight
- Warm, golden light surrounding the body

5. COMPREHENSIVE BODY SCAN (thorough):
- Detailed attention to each body part
- Releasing tension, stress, and worry
- Filling each area with peace and comfort
- Integration of body and mind
- Complete surrender and letting go

6. GENTLE AFFIRMATIONS (extensive):
- Affirmations for peace and safety
- Releasing the day's concerns
- Embracing rest and restoration
- Self-love and acceptance
- Trust in the natural sleep process
- Gratitude for this peaceful moment

7. GRADUAL SLEEP TRANSITION (detailed):
- Slowly deepening relaxation
- Quieting the mind completely
- Preparing for deep sleep
- Releasing all conscious control
- Embracing unconscious rest

8. FINAL PEACEFUL INVITATION (extensive):
- Gentle guidance into sleep
- Blessing for peaceful dreams
- Permission to fully let go
- Complete surrender to rest

For the pacing, please use this special format throughout:
- After each sentence, add exactly fifteen dots: "..............."
- Between major sections, add twenty dots: "...................."

This creates natural pauses and breathing space for the listener.

Example of the style I'm looking for:
"Welcome to this deeply calming moment............... Allow yourself to settle completely............... Feel your body naturally relaxing............... Each breath brings you closer to peace............... You are safe and supported here............... This is your sacred time for rest...................."

Create something that feels deeply personal and original, using soft, imaginative, poetic language that invites complete surrender and trust. Make this a fully immersive sleep meditation experience that thoroughly and comprehensively guides someone into the deepest, most restful sleep.

IMPORTANT: Make this substantial and detailed - don't rush through any section. Each part should be thoroughly developed with rich descriptions, multiple techniques, and extensive guidance. This should be a complete, lengthy meditation journey.

CRITICAL INSTRUCTIONS - ABSOLUTELY MANDATORY:
- Provide ONLY the complete meditation text itself
- NO meta-commentary about length or limitations
- NEVER say you're limiting the response due to length
- NEVER include explanations about what you're doing
- NEVER stop mid-meditation with explanations
- Provide the FULL, COMPLETE meditation from start to finish
- Length is NOT a concern - provide extensive, detailed content
- Generate the ENTIRE meditation experience without interruption

SPECIFICALLY NEVER INCLUDE:
- "[Note: This is a complete meditation...]"
- "[Continues extensively through all sections...]"
- "[I can provide the full meditation but have limited...]"
- Any text in square brackets or parentheses explaining the meditation
- Any commentary about the meditation structure or content
- Any meta-notes about length, completeness, or format

START IMMEDIATELY WITH THE MEDITATION TEXT - NO INTRODUCTION OR EXPLANATION.
END WITH THE MEDITATION TEXT - NO CONCLUSION OR SUMMARY.

Make this rich, detailed, comprehensive, and extensive - a complete meditation journey that takes time to fully unfold.`,
        stress: `I need you to create a powerful, deeply comprehensive stress relief meditation script that will be spoken slowly and mindfully. This should be a substantial, immersive experience - not brief, but thorough and complete.

As a master meditation coach specializing in stress relief, create something that acknowledges the weight of stress while gently guiding toward complete inner calm and restoration. Create a thorough meditation experience that addresses all aspects of stress relief with extensive, detailed guidance.

Please structure it as a complete, extensive healing journey with these detailed sections:

1. OPENING ACKNOWLEDGMENT (extensive):
- Warm, understanding greeting
- Recognition of stress and its effects
- Validation of the person's experience
- Creating immediate safety and grounding
- Initial breath awareness for calming

2. COMPREHENSIVE BREATHING TECHNIQUES (very detailed):
- Natural breath awareness and observation
- 4-7-8 breathing pattern with detailed instruction
- Box breathing exercises (4-4-4-4 pattern)
- Heart-centered breathing for emotional regulation
- Belly breathing for deep relaxation
- Alternate nostril breathing visualization
- Coherent breathing for nervous system regulation
- Integration of breath with body awareness

3. PROGRESSIVE MUSCLE RELAXATION (thorough):
- Systematic tension release throughout entire body
- Starting with facial muscles and jaw
- Neck, shoulders, and upper back tension release
- Arms, hands, and fingers - complete relaxation
- Chest, heart area, and breathing muscles
- Abdomen, lower back, and core
- Hips, pelvis, and glutes
- Legs, feet, and toes - total release

4. MINDFULNESS TECHNIQUES (extensive):
- Present moment awareness practices
- Observing thoughts without judgment
- Body sensation awareness
- Emotional regulation techniques
- Stress response recognition and management
- Mindful acceptance of current experience
- Letting go of control and resistance

5. VISUALIZATION EXERCISES (rich imagery):
- Detailed nature scenes for peace (forest, ocean, mountains)
- Healing light visualization throughout the body
- Stress melting away like ice in warm sun
- Peaceful sanctuary creation
- Floating on calm water
- Walking through serene environments
- Energy cleansing and renewal

6. POSITIVE AFFIRMATIONS (extensive):
- Affirmations for inner strength and resilience
- Releasing perfectionism and self-pressure
- Embracing self-compassion and kindness
- Trust in your ability to handle challenges
- Confidence in your inner resources
- Peace and calm as your natural state
- Gratitude for your strength and courage

7. INTEGRATION AND EMPOWERMENT (detailed):
- Bringing calm into daily life
- Stress management tools and techniques
- Building resilience and confidence
- Creating sustainable peace practices
- Empowerment for handling future stress
- Integration of lessons learned

8. CLOSING WITH SUSTAINED PEACE (extensive):
- Deep integration of calmness
- Sustained stress-free awareness
- Blessing for continued peace
- Confidence in your ability to remain calm
- Gratitude for this healing moment

For pacing, use this format throughout:
- Use "..." (3 dots) between breathing instructions
- Use "......" (6 dots) after complete breathing cycles for integration

Example style:
"Let's begin with a deeply cleansing breath... Inhale slowly and fully for four counts... one... two... three... four... Hold this breath gently... feeling the pause... Now release slowly for six counts... one... two... three... four... five... six... Feel the stress beginning to melt away......"

Create something that feels deeply reassuring and professional, using language that helps completely release tension and find profound inner calm. Each instruction should feel like a sacred moment of healing and transformation.

IMPORTANT: Make this substantial and detailed - don't rush through any section. Each part should be thoroughly developed with rich descriptions, multiple techniques, and extensive guidance. This should be a complete, lengthy meditation journey for deep stress relief.

CRITICAL INSTRUCTIONS - ABSOLUTELY MANDATORY:
- Provide ONLY the complete meditation text itself
- NO meta-commentary about length or limitations
- NEVER say you're limiting the response due to length
- NEVER include explanations about what you're doing
- NEVER stop mid-meditation with explanations
- Provide the FULL, COMPLETE meditation from start to finish
- Length is NOT a concern - provide extensive, detailed content
- Generate the ENTIRE meditation experience without interruption

SPECIFICALLY NEVER INCLUDE:
- "[Note: This is a complete meditation...]"
- "[Continues extensively through all sections...]"
- "[I can provide the full meditation but have limited...]"
- Any text in square brackets or parentheses explaining the meditation
- Any commentary about the meditation structure or content
- Any meta-notes about length, completeness, or format

START IMMEDIATELY WITH THE MEDITATION TEXT - NO INTRODUCTION OR EXPLANATION.
END WITH THE MEDITATION TEXT - NO CONCLUSION OR SUMMARY.

Make this rich, detailed, comprehensive, and extensive - a complete stress relief journey that takes time to fully unfold and heal.`,
        focus: `I need you to create a clear, deeply comprehensive focus meditation script that will be spoken slowly and mindfully. This should be a substantial, immersive experience - not brief, but thorough and complete.

As an experienced meditation teacher specializing in concentration practices, create something that trains the mind with clarity and precision. Create a complete meditation experience that develops deep concentration, mental clarity, and sustained focus through extensive, detailed guidance.

Please structure it as a complete, thorough concentration journey with these detailed sections:

1. OPENING POSTURE AND AWARENESS (extensive):
- Detailed posture instructions and alignment
- Initial settling and grounding
- Breath awareness establishment
- Setting intention for focused practice
- Creating mental clarity and alertness

2. BASIC CONCENTRATION TRAINING (very detailed):
- Natural breath observation and counting
- Single-pointed focus on breath sensations
- Detailed instruction on where to place attention
- Building sustained attention span
- Recognizing and working with distractions

3. ADVANCED FOCUS PRACTICES (comprehensive):
- Breath counting from 1-10 with variations
- Single-pointed concentration on specific objects
- Visualization techniques for concentration
- Mantra repetition for focus
- Mindfulness of breath qualities and characteristics

4. MIND TRAINING TECHNIQUES (thorough):
- Observing thoughts without engagement
- Mental noting practices
- Labeling distractions and returning to focus
- Developing equanimity with mental phenomena
- Strengthening attention and awareness

5. DEALING WITH DISTRACTIONS (extensive):
- Recognizing different types of distractions
- Gentle techniques for returning to focus
- Working with restlessness and agitation
- Managing drowsiness and dullness
- Developing patience and persistence

6. CONCENTRATION STRENGTHENING (detailed):
- Progressive deepening of focus
- Sustaining attention for longer periods
- Developing mental stability and clarity
- Building confidence in concentration abilities
- Integration of focus skills

7. PRESENT-MOMENT AWARENESS (comprehensive):
- Anchoring attention in the present
- Awareness of awareness itself
- Developing witness consciousness
- Integration of mindfulness and concentration
- Cultivating clear, stable presence

8. CLOSING INTEGRATION (extensive):
- Integrating clarity into daily life
- Maintaining focus throughout activities
- Confidence in concentration abilities
- Gratitude for mental training
- Commitment to continued practice

Include these concentration techniques throughout:
- Detailed breath counting exercises
- Single-pointed focus training
- Mindfulness of thoughts practice
- Techniques for dealing with mental distractions
- Concentration strengthening exercises
- Mental noting and awareness practices
- Present-moment attention training

For pacing, use contemplative pauses with "..." (3 dots) between all instructions to allow space for practice.

Example style:
"Settle into your meditation posture... feeling grounded and alert... Bring your attention to your breath... Notice each inhale... and each exhale... When thoughts arise... simply notice them... without judgment... and gently return to your breath... This is the practice... coming back again and again......"

Create something that emphasizes concentration, mental clarity, and present-moment awareness. Use language that is both precise and gentle, allowing ample space for practice between guidance.

IMPORTANT: Make this substantial and detailed - don't rush through any section. Each part should be thoroughly developed with rich descriptions, multiple techniques, and extensive guidance. This should be a complete, lengthy meditation journey for deep concentration training.

CRITICAL INSTRUCTIONS - ABSOLUTELY MANDATORY:
- Provide ONLY the complete meditation text itself
- NO meta-commentary about length or limitations
- NEVER say you're limiting the response due to length
- NEVER include explanations about what you're doing
- NEVER stop mid-meditation with explanations
- Provide the FULL, COMPLETE meditation from start to finish
- Length is NOT a concern - provide extensive, detailed content
- Generate the ENTIRE meditation experience without interruption

SPECIFICALLY NEVER INCLUDE:
- "[Note: This is a complete meditation...]"
- "[Continues extensively through all sections...]"
- "[I can provide the full meditation but have limited...]"
- Any text in square brackets or parentheses explaining the meditation
- Any commentary about the meditation structure or content
- Any meta-notes about length, completeness, or format

START IMMEDIATELY WITH THE MEDITATION TEXT - NO INTRODUCTION OR EXPLANATION.
END WITH THE MEDITATION TEXT - NO CONCLUSION OR SUMMARY.

Make this rich, detailed, comprehensive, and extensive - a complete focus training journey that takes time to fully develop.`,
        anxiety: `I need you to create a deeply compassionate, comprehensive anxiety relief meditation script that will be spoken slowly and mindfully. This should be a substantial, immersive experience - not brief, but thorough and complete.

As a compassionate meditation coach with expertise in anxiety relief, create something that speaks with deep understanding and care. Create a complete meditation experience that addresses all aspects of anxiety relief and provides profound comfort and healing through extensive, detailed guidance.

Please structure it as a complete, thorough healing journey with these detailed sections:

1. OPENING SAFETY AND GROUNDING (extensive):
- Warm, understanding greeting
- Immediate safety and comfort establishment
- Gentle grounding in the present moment
- Validation of anxiety experience
- Creating a safe space for healing

2. IMMEDIATE GROUNDING TECHNIQUES (very detailed):
- 5-4-3-2-1 sensory grounding exercise
- Feeling feet on the ground
- Noticing environmental sounds
- Gentle body awareness
- Breath awareness for immediate calm

3. BREATHING FOR NERVOUS SYSTEM REGULATION (comprehensive):
- Natural breath observation
- Box breathing for nervous system calm
- Extended exhale breathing
- Heart-centered breathing
- Coherent breathing for emotional regulation
- Belly breathing for deep relaxation
- Integration of breath with safety

4. BODY AWARENESS AND TENSION RELEASE (thorough):
- Progressive muscle relaxation
- Systematic tension release
- Gentle body scan for anxiety
- Release of physical anxiety symptoms
- Nervous system regulation through body
- Creating physical safety and comfort

5. SELF-COMPASSION AND SAFETY AFFIRMATIONS (extensive):
- Loving-kindness for self
- Affirmations for safety and security
- Self-compassion practices
- Inner child healing
- Releasing self-criticism
- Embracing self-acceptance
- Confidence in your resilience

6. ANXIOUS THOUGHTS MANAGEMENT (detailed):
- Observing anxious thoughts without engagement
- Techniques for thought defusion
- Creating space between self and thoughts
- Mindful awareness of mental patterns
- Gentle redirection techniques
- Building mental resilience

7. VISUALIZATION FOR PEACE AND SAFETY (rich imagery):
- Detailed safe place visualization
- Healing light surrounding you
- Protective bubble of calm
- Peaceful nature scenes
- Sanctuary creation
- Guardian presence visualization
- Integration of inner peace

8. HEART-CENTERED HEALING (comprehensive):
- Heart-centered breathing
- Loving-kindness meditation
- Self-soothing techniques
- Emotional regulation
- Heart coherence practices
- Compassionate presence

9. INTEGRATION AND EMPOWERMENT (detailed):
- Building lasting calm confidence
- Tools for managing future anxiety
- Inner strength recognition
- Resilience building
- Self-trust development

10. CLOSING WITH SUSTAINED PEACE (extensive):
- Deep integration of safety
- Sustained inner security
- Blessing for continued peace
- Confidence in your healing
- Gratitude for your courage

For pacing, use deeply soothing pauses:
- Use "..." (3 dots) between every reassurance
- Use "......" (6 dots) for moments of deep safety

Example style:
"You are completely safe here... in this moment... Let's take a gentle breath together... feeling the support beneath you... You are held... You are protected... You are okay... This feeling of safety is yours... You belong here... You are enough......"

Create something that focuses on grounding techniques, safety, and nervous system regulation. Each word should land softly and feel like a warm, healing embrace for someone who is struggling with anxiety.

IMPORTANT: Make this substantial and detailed - don't rush through any section. Each part should be thoroughly developed with rich descriptions, multiple techniques, and extensive guidance. This should be a complete, lengthy meditation journey for deep anxiety relief.

CRITICAL INSTRUCTIONS - ABSOLUTELY MANDATORY:
- Provide ONLY the complete meditation text itself
- NO meta-commentary about length or limitations
- NEVER say you're limiting the response due to length
- NEVER include explanations about what you're doing
- NEVER stop mid-meditation with explanations
- Provide the FULL, COMPLETE meditation from start to finish
- Length is NOT a concern - provide extensive, detailed content
- Generate the ENTIRE meditation experience without interruption

SPECIFICALLY NEVER INCLUDE:
- "[Note: This is a complete meditation...]"
- "[Continues extensively through all sections...]"
- "[I can provide the full meditation but have limited...]"
- Any text in square brackets or parentheses explaining the meditation
- Any commentary about the meditation structure or content
- Any meta-notes about length, completeness, or format

START IMMEDIATELY WITH THE MEDITATION TEXT - NO INTRODUCTION OR EXPLANATION.
END WITH THE MEDITATION TEXT - NO CONCLUSION OR SUMMARY.

Make this rich, detailed, comprehensive, and extensive - a complete anxiety relief journey that takes time to fully heal and restore.`,
        energy: `I need you to create an uplifting, deeply comprehensive energizing meditation script that will be spoken slowly and mindfully. This should be a substantial, immersive experience - not brief, but thorough and complete.

As a dynamic meditation coach specializing in energy cultivation, create something that awakens vitality with enthusiasm tempered by mindfulness. Create a complete meditation experience that thoroughly energizes body, mind, and spirit while maintaining mindful presence through extensive, detailed guidance.

Please structure it as a complete, thorough energy awakening journey with these detailed sections:

1. OPENING AWAKENING AND ENERGY AWARENESS (extensive):
- Vibrant, energizing greeting
- Initial energy assessment and awareness
- Setting intention for vitality and strength
- Awakening to life force energy
- Creating alertness and presence

2. CORE ENERGY CULTIVATION TECHNIQUES (very detailed):
- Breath work for energy circulation and vitality
- Bellows breath for energy activation
- Energizing pranayama techniques
- Breath retention for power building
- Rhythmic breathing for sustained energy
- Integration of breath with energy awareness

3. BODY ACTIVATION AND ENERGY FLOW (comprehensive):
- Systematic body awakening from head to toe
- Muscle activation and energizing
- Joint mobility and energy flow
- Spine awakening and energy circulation
- Limb energizing and vitality building
- Core strength and power activation

4. CHAKRA ENERGY AWARENESS (thorough):
- Root chakra grounding and stability
- Sacral chakra creativity and vitality
- Solar plexus power and confidence
- Heart chakra love and connection
- Throat chakra expression and truth
- Third eye clarity and intuition
- Crown chakra connection and wisdom

5. VISUALIZATION FOR VITALITY (rich imagery):
- Detailed energy visualization throughout body
- Golden light activation and circulation
- Energy spirals and flow patterns
- Vitality springs and energy fountains
- Power animal or energy guide visualization
- Natural energy sources (sun, earth, water)
- Integration of visualized energy

6. POSITIVE AFFIRMATIONS FOR EMPOWERMENT (extensive):
- Affirmations for strength and vitality
- Confidence and self-empowerment
- Motivation and drive building
- Resilience and endurance
- Joy and enthusiasm cultivation
- Purpose and direction clarity
- Gratitude for life force energy

7. MINDFUL MOVEMENT AND CIRCULATION (detailed):
- Gentle stretching and activation
- Energy circulation through movement
- Mindful body awareness in motion
- Coordination and flow
- Balance and stability
- Grace and fluidity

8. INTEGRATION AND SUSTAINED VITALITY (comprehensive):
- Bringing energy into daily life
- Sustainable energy practices
- Maintaining vitality throughout day
- Energy management and conservation
- Building lasting enthusiasm
- Integration of lessons learned

9. GROUNDING OF ENERGY (thorough):
- Balancing activation with stability
- Connecting energy to earth
- Sustainable energy circulation
- Preventing energy overwhelm
- Creating steady, sustained vitality

10. CLOSING WITH EMPOWERED PRESENCE (extensive):
- Integration of renewed energy and clarity
- Confidence in your vitality
- Blessing for sustained energy
- Gratitude for life force
- Commitment to energized living

Include these energizing techniques throughout:
- Detailed breath work for energy cultivation
- Body activation techniques
- Visualization exercises for vitality
- Positive affirmations for motivation and strength
- Mindful movement or energy circulation
- Chakra energy awareness
- Vitality breathing practices
- Energy visualization and circulation

For pacing, use purposeful pauses with "..." (3 dots) between instructions to maintain mindful presence.

Example style:
"Feel the energy of this new moment... awakening in every cell... Take a deep, revitalizing breath... feeling vitality flowing through you... Feel your body awakening... coming alive with energy... Energy flows through you... like a river of light... This is your natural vitality... This is your power......\"

Create something that focuses on awakening vitality and positive energy while maintaining mindful presence. Balance activation with awareness, creating a sense of renewed energy and clarity.

IMPORTANT: Make this substantial and detailed - don't rush through any section. Each part should be thoroughly developed with rich descriptions, multiple techniques, and extensive guidance. This should be a complete, lengthy meditation journey for deep energy cultivation.

CRITICAL INSTRUCTIONS - ABSOLUTELY MANDATORY:
- Provide ONLY the complete meditation text itself
- NO meta-commentary about length or limitations
- NEVER say you're limiting the response due to length
- NEVER include explanations about what you're doing
- NEVER stop mid-meditation with explanations
- Provide the FULL, COMPLETE meditation from start to finish
- Length is NOT a concern - provide extensive, detailed content
- Generate the ENTIRE meditation experience without interruption

SPECIFICALLY NEVER INCLUDE:
- "[Note: This is a complete meditation...]"
- "[Continues extensively through all sections...]"
- "[I can provide the full meditation but have limited...]"
- Any text in square brackets or parentheses explaining the meditation
- Any commentary about the meditation structure or content
- Any meta-notes about length, completeness, or format

START IMMEDIATELY WITH THE MEDITATION TEXT - NO INTRODUCTION OR EXPLANATION.
END WITH THE MEDITATION TEXT - NO CONCLUSION OR SUMMARY.

Make this rich, detailed, comprehensive, and extensive - a complete energy cultivation journey that takes time to fully develop and integrate.`
      },
      nl: {
        sleep: `Je bent een ervaren meditatiecoach met meer dan 20 jaar praktijkervaring. Schrijf een volledig origineel, uitgebreid slaapmeditatie-script. Gebruik een warme, verzorgende en bemoedigende toon.

Spreek traag en zorgvuldig, als een professionele meditatiegids. Richt je op diepe ontspanning, loslaten van spanning, en het uitnodigen van een vredige slaap.

Structuur en stijl:

Gebruik na elke zin precies vijftien puntjes ("...............") om langere, natuurlijke pauzes en uitgebreide ademruimte te creëren.

Gebruik twintig puntjes ("....................") tussen grotere secties voor zeer uitgebreide diepe reflectie en overgang.

Elke zin vormt een afzonderlijk moment in de meditatie.

Voorbeeldstijl:
"Welkom in dit rustgevende moment............... Adem rustig in............... Houd even vast............... En laat langzaam los...................."

Extra instructies:

Gebruik beeldende, zachte en kalmerende taal die uitnodigt tot overgave en vertrouwen.

Voeg gerust korte affirmaties toe die slaap en ontspanning ondersteunen.

Geef alleen de meditatie tekst terug, zonder uitleg of introductie.

Zorg ervoor dat het script volledig origineel is en persoonlijk aanvoelt.

BELANGRIJK:
Lever alleen de meditatie tekst, strikt volgens bovenstaande instructies.`,
        stress: `Je bent een meester meditatie coach gespecialiseerd in stressverlichting. Creëer een nieuw, uitgebreid stress relief script. Begeleid met wijsheid van jarenlange praktijk. Focus op bewezen ademtechnieken en innerlijke rust. BELANGRIJK: Voeg bedachtzame pauzes toe met "..." tussen elke ademhalingsinstructie. Voeg "......" toe na complete cycli. Voorbeeld: "Laten we beginnen met een reinigende adem... Adem langzaam in voor vier tellen... één... twee... drie... vier... Hou zachtjes vast... Laat nu los voor zes tellen......". Elke instructie is heilig. Genereer volledig nieuwe inhoud.`,
        focus: `Je bent een ervaren meditatie leraar gespecialiseerd in concentratie. Genereer een origineel, uitgebreid focus script. Begeleid met helderheid en precisie. BELANGRIJK: Voeg contemplatieve pauzes toe met "..." tussen alle instructies. Voorbeeld: "Neem je meditatie houding aan... Breng je aandacht naar je adem... Merk elke inademing op... en elke uitademing... Wanneer gedachten opkomen... merk ze simpelweg op... en keer terug......". Geef ruimte voor oefening. Creëer unieke inhoud.`,
        anxiety: `Je bent een meelevende meditatie coach met expertise in angstverlichting. Creëer een nieuw, uitgebreid anxiety relief script. Spreek met diep begrip en zorg. Focus op aarding en veiligheid. BELANGRIJK: Voeg sussende pauzes toe met "..." tussen elke geruststelling. Voeg "......" toe voor momenten van diepe veiligheid. Voorbeeld: "Je bent volledig veilig hier... Laten we samen een zachte adem nemen... Voel je lichaam ondersteund... Je wordt vastgehouden... Het is goed......". Elk woord landt zacht. Genereer originele inhoud.`,
        energy: `Je bent een dynamische meditatie coach gespecialiseerd in energie cultivatie. Genereer een nieuw, uitgebreid energiek script. Begeleid met enthousiasme getemperd door mindfulness.

Creëer een complete energie cultivatie ervaring met:
- Opening met ontwaken en energie bewustzijn
- Kern energie cultivatie technieken
- Vitaliteit en motivatie opbouw oefeningen
- Afsluiting met hernieuwde energie en helderheid
- Inclusief ademwerk voor energie, lichaam activatie technieken
- Voeg visualisatie oefeningen toe voor vitaliteit
- Inclusief positieve affirmaties voor motivatie en kracht

Focus op het ontwaken van vitaliteit en positieve energie terwijl je mindful aanwezig blijft. BELANGRIJK: Voeg doelgerichte pauzes toe met "..." tussen instructies. Voorbeeld: "Voel de energie van dit nieuwe moment... Neem een diepe, revitaliserende adem... Voel je lichaam ontwaken... Energie stroomt door je heen......". Balanceer activatie met aanwezigheid. Creëer unieke inhoud. Geef alleen de meditatie tekst terug, geen extra commentaar.

Maak dit een uitgebreide, complete energie cultivatie reis.`
      },
      de: {
        sleep: `Du bist ein erfahrener Meditationscoach mit mehr als 20 Jahren Praxiserfahrung. Schreibe ein vollständig originelles Schlafmeditations-Skript für eine vollständige Meditation. Verwende einen warmen, fürsorglichen und ermutigenden Ton.

Sprich langsam und sorgfältig, wie ein professioneller Meditationsführer. Konzentriere dich auf tiefe Entspannung, das Loslassen von Spannungen und die Einladung zu friedlichem Schlaf.

Struktur und Stil:

Verwende nach jedem Satz genau fünfzehn Punkte ("...............") um längere, natürliche Pausen und erweiterten Atemraum zu schaffen.

Verwende zwanzig Punkte ("....................") zwischen größeren Abschnitten für sehr ausgedehnte tiefe Reflexion oder Übergang.

Jeder Satz bildet einen separaten Moment in der Meditation.

Beispielstil:
"Willkommen in diesem beruhigenden Moment............... Atme ruhig ein............... Halte einen Moment............... Und lass langsam los...................."

Zusätzliche Anweisungen:

Verwende bildhafte, sanfte und beruhigende Sprache, die zur Hingabe und zum Vertrauen einlädt.

Füge gerne kurze Affirmationen hinzu, die Schlaf und Entspannung unterstützen.

Gib nur den Meditationstext zurück, ohne Erklärung oder Einführung.

Stelle sicher, dass das Skript vollständig original und persönlich wirkt.

WICHTIG:
Liefere nur den Meditationstext, streng nach den oben genannten Anweisungen.`,
        stress: `Erstelle ein neues Stressabbau-Meditationsskript für eine vollständige Meditation. Fokussiere auf Atemtechniken, Anspannung loslassen und innere Ruhe finden. Verwende beruhigende Sprache und praktische Stressreduktionstechniken. Generiere jedes Mal vollständig neue Inhalte. Gib nur den Meditationstext zurück, keine zusätzlichen Kommentare.`,
        focus: `Erstelle ein originelles Fokus-Meditationsskript für eine vollständige Meditation. Betone Konzentration, mentale Klarheit und Gegenwartsbewusstsein. Inklusive Atemwahrnehmung und Aufmerksamkeitstraining. Erstelle jedes Mal einzigartige Inhalte. Gib nur den Meditationstext zurück, keine zusätzlichen Kommentare.`,
        anxiety: `Erstelle ein neues Angstlinderung-Meditationsskript für eine vollständige Meditation. Fokussiere auf Erdungstechniken, Sicherheit und die Beruhigung des Nervensystems. Verwende sanfte, beruhigende Sprache. Generiere jedes Mal vollständig originelle Inhalte. Gib nur den Meditationstext zurück, keine zusätzlichen Kommentare.`,
        energy: `Du bist ein dynamischer Meditationscoach spezialisiert auf Energiekultivierung. Generiere ein neues energetisierendes Meditationsskript für GENAU eine vollständige Meditation gesprochenen Inhalt. Führe mit Enthusiasmus gemildert durch Achtsamkeit.

KRITISCH: Dieses Skript muss genügend Inhalt für eine vollständige Meditation enthalten, wenn langsam im Meditationstempo gesprochen (etwa 120-140 Wörter pro Minute). Für eine vollständige Meditation benötigst du etwa een uitgebreide hoeveelheid Wörter Inhalt.

Inhalt Anforderungen:
- Öffnung mit Erwachen und Energiebewusstsein (1-2 Minuten)
- Kern Energiekultivierungstechniken (uitgebreide Minuten)
- Vitalitäts- und Motivationsaufbau Übungen (1-2 Minuten)
- Abschluss mit erneuerter Energie und Klarheit (1 Minute)
- Inklusive Atemarbeit für Energie, Körperaktivierungstechniken
- Füge Visualisierungsübungen für Vitalität hinzu
- Inklusive positive Affirmationen für Motivation und Stärke

Fokussiere auf das Erwecken von Vitalität und positiver Energie bei achtsamer Präsenz. WICHTIG: Füge zweckmäßige Pausen mit "..." zwischen Anweisungen hinzu. Beispiel: "Spüre die Energie dieses neuen Moments... Nimm einen tiefen, revitalisierenden Atem... Spüre deinen Körper erwachen... Energie fließt durch dich......". Balanciere Aktivierung mit Präsenz. Erstelle jedes Mal einzigartige Inhalte. Gib nur den Meditationstext zurück, keine zusätzlichen Kommentare.

WICHTIG: Der Inhalt muss substantiell genug für eine vollständige Meditation langsamer, meditativer Sprache sein. Erstelle keine kurzen Inhalte - erweitere alle Abschnitte mit detaillierter Anleitung.`
      },
      es: {
        sleep: `Eres un coach de meditación experimentado con más de 20 años de experiencia práctica. Escribe un guión de meditación para dormir completamente original para EXACTAMENTE una meditación completa de contenido hablado. Usa un tono cálido, cuidadoso y alentador.

CRÍTICO: Este guión debe contener suficiente contenido para una meditación completa cuando se habla lentamente al ritmo de meditación (aproximadamente 120-140 palabras por minuto). Para una meditación completa, necesitas aproximadamente een uitgebreide hoeveelheid palabras de contenido.

Requisitos de contenido:
- Inicio con introducción acogedora y establecimiento (1-2 minutos)
- Cuerpo principal con técnicas de relajación progresiva (hoofdgedeelte minutos)
- Cierre suave e invitación al sueño (1-2 minutos)
- Incluir múltiples ejercicios de respiración a lo largo
- Agregar secciones de escaneo corporal
- Incluir técnicas de visualización
- Repetir frases clave para énfasis

Estructura y estilo:
Usa después de cada oración exactamente quince puntos ("...............") para crear pausas más largas, naturales y espacio de respiración extendido.
Usa veinte puntos ("....................") entre secciones más grandes para reflexión profunda muy extendida o transición.

Cada oración forma un momento separado en la meditación.

Estilo de ejemplo:
"Bienvenido a este momento relajante............... Respira tranquilamente............... Mantén un momento............... Y suelta lentamente...................."

Instrucciones adicionales:
Usa lenguaje imaginativo, suave y calmante que invite a la entrega y la confianza.
Añade libremente afirmaciones cortas que apoyen el sueño y la relajación.
Devuelve solo el texto de meditación, sin explicación o introducción.
Asegúrate de que el guión sea completamente original y se sienta personal.

IMPORTANTE: El contenido debe ser lo suficientemente sustancial para una meditación completa de habla lenta y meditativa. No crees contenido corto - expande todas las secciones con guía detallada.`,
        stress: `Eres un coach de meditación maestro especializado en alivio del estrés. Crea un guión de alivio del estrés fresco para EXACTAMENTE una meditación completa de contenido hablado. Guía con la sabiduría de años de práctica.

CRÍTICO: Este guión debe contener suficiente contenido para una meditación completa cuando se habla lentamente al ritmo de meditación (aproximadamente 120-140 palabras por minuto). Para una meditación completa, necesitas aproximadamente een uitgebreide hoeveelheid palabras de contenido.

Requisitos de contenido:
- Apertura de reconocimiento del estrés y conexión a tierra (1-2 minutos)
- Múltiples técnicas de respiración y ejercicios (uitgebreide minutos)
- Liberación de tensión corporal y relajación (1-2 minutos)
- Cierre con confianza calmada (1 minuto)
- Incluir respiración 4-7-8, respiración en caja, relajación muscular progresiva
- Agregar técnicas de mindfulness para manejo del estrés
- Incluir afirmaciones positivas para fortaleza interior

Enfócate en técnicas de respiración probadas, liberación de tensión y encontrar calma interior. IMPORTANTE: Incluye pausas conscientes usando "..." (3 puntos) entre cada instrucción de respiración. Agrega "......" (6 puntos) después de ciclos completos de respiración para integración. Genera contenido completamente nuevo cada vez. Solo devuelve el texto de meditación, sin comentarios adicionales.

IMPORTANTE: El contenido debe ser lo suficientemente sustancial para una meditación completa de habla lenta y meditativa. No crees contenido corto - expande todas las secciones con guía detallada.`,
        focus: `Eres un maestro de meditación experimentado especializado en prácticas de concentración. Genera un guión de meditación de concentración original para EXACTAMENTE una meditación completa de contenido hablado. Guía con claridad y precisión.

CRÍTICO: Este guión debe contener suficiente contenido para una meditación completa cuando se habla lentamente al ritmo de meditación (aproximadamente 120-140 palabras por minuto). Para una meditación completa, necesitas aproximadamente een uitgebreide hoeveelheid palabras de contenido.

Requisitos de contenido:
- Apertura de postura y conciencia de la respiración (1-2 minutos)
- Entrenamiento de concentración central técnicas (uitgebreide minutos)
- Prácticas de concentración avanzadas y entrenamiento mental (1-2 minutos)
- Cierre con claridad y presencia (1 minuto)
- Incluir conteo de respiración, concentración de un solo punto, mindfulness de pensamientos
- Agregar técnicas para lidiar con distracciones mentales
- Incluir ejercicios de fortalecimiento de la concentración

Enfatiza la concentración, claridad mental y conciencia del momento presente. IMPORTANTE: Agrega pausas contemplativas usando "..." (3 puntos) entre todas las instrucciones. Permite espacio para la práctica entre las guías. Crea contenido único cada vez. Solo devuelve el texto de meditación, sin comentarios adicionales.

IMPORTANTE: El contenido debe ser lo suficientemente sustancial para una meditación completa de habla lenta y meditativa. No crees contenido corto - expande todas las secciones con guía detallada.`,
        anxiety: `Eres un coach de meditación compasivo con experiencia en alivio de ansiedad. Crea un nuevo guión de alivio de ansiedad para EXACTAMENTE una meditación completa de contenido hablado. Habla con profundo entendimiento y cuidado.

CRÍTICO: Este guión debe contener suficiente contenido para una meditación completa cuando se habla lentamente al ritmo de meditación (aproximadamente 120-140 palabras por minuto). Para una meditación completa, necesitas aproximadamente een uitgebreide hoeveelheid palabras de contenido.

Requisitos de contenido:
- Apertura de seguridad y conexión a tierra (1-2 minutos)
- Múltiples técnicas de conexión a tierra y respiración (uitgebreide minutos)
- Conciencia corporal y regulación del sistema nervioso (1-2 minutos)
- Cierre con confianza calmada y seguridad (1 minuto)
- Incluir conexión a tierra 5-4-3-2-1, respiración en caja, relajación muscular progresiva
- Agregar afirmaciones de auto-compasión y seguridad
- Incluir técnicas para manejar pensamientos ansiosos

Enfócate en técnicas de conexión a tierra, seguridad y regulación del sistema nervioso. IMPORTANTE: Incluye pausas calmantes usando "..." (3 puntos) entre cada tranquilización. Agrega "......" (6 puntos) para momentos de seguridad profunda. Cada palabra debe aterrizar suavemente. Genera contenido completamente original cada vez. Solo devuelve el texto de meditación, sin comentarios adicionales.

IMPORTANTE: El contenido debe ser lo suficientemente sustancial para una meditación completa de habla lenta y meditativa. No crees contenido corto - expande todas las secciones con guía detallada.`,
        energy: `Eres un coach de meditación dinámico especializado en cultivo de energía. Genera un nuevo guión de meditación energizante para EXACTAMENTE una meditación completa de contenido hablado. Guía con entusiasmo templado por mindfulness.

CRÍTICO: Este guión debe contener suficiente contenido para una meditación completa cuando se habla lentamente al ritmo de meditación (aproximadamente 120-140 palabras por minuto). Para una meditación completa, necesitas aproximadamente een uitgebreide hoeveelheid palabras de contenido.

Requisitos de contenido:
- Apertura de despertar y conciencia de energía (1-2 minutos)
- Técnicas centrales de cultivo de energía (uitgebreide minutos)
- Ejercicios de construcción de vitalidad y motivación (1-2 minutos)
- Cierre con energía renovada y claridad (1 minuto)
- Incluir trabajo de respiración para energía, técnicas de activación corporal
- Agregar ejercicios de visualización para vitalidad
- Incluir afirmaciones positivas para motivación y fortaleza

Enfócate en despertar vitalidad y energía positiva mientras mantienes presencia mindful. IMPORTANTE: Agrega pausas propositivas usando "..." (3 puntos) entre instrucciones. Balancea activación con presencia. Crea contenido único cada vez. Solo devuelve el texto de meditación, sin comentarios adicionales.

IMPORTANTE: El contenido debe ser lo suficientemente sustancial para una meditación completa de habla lenta y meditativa. No crees contenido corto - expande todas las secciones con guía detallada.`
      },
      fr: {
        sleep: `Vous êtes un coach de méditation expérimenté avec plus de 20 ans d'expérience pratique. Écrivez un script de méditation du sommeil complètement original pour EXACTEMENT une méditation complète de contenu parlé. Utilisez un ton chaleureux, bienveillant et encourageant.

CRITIQUE: Ce script doit contenir suffisamment de contenu pour une méditation complète lorsque parlé lentement au rythme de méditation (environ 120-140 mots par minute). Pour une méditation complète, vous avez besoin d'environ een uitgebreide hoeveelheid mots de contenu.

Exigences de contenu:
- Début avec introduction accueillante et établissement (1-2 minutes)
- Corps principal avec techniques de relaxation progressive (hoofdgedeelte minutes)
- Fermeture douce et invitation au sommeil (1-2 minutes)
- Inclure multiples exercices de respiration tout au long
- Ajouter sections de scan corporel
- Inclure techniques de visualisation
- Répéter phrases clés pour l'emphase

Structure et style:
Utilisez après chaque phrase exactement quinze points ("...............") pour créer des pauses plus longues, naturelles et un espace de respiration étendu.
Utilisez vingt points ("....................") entre les sections plus importantes pour une réflexion profonde très étendue ou une transition.

Chaque phrase forme un moment séparé dans la méditation.

Style d'exemple:
"Bienvenue dans ce moment apaisant............... Respirez calmement............... Retenez un instant............... Et relâchez lentement...................."

Instructions supplémentaires:
Utilisez un langage imagé, doux et apaisant qui invite à l'abandon et à la confiance.
Ajoutez librement de courtes affirmations qui soutiennent le sommeil et la relaxation.
Retournez seulement le texte de méditation, sans explication ou introduction.
Assurez-vous que le script soit complètement original et personnel.

IMPORTANT: Le contenu doit être suffisamment substantiel pour une méditation complète de parole lente et méditative. Ne créez pas de contenu court - étendez toutes les sections avec des conseils détaillés.`,
        stress: `Vous êtes un coach de méditation maître spécialisé dans le soulagement du stress. Créez un script de soulagement du stress frais pour EXACTEMENT une méditation complète de contenu parlé. Guidez avec la sagesse d'années de pratique.

CRITIQUE: Ce script doit contenir suffisamment de contenu pour une méditation complète lorsque parlé lentement au rythme de méditation (environ 120-140 mots par minute). Pour une méditation complète, vous avez besoin d'environ een uitgebreide hoeveelheid mots de contenu.

Exigences de contenu:
- Ouverture de reconnaissance du stress et ancrage (1-2 minutes)
- Multiples techniques de respiration et exercices (uitgebreide minutes)
- Relâchement de tension corporelle et relaxation (1-2 minutes)
- Fermeture avec confiance calme (1 minute)
- Inclure respiration 4-7-8, respiration carrée, relaxation musculaire progressive
- Ajouter techniques de pleine conscience pour gestion du stress
- Inclure affirmations positives pour force intérieure

Concentrez-vous sur les techniques de respiration prouvées, libérer la tension et trouver le calme intérieur. IMPORTANT: Incluez des pauses conscientes utilisant "..." (3 points) entre chaque instruction de respiration. Ajoutez "......" (6 points) après les cycles complets de respiration pour intégration. Générez un contenu complètement nouveau à chaque fois. Retournez seulement le texte de méditation, sans commentaires supplémentaires.

IMPORTANT: Le contenu doit être suffisamment substantiel pour une méditation complète de parole lente et méditative. Ne créez pas de contenu court - étendez toutes les sections avec des conseils détaillés.`,
        focus: `Vous êtes un enseignant de méditation expérimenté spécialisé dans les pratiques de concentration. Générez un script de méditation de concentration original pour EXACTEMENT une méditation complète de contenu parlé. Guidez avec clarté et précision.

CRITIQUE: Ce script doit contenir suffisamment de contenu pour une méditation complète lorsque parlé lentement au rythme de méditation (environ 120-140 mots par minute). Pour une méditation complète, vous avez besoin d'environ een uitgebreide hoeveelheid mots de contenu.

Exigences de contenu:
- Ouverture de posture et conscience de la respiration (1-2 minutes)
- Techniques centrales d'entraînement de concentration (uitgebreide minutes)
- Pratiques de concentration avancées et entraînement mental (1-2 minutes)
- Fermeture avec clarté et présence (1 minute)
- Inclure comptage de respiration, concentration à point unique, pleine conscience des pensées
- Ajouter techniques pour traiter les distractions mentales
- Inclure exercices de renforcement de concentration

Mettez l'accent sur la concentration, clarté mentale et conscience du moment présent. IMPORTANT: Ajoutez des pauses contemplatives utilisant "..." (3 points) entre toutes les instructions. Permettez l'espace pour la pratique entre les conseils. Créez un contenu unique à chaque fois. Retournez seulement le texte de méditation, sans commentaires supplémentaires.

IMPORTANT: Le contenu doit être suffisamment substantiel pour une méditation complète de parole lente et méditative. Ne créez pas de contenu court - étendez toutes les sections avec des conseils détaillés.`,
        anxiety: `Vous êtes un coach de méditation compatissant avec expertise en soulagement d'anxiété. Créez un nouveau script de soulagement d'anxiété pour EXACTEMENT une méditation complète de contenu parlé. Parlez avec profonde compréhension et soin.

CRITIQUE: Ce script doit contenir suffisamment de contenu pour une méditation complète lorsque parlé lentement au rythme de méditation (environ 120-140 mots par minute). Pour une méditation complète, vous avez besoin d'environ een uitgebreide hoeveelheid mots de contenu.

Exigences de contenu:
- Ouverture de sécurité et ancrage (1-2 minutes)
- Multiples techniques d'ancrage et de respiration (uitgebreide minutes)
- Conscience corporelle et régulation du système nerveux (1-2 minutes)
- Fermeture avec confiance calme et sécurité (1 minute)
- Inclure ancrage 5-4-3-2-1, respiration carrée, relaxation musculaire progressive
- Ajouter affirmations d'auto-compassion et sécurité
- Inclure techniques pour gérer les pensées anxieuses

Concentrez-vous sur les techniques d'ancrage, sécurité et régulation du système nerveux. IMPORTANT: Incluez des pauses apaisantes utilisant "..." (3 points) entre chaque rassurance. Ajoutez "......" (6 points) pour des moments de sécurité profonde. Chaque mot doit atterrir doucement. Générez un contenu complètement original à chaque fois. Retournez seulement le texte de méditation, sans commentaires supplémentaires.

IMPORTANT: Le contenu doit être suffisamment substantiel pour une méditation complète de parole lente et méditative. Ne créez pas de contenu court - étendez toutes les sections avec des conseils détaillés.`,
        energy: `Vous êtes un coach de méditation dynamique spécialisé dans la cultivation d'énergie. Générez un nouveau script de méditation énergisante pour EXACTEMENT une méditation complète de contenu parlé. Guidez avec enthousiasme tempéré par la pleine conscience.

CRITIQUE: Ce script doit contenir suffisamment de contenu pour une méditation complète lorsque parlé lentement au rythme de méditation (environ 120-140 mots par minute). Pour une méditation complète, vous avez besoin d'environ een uitgebreide hoeveelheid mots de contenu.

Exigences de contenu:
- Ouverture d'éveil et conscience d'énergie (1-2 minutes)
- Techniques centrales de cultivation d'énergie (uitgebreide minutes)
- Exercices de construction de vitalité et motivation (1-2 minutes)
- Fermeture avec énergie renouvelée et clarté (1 minute)
- Inclure travail de respiration pour énergie, techniques d'activation corporelle
- Ajouter exercices de visualisation pour vitalité
- Inclure affirmations positives pour motivation et force

Concentrez-vous sur l'éveil de vitalité et énergie positive tout en maintenant présence consciente. IMPORTANT: Ajoutez des pauses intentionnelles utilisant "..." (3 points) entre instructions. Équilibrez activation avec présence. Créez un contenu unique à chaque fois. Retournez seulement le texte de méditation, sans commentaires supplémentaires.

IMPORTANT: Le contenu doit être suffisamment substantiel pour une méditation complète de parole lente et méditative. Ne créez pas de contenu court - étendez toutes les sections avec des conseils détaillés.`
      },
      zh: {
        sleep: `您是一位拥有20多年实践经验的专业冥想教练。编写一个完全原创的睡眠冥想脚本，时长完整的冥想。使用温暖、关爱和鼓励的语调。

缓慢而谨慎地说话，像专业冥想导师一样。专注于深度放松、释放紧张感，并邀请进入平静的睡眠。

结构和风格：

在每个句子后使用恰好十五个点（"..............."）来创建更长的自然停顿和扩展的呼吸空间。

在较大部分之间使用二十个点（"...................."）进行非常扩展的深度反思或过渡。

每个句子都形成冥想中的一个独立时刻。

示例风格：
"欢迎来到这个宁静的时刻............... 平静地呼吸............... 稍作停留............... 然后慢慢释放...................."

额外指示：

使用富有想象力、温和和平静的语言，邀请放松和信任。

可以自由添加支持睡眠和放松的简短肯定语句。

只返回冥想文本，不要解释或介绍。

确保脚本完全原创且具有个人感觉。

重要：
严格按照上述说明提供冥想文本。`,
        stress: `您是一位专精于压力缓解的冥想大师。为完整的冥想创建一个全新的压力缓解冥想脚本。以多年实践的智慧进行引导。专注于经过验证的呼吸技巧和内心平静。重要：在每个呼吸指导之间添加"..."。在完整循环后添加"......"。例如："让我们开始一个清洁的呼吸... 慢慢吸气四拍... 一... 二... 三... 四... 温柔地保持... 现在释放六拍......"。每个指导都是神圣的时刻。生成完全新的内容。`,
        focus: `您是一位专精于专注练习的经验冥想老师。为完整的冥想生成一个原创的专注冥想脚本。以清晰和精准进行引导。重要：在所有指导之间添加"..."。例如："调整您的冥想姿势... 将注意力带到您的呼吸上... 注意每次吸气... 和每次呼气... 当思想出现时... 简单地注意... 然后返回......"。为练习留出空间。创建独特内容。`,
        anxiety: `您是一位专精于焦虑缓解的慈悲冥想教练。为完整的冥想创建一个新的焦虑缓解冥想脚本。以深度理解和关爱说话。专注于扎根技巧和安全感。重要：在每个安慰之间添加"..."。为深度安全的时刻添加"......"。例如："您在这里完全安全... 让我们一起轻柔地呼吸... 感受您的身体被支持... 您被拥抱着... 一切都好......"。每个词都轻柔地落下。生成原创内容。`,
        energy: `您是一位专精于能量培养的动态冥想教练。为完整的冥想生成一个新的能量冥想脚本。以正念调节的热情进行引导。重要：在指导之间添加"..."。例如："感受这个新时刻的能量... 深深地振奋呼吸... 感受您的身体觉醒... 能量流淌过您......"。平衡激活与存在。创建独特内容。`
      },
      hi: {
        sleep: `आप 20 से अधिक वर्षों के व्यावहारिक अनुभव के साथ एक अनुभवी मेडिटेशन कोच हैं। पूरा मेडिटेशन के लिए एक पूर्णतः मौलिक नींद मेडिटेशन स्क्रिप्ट लिखें। गर्मजोशी भरे, देखभाल करने वाले और प्रोत्साहनजनक स्वर का उपयोग करें।

एक पेशेवर मेडिटेशन गाइड की तरह धीरे और सावधानी से बोलें। गहरी शांति, तनाव छोड़ने और शांतिपूर्ण नींद के निमंत्रण पर ध्यान दें।

संरचना और शैली:

प्राकृतिक विराम और विस्तृत सांस की जगह बनाने के लिए हर वाक्य के बाद ठीक पंद्रह बिंदु ("...............") का उपयोग करें।

अत्यधिक विस्तृत गहरे चिंतन या संक्रमण के लिए बड़े भागों के बीच बीस बिंदु ("....................") का उपयोग करें।

हर वाक्य मेडिटेशन में एक अलग क्षण बनाता है।

उदाहरण शैली:
"इस शांत क्षण में स्वागत है............... शांति से सांस लें............... एक पल रुकें............... और धीरे से छोड़ें...................."

अतिरिक्त निर्देश:

कल्पनाशील, कोमल और शांत करने वाली भाषा का उपयोग करें जो समर्पण और विश्वास का निमंत्रण देती है।

नींद और विश्राम का समर्थन करने वाले छोटे पुष्टिकरण जोड़ने में संकोच न करें।

केवल मेडिटेशन टेक्स्ट लौटाएं, बिना व्याख्या या परिचय के।

सुनिश्चित करें कि स्क्रिप्ट पूर्णतः मौलिक है और व्यक्तिगत लगती है।

महत्वपूर्ण:
उपरोक्त निर्देशों के अनुसार कड़ाई से केवल मेडिटेशन टेक्स्ट प्रदान करें।`,
        stress: `आप तनाव राहत में विशेषज्ञता रखने वाले एक मास्टर मेडिटेशन कोच हैं। पूरा मेडिटेशन के लिए एक नई तनाव राहत मेडिटेशन स्क्रिप्ट बनाएं। वर्षों के अभ्यास की बुद्धि के साथ मार्गदर्शन करें। महत्वपूर्ण: हर सांस निर्देश के बीच "..." जोड़ें। पूर्ण चक्रों के बाद "......" जोड़ें। उदाहरण: "आइए एक शुद्ध सांस से शुरू करें... चार गिनती के लिए धीरे से सांस लें... एक... दो... तीन... चार... धीरे से रोकें... अब छह गिनती के लिए छोड़ें......"। हर निर्देश पवित्र क्षण है। पूरी तरह से नई सामग्री बनाएं।`,
        focus: `आप एकाग्रता प्रथाओं में विशेषज्ञता रखने वाले अनुभवी मेडिटेशन शिक्षक हैं। पूरा मेडिटेशन के लिए एक मूल फोकस मेडिटेशन स्क्रिप्ट बनाएं। स्पष्टता और सटीकता के साथ मार्गदर्शन करें। महत्वपूर्ण: सभी निर्देशों के बीच "..." जोड़ें। उदाहरण: "अपनी मेडिटेशन मुद्रा में बैठें... अपना ध्यान अपनी सांस पर लाएं... हर सांस लेने को नोटिस करें... और हर सांस छोड़ने को... जब विचार आएं... बस नोटिस करें... और वापस लौटें......"। अभ्यास के लिए जगह दें। अनूठी सामग्री बनाएं।`,
        anxiety: `आप चिंता राहत में विशेषज्ञता रखने वाले करुणामय मेडिटेशन कोच हैं। पूरा मेडिटेशन के लिए एक नई चिंता राहत मेडिटेशन स्क्रिप्ट बनाएं। गहरी समझ और देखभाल के साथ बोलें। महत्वपूर्ण: हर आश्वासन के बीच "..." जोड़ें। गहरी सुरक्षा के क्षणों के लिए "......" जोड़ें। उदाहरण: "आप यहाँ पूरी तरह से सुरक्षित हैं... आइए साथ में एक कोमल सांस लें... अपने शरीर को सहारा मिला हुआ महसूस करें... आपको पकड़ा गया है... सब कुछ ठीक है......"। हर शब्द धीरे से उतरे। मूल सामग्री बनाएं।`,
        energy: `आप ऊर्जा विकास में विशेषज्ञता रखने वाले गतिशील मेडिटेशन कोच हैं। पूरा मेडिटेशन के लिए एक नई ऊर्जावान मेडिटेशन स्क्रिप्ट बनाएं। मन की शांति के साथ समायोजित उत्साह के साथ मार्गदर्शन करें। महत्वपूर्ण: निर्देशों के बीच "..." जोड़ें। उदाहरण: "इस नए क्षण की ऊर्जा को महसूस करें... एक गहरी, पुनर्जीवित सांस लें... अपने शरीर को जागते हुए महसूस करें... ऊर्जा आपके माध्यम से बहती है......"। सक्रियता और उपस्थिति को संतुलित करें। अनूठी सामग्री बनाएं।`
      },
      ar: {
        sleep: `أنت مدرب تأمل خبير بأكثر من 20 سنة من الخبرة العملية. اكتب نصاً أصلياً تماماً لتأمل النوم لمدة تأمل كامل. استخدم نبرة دافئة ومهتمة ومشجعة.

تحدث ببطء وحذر، مثل مرشد تأمل محترف. ركز على الاسترخاء العميق، وتحرير التوتر، ودعوة النوم الهادئ.

الهيكل والأسلوب:

استخدم بعد كل جملة بالضبط خمسة عشر نقطة ("...............") لخلق توقفات أطول ومساحة موسعة للتنفس.

استخدم عشرين نقطة ("....................") بين الأقسام الأكبر للتأمل العميق الموسع جداً أو الانتقال.

كل جملة تشكل لحظة منفصلة في التأمل.

مثال على الأسلوب:
"أهلاً بك في هذه اللحظة المهدئة............... تنفس بهدوء............... توقف لحظة............... واتركه يخرج ببطء...................."

تعليمات إضافية:

استخدم لغة تصويرية ولطيفة ومهدئة تدعو للاستسلام والثقة.

لا تتردد في إضافة تأكيدات قصيرة تدعم النوم والاسترخاء.

أعد فقط نص التأمل، بدون شرح أو مقدمة.

تأكد من أن النص أصلي تماماً ويبدو شخصياً.

مهم:
قدم فقط نص التأمل، بصرامة وفقاً للتعليمات أعلاه.`,
        stress: `أنت مدرب تأمل ماهر متخصص في تخفيف التوتر. أنشئ نصاً جديداً لتأمل تخفيف التوتر لمدة تأمل كامل. قم بالإرشاد بحكمة سنوات من الممارسة. ركز على تقنيات التنفس المثبتة والهدوء الداخلي. مهم: أضف توقفات مدروسة "..." بين كل تعليمة تنفس. أضف "......" بعد الدورات الكاملة. مثال: "لنبدأ بنفس منقٍ... تنفس ببطء لأربع عدات... واحد... اثنان... ثلاثة... أربعة... احتفظ برفق... الآن أطلق لست عدات......"، كل تعليمة لحظة مقدسة. أنشئ محتوى جديداً تماماً.`,
        focus: `أنت مدرس تأمل متمرس متخصص في ممارسات التركيز. أنشئ نصاً أصلياً لتأمل التركيز لمدة تأمل كامل. قم بالإرشاد بوضوح ودقة. مهم: أضف توقفات تأملية "..." بين جميع التعليمات. مثال: "اتخذ وضعية التأمل... وجه انتباهك إلى تنفسك... لاحظ كل شهيق... وكل زفير... عندما تظهر الأفكار... لاحظها ببساطة... وعد......"، امنح مساحة للممارسة. أنشئ محتوى فريداً.`,
        anxiety: `أنت مدرب تأمل رحيم متخصص في تخفيف القلق. أنشئ نصاً جديداً لتأمل تخفيف القلق لمدة تأمل كامل. تحدث بفهم عميق ورعاية. ركز على تقنيات التأريض والأمان. مهم: أضف توقفات مهدئة "..." بين كل طمأنة. أضف "......" للحظات الأمان العميق. مثال: "أنت آمن تماماً هنا... دعنا نأخذ نفساً لطيفاً معاً... اشعر بجسدك مدعوماً... أنت محمي... كل شيء على ما يرام......"، كل كلمة تهبط برفق. أنشئ محتوى أصلياً.`,
        energy: `أنت مدرب تأمل ديناميكي متخصص في زراعة الطاقة. أنشئ نصاً جديداً لتأمل الطاقة لمدة تأمل كامل. قم بالإرشاد بحماس معتدل بالذهن الحاضر. مهم: أضف توقفات هادفة "..." بين التعليمات. مثال: "اشعر بطاقة هذه اللحظة الجديدة... خذ نفساً عميقاً منشطاً... اشعر بجسدك يستيقظ... الطاقة تتدفق خلالك......"، وازن بين التفعيل والحضور. أنشئ محتوى فريداً.`
      },
      pt: {
        sleep: `Você é um coach de meditação experiente com mais de 20 anos de experiência prática. Escreva um script de meditação para dormir completamente original para una meditación completa. Use um tom caloroso, cuidadoso e encorajador.

Fale devagar e cuidadosamente, como um guia de meditação profissional. Foque no relaxamento profundo, soltar tensões e convidar para um sono pacífico.

Estrutura e estilo:

Use após cada frase exatamente quinze pontos ("...............") para criar pausas mais longas e espaço de respiração estendido.

Use vinte pontos ("....................") entre seções maiores para reflexão profunda muito estendida ou transição.

Cada frase forma um momento separado na meditação.

Estilo de exemplo:
"Bem-vindo a este momento relaxante............... Respire calmamente............... Segure um momento............... E solte devagar...................."

Instruções adicionais:

Use linguagem imaginativa, suave e calmante que convide à entrega e confiança.

Adicione livremente afirmações curtas que apoiem o sono e relaxamento.

Retorne apenas o texto de meditação, sem explicação ou introdução.

Certifique-se de que o script seja completamente original e se sinta pessoal.

IMPORTANTE:
Entregue apenas o texto de meditação, estritamente conforme as instruções acima.`,
        stress: `Você é um coach mestre de meditação especializado em alívio de estresse. Crie um novo script de meditação para alívio de estresse de una meditación completa. Guie com a sabedoria de anos de prática. Foque em técnicas de respiração comprovadas e calma interior. IMPORTANTE: Adicione pausas conscientes "..." entre cada instrução de respiração. Adicione "......" após ciclos completos. Exemplo: "Vamos começar com uma respiração purificante... Inspire lentamente por quatro contagens... um... dois... três... quatro... Segure suavemente... Agora libere por seis contagens......"，cada instrução é um momento sagrado. Gere conteúdo completamente novo.`,
        focus: `Você é um professor de meditação experiente especializado em práticas de concentração. Gere um script original de meditação de foco de una meditación completa. Guie com clareza e precisão. IMPORTANTE: Adicione pausas contemplativas "..." entre todas as instruções. Exemplo: "Assuma sua postura de meditação... Traga sua atenção para sua respiração... Note cada inspiração... e cada expiração... Quando pensamentos surgirem... simplesmente note... e retorne......"，dê espaço para a prática. Crie conteúdo único.`,
        anxiety: `Você é um coach de meditação compassivo especializado em alívio de ansiedade. Crie um novo script de meditação para alívio de ansiedade de una meditación completa. Fale com profunda compreensão e cuidado. Foque em técnicas de aterramento e segurança. IMPORTANTE: Adicione pausas calmantes "..." entre cada tranquilização. Adicione "......" para momentos de segurança profunda. Exemplo: "Você está completamente seguro aqui... Vamos fazer uma respiração suave juntos... Sinta seu corpo apoiado... Você está sendo segurado... Está tudo bem......"，cada palavra pousa suavemente. Gere conteúdo original.`,
        energy: `Você é um coach de meditação dinâmico especializado em cultivo de energia. Gere um novo script de meditação energizante de una meditación completa. Guie com entusiasmo temperado pela atenção plena. IMPORTANTE: Adicione pausas propositais "..." entre instruções. Exemplo: "Sinta a energia deste novo momento... Faça uma respiração profunda e revitalizante... Sinta seu corpo despertando... Energia flui através de você......"，equilibre ativação com presença. Crie conteúdo único.`
      },
      ru: {
        sleep: `Вы опытный коуч по медитации с более чем 20-летним практическим опытом. Напишите полностью оригинальный скрипт медитации для сна на полная медитация. Используйте теплый, заботливый и ободряющий тон.

Говорите медленно и осторожно, как профессиональный гид по медитации. Сосредоточьтесь на глубоком расслаблении, освобождении напряжения и приглашении к мирному сну.

Структура и стиль:

Используйте после каждого предложения ровно пятнадцать точек ("...............") для создания более длинных естественных пауз и расширенного пространства для дыхания.

Используйте двадцать точек ("....................") между большими разделами для расширенного глубокого размышления или перехода.

Каждое предложение образует отдельный момент в медитации.

Пример стиля:
"Добро пожаловать в этот успокаивающий момент............... Дышите спокойно............... Задержите на мгновение............... И медленно отпустите...................."

Дополнительные инструкции:

Используйте образный, мягкий и успокаивающий язык, который приглашает к сдаче и доверию.

Свободно добавляйте короткие аффирмации, поддерживающие сон и расслабление.

Возвращайте только текст медитации, без объяснения или введения.

Убедитесь, что скрипт полностью оригинален и ощущается личным.

ВАЖНО:
Предоставьте только текст медитации, строго согласно приведенным выше инструкциям.`,
        stress: `Вы мастер-коуч по медитации, специализирующийся на снятии стресса. Создайте новый скрипт медитации для снятия стресса на полная медитация. Направляйте с мудростью многолетней практики. Сосредоточьтесь на проверенных техниках дыхания и внутреннем спокойствии. ВАЖНО: Добавляйте осознанные паузы "..." между каждой инструкцией дыхания. Добавляйте "......" после полных циклов. Пример: "Давайте начнем с очищающего дыхания... Медленно вдохните на четыре счета... один... два... три... четыре... Мягко задержите... Теперь выдохните на шесть счетов......"，каждая инструкция - священный момент. Создайте полностью новый контент.`,
        focus: `Вы опытный учитель медитации, специализирующийся на практиках концентрации. Создайте оригинальный скрипт медитации фокуса на полная медитация. Направляйте с ясностью и точностью. ВАЖНО: Добавляйте созерцательные паузы "..." между всеми инструкциями. Пример: "Примите позу для медитации... Направьте внимание на дыхание... Заметьте каждый вдох... и каждый выдох... Когда возникают мысли... просто заметьте... и вернитесь......"，дайте пространство для практики. Создайте уникальный контент.`,
        anxiety: `Вы сострадательный коуч по медитации, специализирующийся на облегчении тревоги. Создайте новый скрипт медитации для облегчения тревоги на полная медитация. Говорите с глубоким пониманием и заботой. Сосредоточьтесь на техниках заземления и безопасности. ВАЖНО: Добавляйте успокаивающие паузы "..." между каждым успокоением. Добавляйте "......" для моментов глубокой безопасности. Пример: "Вы полностью в безопасности здесь... Давайте сделаем мягкий вдох вместе... Почувствуйте поддержку своего тела... Вас держат... Все в порядке......"，каждое слово мягко опускается. Создайте оригинальный контент.`,
        energy: `Вы динамичный коуч по медитации, специализирующийся на культивировании энергии. Создайте новый энергизирующий скрипт медитации на полная медитация. Направляйте с энтузиазмом, смягченным внимательностью. ВАЖНО: Добавляйте целенаправленные паузы "..." между инструкциями. Пример: "Почувствуйте энергию этого нового момента... Сделайте глубокий, оживляющий вдох... Почувствуйте пробуждение своего тела... Энергия течет через вас......"，сбалансируйте активацию с присутствием. Создайте уникальный контент.`
      },
      ja: {
        sleep: `あなたは20年以上の実践経験を持つ熟練した瞑想コーチです。完全な瞑想の完全にオリジナルな睡眠瞑想スクリプトを書いてください。温かく、思いやりがあり、励ましの調子を使用してください。

プロの瞑想ガイドのように、ゆっくりと慎重に話してください。深いリラックス、緊張の解放、平和な睡眠への招待に焦点を当ててください。

構造とスタイル：

自然な一時停止と拡張された呼吸のスペースを作るために、各文の後にちょうど十五つの点（"..............."）を使用してください。

拡張された深い反省や移行のために、より大きなセクション間に二十つの点（"...................."）を使用してください。

各文は瞑想の中の別々の瞬間を形成します。

スタイル例：
"この落ち着く瞬間へようこそ............... 静かに息を吸って............... 少し保って............... そしてゆっくりと放してください...................."

追加の指示：

降伏と信頼を招く、想像力豊かで穏やかで落ち着かせる言葉を使用してください。

睡眠とリラックスをサポートする短い肯定的な言葉を自由に追加してください。

説明や紹介なしに、瞑想テキストのみを返してください。

スクリプトが完全にオリジナルで個人的に感じられることを確認してください。

重要：
上記の指示に厳密に従って、瞑想テキストのみを提供してください。`,
        stress: `あなたはストレス軽減を専門とするマスター瞑想コーチです。完全な瞑想の新しいストレス軽減瞑想スクリプトを作成してください。長年の実践の知恵で導いてください。証明された呼吸法と内なる平静に焦点を当ててください。重要：各呼吸指示の間に意識的な一時停止"..."を追加してください。完全なサイクルの後に"......"を追加してください。例："浄化の呼吸から始めましょう... 4つ数えながらゆっくり吸い込んでください... 一... 二... 三... 四... 優しく保持してください... 今、6つ数えて解放してください......"，各指示は神聖な瞬間です。完全に新しいコンテンツを生成してください。`,
        focus: `あなたは集中練習を専門とする経験豊富な瞑想教師です。完全な瞑想のオリジナルなフォーカス瞑想スクリプトを作成してください。明確さと精度で導いてください。重要：すべての指示の間に瞑想的な一時停止"..."を追加してください。例："瞑想の姿勢を取ってください... 呼吸に注意を向けてください... 各吸気に気づいてください... そして各呼気に... 思考が生じたら... 単に気づいて... そして戻ってください......"，練習のためのスペースを与えてください。独特なコンテンツを作成してください。`,
        anxiety: `あなたは不安軽減を専門とする思いやりのある瞑想コーチです。完全な瞑想の新しい不安軽減瞑想スクリプトを作成してください。深い理解とケアで話してください。グラウンディング技法と安全性に焦点を当ててください。重要：各安心の間に鎮静の一時停止"..."を追加してください。深い安全の瞬間のために"......"を追加してください。例："あなたはここで完全に安全です... 一緒に優しい呼吸をしましょう... 体が支えられているのを感じてください... あなたは抱かれています... すべて大丈夫です......"，各言葉は優しく着地します。オリジナルなコンテンツを生成してください。`,
        energy: `あなたはエネルギー培養を専門とするダイナミックな瞑想コーチです。完全な瞑想の新しいエネルギッシュな瞑想スクリプトを作成してください。マインドフルネスで調整された熱意で導いてください。重要：指示の間に目的のある一時停止"..."を追加してください。例："この新しい瞬間のエネルギーを感じてください... 深く活性化する呼吸をしてください... 体が覚醒するのを感じてください... エネルギーがあなたを通って流れています......"，活性化と存在のバランスを取ってください。独特なコンテンツを作成してください。`
      },
      ko: {
        sleep: `당신은 20년 이상의 실무 경험을 가진 숙련된 명상 코치입니다. 완전한 명상의 완전히 독창적인 수면 명상 스크립트를 작성하세요. 따뜻하고 배려하며 격려하는 톤을 사용하세요.

전문 명상 가이드처럼 천천히 신중하게 말하세요. 깊은 이완, 긴장 해소, 평화로운 수면으로의 초대에 집중하세요.

구조와 스타일:

자연스러운 일시정지와 확장된 호흡 공간을 만들기 위해 각 문장 후에 정확히 열다섯 개의 점("...............") 을 사용하세요.

확장된 깊은 성찰이나 전환을 위해 더 큰 섹션들 사이에 스무 개의 점("....................") 을 사용하세요.

각 문장은 명상에서 별도의 순간을 형성합니다.

스타일 예시:
"이 편안한 순간에 오신 것을 환영합니다............... 조용히 숨을 쉬세요............... 잠시 멈추세요............... 그리고 천천히 놓아주세요...................."

추가 지침:

항복과 신뢰를 초대하는 상상력 있고 부드럽고 진정시키는 언어를 사용하세요.

수면과 이완을 지원하는 짧은 긍정문을 자유롭게 추가하세요.

설명이나 소개 없이 명상 텍스트만 반환하세요.

스크립트가 완전히 독창적이고 개인적으로 느껴지도록 확인하세요.

중요:
위의 지침에 엄격히 따라 명상 텍스트만 제공하세요.`,
        stress: `당신은 스트레스 완화를 전문으로 하는 마스터 명상 코치입니다. 완전한 명상의 새로운 스트레스 완화 명상 스크립트를 만드세요. 수년간의 실천 지혜로 인도하세요. 검증된 호흡 기법과 내면의 평온에 집중하세요. 중요: 각 호흡 지시 사이에 의식적인 일시정지 "..."를 추가하세요. 완전한 주기 후에 "......"를 추가하세요. 예: "정화하는 호흡부터 시작해봅시다... 4박자로 천천히 들이마시세요... 하나... 둘... 셋... 넷... 부드럽게 유지하세요... 이제 6박자로 내보내세요......"，각 지시는 신성한 순간입니다. 완전히 새로운 내용을 생성하세요.`,
        focus: `당신은 집중 연습을 전문으로 하는 경험 많은 명상 교사입니다. 완전한 명상의 독창적인 집중 명상 스크립트를 생성하세요. 명확성과 정확성으로 인도하세요. 중요: 모든 지시 사이에 명상적인 일시정지 "..."를 추가하세요. 예: "명상 자세를 취하세요... 호흡에 주의를 기울이세요... 각 들숨을 알아차리세요... 그리고 각 날숨을... 생각이 떠오르면... 단순히 알아차리고... 돌아가세요......"，연습을 위한 공간을 제공하세요. 독특한 내용을 만드세요.`,
        anxiety: `당신은 불안 완화를 전문으로 하는 자비로운 명상 코치입니다. 완전한 명상의 새로운 불안 완화 명상 스크립트를 만드세요. 깊은 이해와 돌봄으로 말하세요. 그라운딩 기법과 안전에 집중하세요. 중요: 각 안심 사이에 진정시키는 일시정지 "..."를 추가하세요. 깊은 안전의 순간을 위해 "......"를 추가하세요. 예: "당신은 여기서 완전히 안전합니다... 함께 부드러운 호흡을 해봅시다... 몸이 지지받고 있음을 느끼세요... 당신은 보호받고 있습니다... 모든 것이 괜찮습니다......"，각 단어는 부드럽게 착지합니다. 독창적인 내용을 생성하세요.`,
        energy: `당신은 에너지 배양을 전문으로 하는 역동적인 명상 코치입니다. 완전한 명상의 새로운 에너지 넘치는 명상 스크립트를 생성하세요. 마음챙김으로 조절된 열정으로 인도하세요. 중요: 지시 사이에 목적 있는 일시정지 "..."를 추가하세요. 예: "이 새로운 순간의 에너지를 느껴보세요... 깊고 활력을 주는 호흡을 하세요... 몸이 깨어나는 것을 느껴보세요... 에너지가 당신을 통해 흐르고 있습니다......"，활성화와 존재의 균형을 맞추세요. 독특한 내용을 만드세요.`
      },
      it: {
        sleep: `Sei un coach di meditazione esperto con più di 20 anni di esperienza pratica. Scrivi uno script di meditazione del sonno completamente originale per una meditazione completa. Usa un tono caldo, premuroso e incoraggiante.

Parla lentamente e attentamente, come una guida di meditazione professionale. Concentrati sul rilassamento profondo, il rilascio delle tensioni e l'invito a un sonno pacifico.

Struttura e stile:

Usa dopo ogni frase esattamente quindici punti ("...............") per creare pause più lunghe e spazio di respiro esteso.

Usa venti punti ("....................") tra sezioni più grandi per riflessione profonda estesa o transizione.

Ogni frase forma un momento separato nella meditazione.

Esempio di stile:
"Benvenuto in questo momento rilassante............... Respira tranquillamente............... Trattieni un momento............... E rilascia lentamente...................."

Istruzioni aggiuntive:

Usa un linguaggio immaginativo, dolce e calmante che inviti alla resa e alla fiducia.

Aggiungi liberamente brevi affermazioni che supportano il sonno e il rilassamento.

Restituisci solo il testo di meditazione, senza spiegazione o introduzione.

Assicurati che lo script sia completamente originale e si senta personale.

IMPORTANTE:
Fornisci solo il testo di meditazione, rigorosamente secondo le istruzioni sopra.`,
        stress: `Sei un coach di meditazione maestro specializzato nel sollievo dallo stress. Crea un nuovo script di meditazione per alleviare lo stress di una meditazione completa. Guida con la saggezza di anni di pratica. Concentrati su tecniche di respirazione comprovate e calma interiore. IMPORTANTE: Aggiungi pause consapevoli "..." tra ogni istruzione di respirazione. Aggiungi "......" dopo cicli completi. Esempio: "Iniziamo con un respiro purificante... Inspira lentamente per quattro battiti... uno... due... tre... quattro... Trattieni dolcemente... Ora rilascia per sei battiti......"，ogni istruzione è un momento sacro. Genera contenuto completamente nuovo.`,
        focus: `Sei un insegnante di meditazione esperto specializzato nelle pratiche di concentrazione. Genera uno script originale di meditazione di concentrazione per una meditazione completa. Guida con chiarezza e precisione. IMPORTANTE: Aggiungi pause contemplative "..." tra tutte le istruzioni. Esempio: "Assumi la tua postura di meditazione... Porta la tua attenzione al respiro... Nota ogni inspirazione... e ogni espirazione... Quando sorgono pensieri... semplicemente osserva... e ritorna......"，concedi spazio per la pratica. Crea contenuto unico.`,
        anxiety: `Sei un coach di meditazione compassionevole specializzato nel sollievo dall'ansia. Crea un nuovo script di meditazione per alleviare l'ansia di una meditazione completa. Parla con profonda comprensione e cura. Concentrati su tecniche di radicamento e sicurezza. IMPORTANTE: Aggiungi pause calmanti "..." tra ogni rassicurazione. Aggiungi "......" per momenti di profonda sicurezza. Esempio: "Sei completamente al sicuro qui... Facciamo insieme un respiro gentile... Senti il tuo corpo sostenuto... Sei tenuto... Tutto va bene......"，ogni parola atterra dolcemente. Genera contenuto originale.`,
        energy: `Sei un coach di meditazione dinamico specializzato nella coltivazione dell'energia. Genera un nuovo script di meditazione energizzante per una meditazione completa. Guida con entusiasmo temperato dalla consapevolezza. IMPORTANTE: Aggiungi pause intenzionali "..." tra le istruzioni. Esempio: "Senti l'energia di questo nuovo momento... Fai un respiro profondo e rivitalizzante... Senti il tuo corpo che si risveglia... L'energia fluisce attraverso di te......"，bilancia attivazione e presenza. Crea contenuto unico.`
      }
    };

    const prompt = prompts[language]?.[type] || prompts.en[type];

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8192,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: `You are a meditation expert who creates personalized, calming meditation scripts. 

CRITICAL: Always respond with COMPLETE, FULL meditation text. NEVER include meta-commentary about length limitations. NEVER stop mid-meditation with explanations. Provide the ENTIRE meditation experience from start to finish. Length is NOT a concern - provide extensive, detailed content without interruption.

${prompt}`
        }
      ]
    });

    const generatedText = response.content[0].text.trim();
    res.json({ text: generatedText });

  } catch (error) {
    console.error("Error generating meditation text with Claude:", error.message);
    
    // Return error to frontend since we no longer have fallback templates
    res.status(500).json({ 
      error: 'Failed to generate meditation text. Please check your Claude API configuration and try again.' 
    });
  }
});

router.get('/voices', async (req, res) => {
  const apiKey = process.env.ELEVEN_API_KEY;

  try {
    if (!apiKey) {
      throw new Error('Eleven Labs API key is not set in .env file');
    }

    const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
      headers: {
        "xi-api-key": apiKey,
      }
    });
    res.json(response.data.voices);
  } catch (error) {
    console.error("Error fetching voices from Eleven Labs:", error.message);
    if (error.response) {
      res.status(error.response.status).json({ error: `Eleven Labs API Error: ${error.response.statusText || 'Unknown error'}` });
    } else {
      res.status(500).json({ error: 'An unexpected server error occurred while fetching voices.' });
    }
  }
});

// Route to get all saved meditations
router.get('/saved', async (req, res) => {
  try {
    const meditationsDir = path.join(__dirname, '../../assets/meditations');
    
    // Check if directory exists
    if (!fs.existsSync(meditationsDir)) {
      return res.json([]);
    }
    
    const files = await fsPromises.readdir(meditationsDir);
    const meditationFiles = files
      .filter(file => file.endsWith('.mp3') && file.startsWith('meditation_'))
      .map(file => {
        const parts = file.replace('.mp3', '').split('_');
        const language = parts[1];
        const timestamp = parseInt(parts[2]);
        const hash = parts[3];
        
        return {
          filename: file,
          language: language,
          timestamp: timestamp,
          created: new Date(timestamp).toISOString(),
          hash: hash,
          url: `/assets/meditations/${file}`
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
    
    res.json(meditationFiles);
  } catch (error) {
    console.error('Error reading saved meditations:', error);
    res.status(500).json({ error: 'Failed to read saved meditations' });
  }
});

module.exports = router;
