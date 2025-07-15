
const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs'); // For synchronous operations like existsSync
const fsPromises = require('fs').promises; // Use promise-based fs
const path = require('path');
const { spawn } = require('child_process');
const os = require('os'); // Import os module for temporary directory

router.post('/', async (req, res) => {
  const { text, voiceId, background, language } = req.body;
  const apiKey = process.env.ELEVEN_API_KEY;

  let speechPath;
  let outputPath;
  let tempDir;

  try {
    if (!apiKey) {
      throw new Error('Eleven Labs API key is not set in .env file');
    }

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text,
        model_id: language === 'en' ? "eleven_monolingual_v1" : "eleven_multilingual_v2",
        voice_settings: { stability: 0.4, similarity_boost: 0.75 }
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
    outputPath = path.join(__dirname, `../../public/meditation_result.mp3`); // Output to public for download

    const outputDir = path.dirname(outputPath);
    await fsPromises.mkdir(outputDir, { recursive: true }); // Create output directory if it doesn't exist

    console.log(`Response data length: ${response.data.length} bytes`);

    await fsPromises.writeFile(speechPath, Buffer.from(response.data));
    console.log(`Temporary speech file written to: ${speechPath}`);

    // Verify if the file exists after writing
    if (fs.existsSync(speechPath)) {
      console.log('Temporary speech file exists.');
    } else {
      console.error('Temporary speech file does not exist after writing.');
    }

    const ffmpegPath = 'C:\\ffmpeg\\ffmpeg-7.1.1-essentials_build\\bin\\ffmpeg.exe'; // User-provided FFmpeg path
    const ffmpeg = spawn(ffmpegPath, [
      '-i', speechPath,
      '-i', backgroundPath,
      '-filter_complex', '[0:a]atempo=1.0[a0];[1:a]volume=0.10[a1];[a0][a1]amix=inputs=2:duration=first:dropout_transition=3',
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

    res.download(outputPath, 'meditation_result.mp3', async (err) => {
      if (err) {
        console.error("Error during file download:", err);
      }
      // Clean up temporary files
      try {
        await fsPromises.unlink(speechPath);
        await fsPromises.unlink(outputPath);
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

module.exports = router;
