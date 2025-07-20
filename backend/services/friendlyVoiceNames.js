// Spiritual and meditative names for Google TTS voices
// Universal names not tied to specific languages or cultures

const friendlyVoiceNames = {
  // English (US) voices - Spiritual names
  'en-US-Wavenet-A': { name: 'Zen', gender: 'male' },
  'en-US-Wavenet-B': { name: 'Bodhi', gender: 'male' },
  'en-US-Wavenet-C': { name: 'Serenity', gender: 'female' },
  'en-US-Wavenet-D': { name: 'Sage', gender: 'male' },
  'en-US-Wavenet-E': { name: 'Harmony', gender: 'female' },
  'en-US-Wavenet-F': { name: 'Peace', gender: 'female' },
  'en-US-Wavenet-G': { name: 'Bliss', gender: 'female' },
  'en-US-Wavenet-H': { name: 'Tranquil', gender: 'female' },
  'en-US-Wavenet-I': { name: 'Om', gender: 'male' },
  'en-US-Wavenet-J': { name: 'Karma', gender: 'male' },
  'en-US-Neural2-A': { name: 'Dharma', gender: 'male' },
  'en-US-Neural2-C': { name: 'Luna', gender: 'female' },
  'en-US-Neural2-D': { name: 'River', gender: 'male' },
  'en-US-Neural2-E': { name: 'Aurora', gender: 'female' },
  'en-US-Neural2-F': { name: 'Grace', gender: 'female' },
  'en-US-Neural2-G': { name: 'Star', gender: 'female' },
  'en-US-Neural2-H': { name: 'Mystic', gender: 'female' },
  'en-US-Neural2-I': { name: 'Sol', gender: 'male' },
  'en-US-Neural2-J': { name: 'Ocean', gender: 'male' },
  
  // Studio Voices (Premium) - Ultra high quality
  'en-US-Studio-O': { name: 'Divine', gender: 'female' },
  'en-US-Studio-Q': { name: 'Eternal', gender: 'male' },
  
  // Polyglot Neural2 voices (Multi-language)
  'en-US-Polyglot-1': { name: 'Universal', gender: 'male' },
  
  // Chirp3-HD Voices (Latest Premium Technology - 2025)
  // Available in 40+ languages with ultra-realistic quality
  'en-US-Chirp3-HD-Achernar': { name: 'Celestial', gender: 'female' },
  'en-US-Chirp3-HD-Achird': { name: 'Cosmic', gender: 'male' },
  'en-US-Chirp3-HD-Algenib': { name: 'Stellar', gender: 'male' },
  'en-US-Chirp3-HD-Algieba': { name: 'Galaxy', gender: 'male' },
  'en-US-Chirp3-HD-Alnilam': { name: 'Nebula', gender: 'male' },
  'en-US-Chirp3-HD-Aoede': { name: 'Melody', gender: 'female' },
  'en-US-Chirp3-HD-Autonoe': { name: 'Harmony', gender: 'female' },
  'en-US-Chirp3-HD-Callirrhoe': { name: 'Flow', gender: 'female' },
  'en-US-Chirp3-HD-Charon': { name: 'Guardian', gender: 'male' },
  'en-US-Chirp3-HD-Despina': { name: 'Whisper', gender: 'female' },
  'en-US-Chirp3-HD-Enceladus': { name: 'Frost', gender: 'male' },
  'en-US-Chirp3-HD-Erinome': { name: 'Echo', gender: 'female' },
  'en-US-Chirp3-HD-Fenrir': { name: 'Storm', gender: 'male' },
  'en-US-Chirp3-HD-Gacrux': { name: 'Radiant', gender: 'female' },
  'en-US-Chirp3-HD-Iapetus': { name: 'Ancient', gender: 'male' },
  'en-US-Chirp3-HD-Kore': { name: 'Pure', gender: 'female' },
  'en-US-Chirp3-HD-Laomedeia': { name: 'Gentle', gender: 'female' },
  'en-US-Chirp3-HD-Leda': { name: 'Swan', gender: 'female' },
  'en-US-Chirp3-HD-Orus': { name: 'Dawn', gender: 'male' },
  'en-US-Chirp3-HD-Pulcherrima': { name: 'Beautiful', gender: 'female' },
  'en-US-Chirp3-HD-Puck': { name: 'Spirit', gender: 'male' },
  'en-US-Chirp3-HD-Rasalgethi': { name: 'Crown', gender: 'male' },
  'en-US-Chirp3-HD-Sadachbia': { name: 'Fortune', gender: 'male' },
  'en-US-Chirp3-HD-Sadaltager': { name: 'Merchant', gender: 'male' },
  'en-US-Chirp3-HD-Schedar': { name: 'Throne', gender: 'male' },
  'en-US-Chirp3-HD-Sulafat': { name: 'Turtle', gender: 'female' },
  'en-US-Chirp3-HD-Umbriel': { name: 'Shadow', gender: 'male' },
  'en-US-Chirp3-HD-Vindemiatrix': { name: 'Harvest', gender: 'female' },
  'en-US-Chirp3-HD-Zephyr': { name: 'Breeze', gender: 'female' },
  'en-US-Chirp3-HD-Zubenelgenubi': { name: 'Balance', gender: 'male' },

  // Dutch (Netherlands) voices - Spiritual names (verified existing voices only)
  'nl-NL-Wavenet-A': { name: 'Aura', gender: 'male' },
  'nl-NL-Wavenet-C': { name: 'Spirit', gender: 'male' },
  'nl-NL-Wavenet-D': { name: 'Calm', gender: 'female' },
  'nl-NL-Wavenet-E': { name: 'Lotus', gender: 'female' },
  'nl-NL-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Chirp3-HD voices may not be available for Dutch yet
  // Uncomment when verified:
  // 'nl-NL-Chirp3-HD-Kore': { name: 'Zuiver', gender: 'female' },

  // Spanish (Spain) voices - Spiritual names (verified existing voices only)
  'es-ES-Wavenet-B': { name: 'Carlos', gender: 'male' },
  'es-ES-Wavenet-C': { name: 'Alma', gender: 'female' },
  'es-ES-Wavenet-D': { name: 'Cosmos', gender: 'male' },
  'es-ES-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 and Chirp3-HD voices commented out until verified
  // 'es-ES-Neural2-C': { name: 'Gaia', gender: 'female' },

  // French (France) voices - Spiritual names (verified existing voices only)
  'fr-FR-Wavenet-A': { name: 'Atman', gender: 'male' },
  'fr-FR-Wavenet-B': { name: 'Clarity', gender: 'female' },
  'fr-FR-Wavenet-C': { name: 'Amara', gender: 'female' },
  'fr-FR-Wavenet-D': { name: 'Gabriel', gender: 'male' },
  'fr-FR-Wavenet-E': { name: 'Chi', gender: 'female' },
  'fr-FR-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 voices commented out until verified
  // 'fr-FR-Neural2-C': { name: 'Mantra', gender: 'female' },
  
  // French Chirp3-HD voices (Best Quality) - Conservative selection
  // Commented out until verified - add back gradually as confirmed working:
  'fr-FR-Chirp3-HD-Achernar': { name: 'Céleste', gender: 'female' },
  // 'fr-FR-Chirp3-HD-Kore': { name: 'Pure', gender: 'female' },
  // 'fr-FR-Chirp3-HD-Charon': { name: 'Gardien', gender: 'male' },
  // 'fr-FR-Chirp3-HD-Zephyr': { name: 'Brise', gender: 'female' },

  // German (Germany) voices - Spiritual names (verified existing voices only)
  'de-DE-Wavenet-A': { name: 'Serene', gender: 'female' },
  'de-DE-Wavenet-B': { name: 'Krishna', gender: 'male' },
  'de-DE-Wavenet-C': { name: 'Petal', gender: 'female' },
  'de-DE-Wavenet-D': { name: 'Mikhail', gender: 'male' },
  'de-DE-Wavenet-E': { name: 'Matrix', gender: 'male' },
  'de-DE-Wavenet-F': { name: 'Cloud', gender: 'female' },
  'de-DE-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 and Chirp3-HD voices commented out until verified
  // 'de-DE-Neural2-A': { name: 'Lila', gender: 'female' },

  // Italian (Italy) voices - Spiritual names (verified existing voices only)
  'it-IT-Wavenet-A': { name: 'Gratia', gender: 'female' },
  'it-IT-Wavenet-B': { name: 'Marco', gender: 'male' },
  'it-IT-Wavenet-C': { name: 'Francis', gender: 'male' },
  'it-IT-Wavenet-D': { name: 'Lorenzo', gender: 'male' },
  'it-IT-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 voices commented out until verified
  // 'it-IT-Neural2-A': { name: 'Alessa', gender: 'female' },

  // Portuguese (Brazil) voices - Spiritual names (verified existing voices only)
  'pt-BR-Wavenet-A': { name: 'Ana', gender: 'female' },
  'pt-BR-Wavenet-B': { name: 'Peace', gender: 'male' },
  'pt-BR-Wavenet-C': { name: 'Maria', gender: 'female' },
  'pt-BR-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 voices commented out until verified
  // 'pt-BR-Neural2-A': { name: 'Beatitude', gender: 'female' },

  // Russian (Russia) voices - Spiritual names (verified existing voices only)
  'ru-RU-Wavenet-A': { name: 'Anna', gender: 'female' },
  'ru-RU-Wavenet-B': { name: 'Alexander', gender: 'male' },
  'ru-RU-Wavenet-C': { name: 'Mara', gender: 'female' },
  'ru-RU-Wavenet-D': { name: 'Kathara', gender: 'female' },
  'ru-RU-Wavenet-E': { name: 'Dmitri', gender: 'male' },
  'ru-RU-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 voices commented out until verified
  // 'ru-RU-Neural2-A': { name: 'Olga', gender: 'female' },

  // Japanese (Japan) voices - Spiritual names (verified existing voices only)
  'ja-JP-Wavenet-A': { name: 'Sakura', gender: 'female' },
  'ja-JP-Wavenet-B': { name: 'Yui', gender: 'female' },
  'ja-JP-Wavenet-C': { name: 'Taro', gender: 'male' },
  'ja-JP-Wavenet-D': { name: 'Kenta', gender: 'male' },
  'ja-JP-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 voices commented out until verified
  // 'ja-JP-Neural2-B': { name: 'Misaki', gender: 'female' },

  // Korean (South Korea) voices - Spiritual names (verified existing voices only)
  'ko-KR-Wavenet-A': { name: 'Min-Seo', gender: 'female' },
  'ko-KR-Wavenet-B': { name: 'Ji-Min', gender: 'female' },
  'ko-KR-Wavenet-C': { name: 'Jun-Ho', gender: 'male' },
  'ko-KR-Wavenet-D': { name: 'Min-Jun', gender: 'male' },
  'ko-KR-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 voices commented out until verified
  // 'ko-KR-Neural2-A': { name: 'Seo-Yeon', gender: 'female' },

  // Chinese (Mandarin) voices - Spiritual names (verified existing voices only)
  'cmn-CN-Wavenet-A': { name: 'Xiao-Mei', gender: 'female' },
  'cmn-CN-Wavenet-B': { name: 'Zhi-Qiang', gender: 'male' },
  'cmn-CN-Wavenet-C': { name: 'Wei-Jie', gender: 'male' },
  'cmn-CN-Wavenet-D': { name: 'Xiao-Xiao', gender: 'female' },
  'cmn-CN-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 voices commented out until verified
  // 'cmn-CN-Neural2-D': { name: 'Si-Han', gender: 'female' },

  // Arabic voices - Spiritual names (verified existing voices only)
  'ar-XA-Wavenet-A': { name: 'Fatima', gender: 'female' },
  'ar-XA-Wavenet-B': { name: 'Ahmad', gender: 'male' },
  'ar-XA-Wavenet-C': { name: 'Omar', gender: 'male' },
  'ar-XA-Wavenet-D': { name: 'Layla', gender: 'female' },
  'ar-XA-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 voices commented out until verified
  // 'ar-XA-Neural2-D': { name: 'Yasmin', gender: 'female' },

  // Hindi voices - Spiritual names (verified existing voices only)
  'hi-IN-Wavenet-A': { name: 'Priya', gender: 'female' },
  'hi-IN-Wavenet-B': { name: 'Rahul', gender: 'male' },
  'hi-IN-Wavenet-C': { name: 'Arjun', gender: 'male' },
  'hi-IN-Wavenet-D': { name: 'Aarti', gender: 'female' },
  'hi-IN-Wavenet-E': { name: 'Vikas', gender: 'male' },
  'hi-IN-Standard-A': { name: 'Classic', gender: 'female' },
  
  // Note: Neural2 voices commented out until verified
  // 'hi-IN-Neural2-D': { name: 'Pooja', gender: 'female' }
};

// Function to get friendly voice info
const getFriendlyVoiceInfo = (voiceId) => {
  const friendlyInfo = friendlyVoiceNames[voiceId];
  
  if (friendlyInfo) {
    return {
      name: friendlyInfo.name,
      gender: friendlyInfo.gender,
      technicalId: voiceId
    };
  }
  
  // Fallback for unknown voices - generate culturally appropriate names
  const parts = voiceId.split('-');
  const lang = parts[0];
  const country = parts[1];
  const type = parts[2];
  const identifier = parts[3];
  
  // Default name pools per language
  const fallbackNames = {
    'en': {
      male: ['Wisdom', 'Radiance', 'Cosmos', 'Angel', 'Journey', 'Rain', 'Brahma', 'Jasper', 'Justice', 'Karma'],
      female: ['Jewel', 'Aria', 'Amrita', 'Joy', 'Miracle', 'Light', 'Kala', 'Patience', 'Hope', 'Nova']
    },
    'nl': {
      male: ['Sage', 'Truth', 'Joy', 'Raven', 'Neo', 'Tai', 'Kai', 'Mind', 'Jai', 'Peace'],
      female: ['Lila', 'Shanti', 'Eva', 'Anima', 'Isha', 'Flora', 'Ishta', 'Nina', 'Rosa', 'Veda']
    },
    'es': {
      male: ['Jivan', 'Juno', 'Mantra', 'Ananda', 'Jaya', 'Dante', 'Alma', 'Fuego', 'Rio', 'Eden'],
      female: ['Chandra', 'Ishani', 'Aria', 'Lara', 'Kira', 'Maya', 'Sera', 'Para', 'Asha', 'Nada']
    },
    'fr': {
      male: ['Sage', 'Spirit', 'Mystic', 'Phoenix', 'Cosmos', 'Flame', 'Horizon', 'Crystal', 'Yogi', 'Magnus'],
      female: ['Maya', 'Sophia', 'Isabella', 'Natalie', 'Sylvia', 'Celeste', 'Valeria', 'Sandra', 'Julia', 'Aurelia']
    },
    'de': {
      male: ['Mikhail', 'Shiva', 'Andros', 'Markus', 'Mantra', 'Christ', 'Daniel', 'Maitri', 'Prem', 'Flux'],
      female: ['Shakti', 'Clara', 'Pema', 'Monica', 'Sunya', 'Nova', 'Andra', 'Katha', 'Christa', 'Mela']
    },
    'it': {
      male: ['Roberto', 'Stefano', 'Alexandro', 'David', 'Simone', 'Matteo', 'Luca', 'Andrea', 'Paolo', 'Mario'],
      female: ['Sophia', 'Francia', 'Valentina', 'Martina', 'Sera', 'Elena', 'Lara', 'Silva', 'Elisa', 'Paola']
    },
    'pt': {
      male: ['Joao', 'Carlos', 'Paulo', 'Lucas', 'Mateus', 'Gabriel', 'Bruno', 'Rodrigo', 'Felipe', 'Andre'],
      female: ['Juliana', 'Amanda', 'Bruna', 'Fernanda', 'Patricia', 'Larissa', 'Leticia', 'Gabriela', 'Renata', 'Carla']
    },
    'ru': {
      male: ['Sergei', 'Andrei', 'Alexei', 'Vladimir', 'Mikhail', 'Nikolai', 'Pavel', 'Maxim', 'Artem', 'Denis'],
      female: ['Elena', 'Natalia', 'Tatiana', 'Irina', 'Svetlana', 'Ludmila', 'Valentina', 'Galina', 'Nadezhda', 'Vera']
    },
    'ja': {
      male: ['Takashi', 'Masaru', 'Yuuki', 'Ryou', 'Souta', 'Daiki', 'Shouta', 'Yuuto', 'Kaito', 'Haruto'],
      female: ['Ai', 'Mai', 'Reina', 'Miu', 'Rio', 'Nana', 'Yuna', 'Momo', 'Hina', 'Kanna']
    },
    'ko': {
      male: ['Seong-Min', 'Jung-Ho', 'Seung-Hyun', 'Dong-Wook', 'Hyun-Soo', 'Seong-Jin', 'Jae-Hyun', 'Tae-Yang', 'Woo-Jin', 'Sang-Min'],
      female: ['Ye-Jin', 'Su-Bin', 'Da-Eun', 'Chae-Won', 'Ha-Rin', 'Ji-Woo', 'So-Hyun', 'Mi-Na', 'Yu-Jin', 'Seo-A']
    },
    'cmn': {
      male: ['Jian-Guo', 'Ming-Yuan', 'Hao-Tian', 'Zi-Xuan', 'Yu-Hang', 'Bo-Wen', 'Si-Yuan', 'Jia-Hao', 'Tian-Xiang', 'Wen-Bo'],
      female: ['Ting-Ting', 'Jing-Yi', 'Jia-Qi', 'Xue-Er', 'Shi-Han', 'Xin-Yi', 'Zi-Han', 'Meng-Jie', 'Yu-Wei', 'Ke-Xin']
    },
    'ar': {
      male: ['Karim', 'Sami', 'Tariq', 'Walid', 'Yasser', 'Ziad', 'Khalid', 'Rami', 'Basim', 'Nader'],
      female: ['Sarah', 'Hind', 'Rania', 'Dina', 'Mona', 'Salma', 'Hiba', 'Amal', 'Reem', 'Jamila']
    },
    'hi': {
      male: ['Suresh', 'Rajesh', 'Mahesh', 'Dinesh', 'Ramesh', 'Kamal', 'Vinod', 'Ashok', 'Sanjay', 'Vijay'],
      female: ['Sunita', 'Gita', 'Rita', 'Anita', 'Kavita', 'Mamta', 'Savita', 'Nisha', 'Rekha', 'Mira']
    }
  };
  
  // Get appropriate name based on language and identifier
  const langCode = lang === 'cmn' ? 'cmn' : lang;
  const names = fallbackNames[langCode] || fallbackNames['en'];
  
  // Determine gender from identifier or use pattern
  let gender = 'unknown';
  let nameList = names.male.concat(names.female);
  
  // Common patterns for gender identification
  if (identifier) {
    const upperIdentifier = identifier.toUpperCase();
    if (['A', 'C', 'E', 'G', 'I'].includes(upperIdentifier) || upperIdentifier > 'K') {
      gender = 'female';
      nameList = names.female;
    } else {
      gender = 'male';
      nameList = names.male;
    }
  }
  
  // Use identifier to consistently pick a name from the list
  const index = identifier ? identifier.charCodeAt(0) % nameList.length : 0;
  const name = nameList[index];
  
  console.log(`Fallback for ${voiceId}: ${name} (${gender})`);
  
  return {
    name: name,
    gender: gender.toUpperCase(),
    technicalId: voiceId
  };
};

module.exports = {
  friendlyVoiceNames,
  getFriendlyVoiceInfo
};