
const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs'); // For synchronous operations like existsSync
const fsPromises = require('fs').promises; // Use promise-based fs
const path = require('path');
const { spawn } = require('child_process');
const os = require('os'); // Import os module for temporary directory
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
  const { text, voiceId, background, language } = req.body;
  const apiKey = process.env.ELEVEN_API_KEY;

  let speechPath;
  let outputPath;
  let tempDir;

  try {
    if (!apiKey) {
      throw new Error('Eleven Labs API key is not set in .env file');
    }

    // Add pauses to the text
    const processedText = addSSMLPauses(text);
    
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: processedText,
        model_id: language === 'en' ? "eleven_monolingual_v1" : "eleven_multilingual_v2",
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
      '-y', // Automatically overwrite output files without asking
      '-i', speechPath,
      '-i', backgroundPath,
      '-filter_complex', 
      // Create 10 second intro with louder background music (0.4 volume)
      '[1:a]atrim=0:10,volume=0.4[intro];' +
      // Slow down speech even more for deeper meditative pace
      '[0:a]atempo=0.7,atempo=0.75[speech_slow];' +
      // Create background music for during speech (0.1 volume)
      '[1:a]volume=0.1[bg_low];' +
      // Add 10 second delay to speech
      '[speech_slow]adelay=10000|10000[speech_delayed];' +
      // Use sidechain compression to make background react to speech
      // When speech is present, background ducks down; when silent, it rises
      '[bg_low][speech_delayed]sidechaincompress=threshold=0.05:ratio=5:attack=50:release=500:makeup=2[bg_dynamic];' +
      // Mix intro with silent padding for first 10 seconds
      '[intro]apad=whole_dur=10[intro_padded];' +
      // Create fade effect: crossfade from intro to dynamic background when speech starts
      '[intro_padded][bg_dynamic]acrossfade=d=2:c1=tri:c2=tri[bg_faded];' +
      // Add 25 seconds of silence to the end of speech for extended outro
      '[speech_delayed]apad=pad_dur=25[speech_with_outro];' +
      // Mix speech with outro and faded background
      '[speech_with_outro][bg_faded]amix=inputs=2:duration=first:dropout_transition=3',
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

// Local fallback text generation function
const generateLocalMeditationText = (type, duration, language) => {
  const templates = {
    sleep: {
      en: [
        "Close your eyes and take a deep breath... Feel your body sinking into the bed with each exhale... Let go of the day's worries and tensions...... Your mind is becoming calm and peaceful... Allow yourself to drift into restful sleep...",
        "Settle into your comfortable position... Breathe slowly and deeply... With each breath, feel yourself becoming more relaxed...... Your body is heavy and warm... You are ready for peaceful, restorative sleep...",
        "Let your breathing become slow and natural... Feel each part of your body relaxing, starting from your head... down to your toes...... You are safe and at peace... Sleep comes easily and naturally..."
      ],
      nl: [
        "Welkom in dit moment van vrede... Sluit je ogen zachtjes... Neem een diepe... verzorgende ademhaling... Voel je lichaam wegzinken in het bed... Met elke uitademing... laat je de zorgen van de dag los...... Je geest wordt kalm... en vreedzaam... Laat jezelf zachtjes wegdrijven... naar rustgevende slaap...",
        "Nestel je comfortabel in je positie... Adem langzaam... en diep... Met elke ademhaling... voel je jezelf meer ontspannen worden... Je lichaam wordt zwaar... en warm... Je bent volledig klaar... voor vreedzame... herstellende slaap...... Laat de slaap je omhullen...",
        "Laat je ademhaling langzaam... en natuurlijk worden... Voel elk deel van je lichaam ontspannen... beginnend vanaf je hoofd... langzaam naar beneden... tot je tenen...... Je bent veilig... en in vrede... Slaap komt gemakkelijk... en natuurlijk... Laat je gaan..."
      ],
      de: [
        "Schließe deine Augen und atme tief ein. Spüre, wie dein Körper mit jedem Ausatmen ins Bett sinkt. Lass die Sorgen und Spannungen des Tages los. Dein Geist wird ruhig und friedlich. Erlaube dir, in erholsamen Schlaf zu gleiten.",
        "Mache es dir in deiner bequemen Position gemütlich. Atme langsam und tief. Mit jedem Atemzug fühlst du dich entspannter. Dein Körper ist schwer und warm. Du bist bereit für friedlichen, erholsamen Schlaf.",
        "Lass deine Atmung langsam und natürlich werden. Spüre, wie sich jeder Teil deines Körpers entspannt, von deinem Kopf bis zu deinen Zehen. Du bist sicher und in Frieden. Schlaf kommt einfach und natürlich."
      ],
      es: [
        "Cierra los ojos y respira profundamente. Siente tu cuerpo hundiéndose en la cama con cada exhalación. Deja ir las preocupaciones y tensiones del día. Tu mente se vuelve tranquila y pacífica. Permítete deslizarte hacia un sueño reparador.",
        "Acomódate en tu posición cómoda. Respira lenta y profundamente. Con cada respiración, te sientes más relajado. Tu cuerpo está pesado y cálido. Estás listo para un sueño pacífico y reparador.",
        "Deja que tu respiración se vuelva lenta y natural. Siente cada parte de tu cuerpo relajándose, desde tu cabeza hasta los dedos de los pies. Estás seguro y en paz. El sueño llega fácil y naturalmente."
      ],
      fr: [
        "Fermez les yeux et respirez profondément. Sentez votre corps s'enfoncer dans le lit à chaque expiration. Relâchez les soucis et tensions de la journée. Votre esprit devient calme et paisible. Permettez-vous de glisser vers un sommeil réparateur.",
        "Installez-vous confortablement. Respirez lentement et profondément. À chaque respiration, vous vous sentez plus détendu. Votre corps est lourd et chaud. Vous êtes prêt pour un sommeil paisible et réparateur.",
        "Laissez votre respiration devenir lente et naturelle. Sentez chaque partie de votre corps se détendre, de votre tête jusqu'au bout des orteils. Vous êtes en sécurité et en paix. Le sommeil vient facilement et naturellement."
      ],
      pt: [
        "Feche os olhos e respire profundamente... Sinta seu corpo afundando na cama a cada expiração... Libere as preocupações e tensões do dia... Sua mente se torna calma... e pacífica... Permita-se deslizar para um sono reparador...",
        "Acomode-se confortavelmente... Respire lenta e profundamente... A cada respiração... você se sente mais relaxado... Seu corpo está pesado... e quente... Você está pronto para um sono pacífico... e reparador...",
        "Deixe sua respiração se tornar lenta... e natural... Sinta cada parte do seu corpo relaxar... começando pela cabeça... descendo até os dedos dos pés... Você está seguro... e em paz... O sono vem facilmente... e naturalmente..."
      ],
      ru: [
        "Закройте глаза и глубоко вдохните... Почувствуйте, как ваше тело погружается в кровать с каждым выдохом... Отпустите заботы и напряжение дня... Ваш разум становится спокойным... и мирным... Позвольте себе соскользнуть в восстанавливающий сон...",
        "Устройтесь поудобнее... Дышите медленно и глубоко... С каждым вдохом... вы чувствуете себя более расслабленным... Ваше тело тяжелое... и теплое... Вы готовы к мирному... восстанавливающему сну...",
        "Позвольте дыханию стать медленным... и естественным... Почувствуйте, как каждая часть вашего тела расслабляется... начиная с головы... спускаясь к пальцам ног... Вы в безопасности... и в покое... Сон приходит легко... и естественно..."
      ],
      ja: [
        "目を閉じて深呼吸してください... 息を吐くたびに体がベッドに沈み込むのを感じてください... 一日の心配や緊張を手放してください... あなたの心は穏やかで... 平和になっています... 回復の眠りへと滑り込むことを許してください...",
        "快適な位置に落ち着いてください... ゆっくりと深く呼吸してください... 各呼吸で... あなたはより relaxed になっています... あなたの体は重く... 暖かいです... あなたは平和で... 回復の眠りの準備ができています...",
        "呼吸をゆっくりと... 自然にしてください... 体の各部分がリラックスするのを感じてください... 頭から始まり... つま先まで... あなたは安全で... 平和です... 眠りは簡単に... 自然にやってきます..."
      ],
      ko: [
        "눈을 감고 깊게 숨을 쉬세요... 숨을 내쉴 때마다 몸이 침대에 가라앉는 것을 느끼세요... 하루의 걱정과 긴장을 놓아주세요... 마음이 고요하고... 평화로워집니다... 회복의 잠으로 미끄러져 들어가도록 허락하세요...",
        "편안한 자세로 자리를 잡으세요... 천천히 깊게 호흡하세요... 각 호흡과 함께... 더욱 편안해집니다... 몸이 무겁고... 따뜻합니다... 평화롭고... 회복의 잠을 위한 준비가 되었습니다...",
        "호흡을 천천히... 자연스럽게 하세요... 몸의 각 부분이 이완되는 것을 느끼세요... 머리부터 시작하여... 발끝까지... 안전하고... 평화롭습니다... 잠은 쉽게... 자연스럽게 찾아옵니다..."
      ],
      it: [
        "Chiudi gli occhi e respira profondamente... Senti il tuo corpo sprofondare nel letto ad ogni espirazione... Lascia andare le preoccupazioni e le tensioni del giorno... La tua mente diventa calma... e pacifica... Permettiti di scivolare nel sonno riparatore...",
        "Sistemati comodamente nella tua posizione... Respira lentamente e profondamente... Con ogni respiro... ti senti più rilassato... Il tuo corpo è pesante... e caldo... Sei pronto per un sonno pacifico... e riparatore...",
        "Lascia che il tuo respiro diventi lento... e naturale... Senti ogni parte del tuo corpo rilassarsi... iniziando dalla testa... scendendo fino alle dita dei piedi... Sei al sicuro... e in pace... Il sonno arriva facilmente... e naturalmente..."
      ]
    },
    stress: {
      en: [
        "Take a deep breath in through your nose for four counts. Hold for four counts. Exhale slowly through your mouth for six counts. Feel the tension leaving your body. You are strong and capable. This moment will pass.",
        "Place your hand on your heart and feel it beating steadily. Breathe in calm, breathe out worry. Your body knows how to find balance. You are in control of this moment.",
        "Imagine your stress as clouds in the sky. They come and go, but you remain steady like the sky itself. Breathe deeply and watch your worries drift away."
      ],
      nl: [
        "Neem een diepe ademhaling door je neus voor vier tellen. Houd vier tellen vast. Adem langzaam uit door je mond voor zes tellen. Voel de spanning je lichaam verlaten. Je bent sterk en bekwaam. Dit moment zal voorbijgaan.",
        "Leg je hand op je hart en voel het stabiel kloppen. Adem rust in, adem zorgen uit. Je lichaam weet hoe het balans kan vinden. Je hebt controle over dit moment.",
        "Stel je je stress voor als wolken aan de lucht. Ze komen en gaan, maar jij blijft stabiel als de lucht zelf. Adem diep en kijk hoe je zorgen wegdrijven."
      ],
      de: [
        "Atme tief durch die Nase für vier Zählungen ein. Halte für vier Zählungen an. Atme langsam durch den Mund für sechs Zählungen aus. Spüre, wie die Anspannung deinen Körper verlässt. Du bist stark und fähig. Dieser Moment wird vorübergehen.",
        "Lege deine Hand auf dein Herz und spüre es gleichmäßig schlagen. Atme Ruhe ein, atme Sorgen aus. Dein Körper weiß, wie er das Gleichgewicht findet. Du hast die Kontrolle über diesen Moment.",
        "Stelle dir deinen Stress wie Wolken am Himmel vor. Sie kommen und gehen, aber du bleibst stabil wie der Himmel selbst. Atme tief und beobachte, wie deine Sorgen wegdriften."
      ],
      es: [
        "Inhala profundamente por la nariz durante cuatro conteos. Mantén durante cuatro conteos. Exhala lentamente por la boca durante seis conteos. Siente la tensión abandonando tu cuerpo. Eres fuerte y capaz. Este momento pasará.",
        "Coloca tu mano en tu corazón y siéntelo latir constantemente. Inhala calma, exhala preocupación. Tu cuerpo sabe cómo encontrar el equilibrio. Tienes el control de este momento.",
        "Imagina tu estrés como nubes en el cielo. Vienen y van, pero tú permaneces firme como el cielo mismo. Respira profundamente y observa cómo tus preocupaciones se alejan."
      ],
      fr: [
        "Inspirez profondément par le nez pendant quatre temps. Retenez pendant quatre temps. Expirez lentement par la bouche pendant six temps. Sentez la tension quitter votre corps. Vous êtes fort et capable. Ce moment passera.",
        "Placez votre main sur votre cœur et sentez-le battre régulièrement. Inspirez le calme, expirez l'inquiétude. Votre corps sait comment trouver l'équilibre. Vous contrôlez ce moment.",
        "Imaginez votre stress comme des nuages dans le ciel. Ils viennent et repartent, mais vous restez stable comme le ciel lui-même. Respirez profondément et regardez vos soucis s'éloigner."
      ],
      pt: [
        "Inspire profundamente pelo nariz por quatro tempos... Segure por quatro tempos... Expire lentamente pela boca por seis tempos... Sinta a tensão deixando seu corpo... Você é forte e capaz... Este momento passará...",
        "Coloque sua mão no coração e sinta-o batendo firmemente... Inspire calma... expire preocupação... Seu corpo sabe como encontrar o equilíbrio... Você tem controle sobre este momento...",
        "Imagine seu estresse como nuvens no céu... Elas vêm e vão... mas você permanece estável como o próprio céu... Respire profundamente... e observe suas preocupações se afastarem..."
      ],
      ru: [
        "Глубоко вдохните через нос на четыре счета... Задержите на четыре счета... Медленно выдохните через рот на шесть счетов... Почувствуйте, как напряжение покидает ваше тело... Вы сильны и способны... Этот момент пройдет...",
        "Положите руку на сердце и почувствуйте, как оно бьется ровно... Вдохните спокойствие... выдохните беспокойство... Ваше тело знает, как найти баланс... Вы контролируете этот момент...",
        "Представьте свой стресс как облака в небе... Они приходят и уходят... но вы остаетесь стабильными как само небо... Дышите глубоко... и наблюдайте, как ваши тревоги удаляются..."
      ],
      ja: [
        "鼻から四つ数えて深く息を吸ってください... 四つ数えて息を止めてください... 口から六つ数えてゆっくり息を吐いてください... 緊張が体から離れるのを感じてください... あなたは強く有能です... この瞬間は過ぎ去ります...",
        "心臓に手を置いて... しっかりと鼓動するのを感じてください... 静けさを吸い込み... 心配を吐き出してください... あなたの体はバランスを見つける方法を知っています... あなたはこの瞬間をコントロールしています...",
        "あなたのストレスを空の雲として想像してください... それらは来て... 去っていきます... しかしあなたは空そのもののように安定したままです... 深く呼吸し... あなたの心配が遠ざかるのを見てください..."
      ],
      ko: [
        "코로 네 박자 동안 깊게 숨을 들이마시세요... 네 박자 동안 참으세요... 입으로 여섯 박자 동안 천천히 내쉬세요... 긴장이 몸에서 떠나는 것을 느끼세요... 당신은 강하고 유능합니다... 이 순간은 지나갈 것입니다...",
        "심장에 손을 올리고... 꾸준히 뛰는 것을 느끼세요... 평온함을 들이마시고... 걱정을 내쉬세요... 당신의 몸은 균형을 찾는 방법을 알고 있습니다... 당신이 이 순간을 통제하고 있습니다...",
        "당신의 스트레스를 하늘의 구름으로 상상해보세요... 그것들은 와서... 떠나갑니다... 하지만 당신은 하늘 자체처럼 안정되어 있습니다... 깊게 호흡하고... 걱정들이 떠나가는 것을 지켜보세요..."
      ],
      it: [
        "Inspira profondamente attraverso il naso per quattro battiti... Trattieni per quattro battiti... Espira lentamente attraverso la bocca per sei battiti... Senti la tensione lasciare il tuo corpo... Sei forte e capace... Questo momento passerà...",
        "Metti la mano sul cuore e sentilo battere costantemente... Inspira calma... espira preoccupazione... Il tuo corpo sa come trovare l'equilibrio... Hai il controllo di questo momento...",
        "Immagina il tuo stress come nuvole nel cielo... Vengono e vanno... ma tu rimani stabile come il cielo stesso... Respira profondamente... e guarda le tue preoccupazioni allontanarsi..."
      ]
    },
    focus: {
      en: [
        "Sit comfortably with your spine straight. Focus on your breathing - the sensation of air entering and leaving your nostrils. When your mind wanders, gently return to your breath. This is your anchor to the present moment.",
        "Choose a point in front of you to focus on softly. Breathe naturally and let your mind become clear. Thoughts will come and go - simply observe them without judgment and return to your focal point.",
        "Close your eyes and count your breaths from one to ten. One inhale, one exhale equals one. If you lose count, simply start again. This trains your mind to stay present and focused."
      ],
      nl: [
        "Zit comfortabel met je ruggengraat recht. Focus op je ademhaling - de sensatie van lucht die je neusgaten in en uit gaat. Wanneer je geest afdwaalt, keer zachtjes terug naar je ademhaling. Dit is je anker naar het huidige moment.",
        "Kies een punt voor je om zachtjes op te focussen. Adem natuurlijk en laat je geest helder worden. Gedachten zullen komen en gaan - observeer ze eenvoudig zonder oordeel en keer terug naar je focuspunt.",
        "Sluit je ogen en tel je ademhalingen van één tot tien. Eén inademing, één uitademing is één. Als je de tel kwijtraakt, begin gewoon opnieuw. Dit traint je geest om aanwezig en gefocust te blijven."
      ],
      de: [
        "Sitze bequem mit gerader Wirbelsäule. Konzentriere dich auf deine Atmung - das Gefühl von Luft, die durch deine Nasenlöcher ein- und ausströmt. Wenn deine Gedanken abschweifen, kehre sanft zu deinem Atem zurück. Dies ist dein Anker zum gegenwärtigen Moment.",
        "Wähle einen Punkt vor dir, auf den du dich sanft konzentrieren kannst. Atme natürlich und lass deinen Geist klar werden. Gedanken werden kommen und gehen - beobachte sie einfach ohne Urteil und kehre zu deinem Fokuspunkt zurück.",
        "Schließe deine Augen und zähle deine Atemzüge von eins bis zehn. Ein Einatmen, ein Ausatmen ist eins. Wenn du die Zählung verlierst, beginne einfach wieder. Dies trainiert deinen Geist, präsent und fokussiert zu bleiben."
      ],
      es: [
        "Siéntate cómodamente con la columna recta. Concéntrate en tu respiración - la sensación del aire entrando y saliendo por tus fosas nasales. Cuando tu mente divague, regresa suavemente a tu respiración. Este es tu ancla al momento presente.",
        "Elige un punto frente a ti para enfocarte suavemente. Respira naturalmente y deja que tu mente se aclare. Los pensamientos irán y vendrán - simplemente obsérvalos sin juzgar y regresa a tu punto focal.",
        "Cierra los ojos y cuenta tus respiraciones del uno al diez. Una inhalación, una exhalación es uno. Si pierdes la cuenta, simplemente comienza de nuevo. Esto entrena tu mente para permanecer presente y enfocada."
      ],
      fr: [
        "Asseyez-vous confortablement avec la colonne vertébrale droite. Concentrez-vous sur votre respiration - la sensation d'air entrant et sortant par vos narines. Quand votre esprit divague, revenez doucement à votre respiration. C'est votre ancre au moment présent.",
        "Choisissez un point devant vous sur lequel vous concentrer doucement. Respirez naturellement et laissez votre esprit devenir clair. Les pensées viendront et repartiront - observez-les simplement sans jugement et revenez à votre point focal.",
        "Fermez les yeux et comptez vos respirations de un à dix. Une inspiration, une expiration égale un. Si vous perdez le compte, recommencez simplement. Cela entraîne votre esprit à rester présent et concentré."
      ],
      pt: [
        "Sente-se confortavelmente com a coluna reta... Concentre-se na sua respiração... a sensação do ar entrando e saindo das narinas... Quando sua mente divagar... gentilmente retorne à sua respiração... Esta é sua âncora para o momento presente...",
        "Escolha um ponto à sua frente para focar suavemente... Respire naturalmente e deixe sua mente se tornar clara... Pensamentos virão e irão... simplesmente os observe sem julgamento... e retorne ao seu ponto focal...",
        "Feche os olhos e conte suas respirações de um a dez... Uma inspiração... uma expiração é igual a um... Se perder a contagem... simplesmente comece novamente... Isso treina sua mente para permanecer presente... e focada..."
      ],
      ru: [
        "Сядьте удобно с прямой спиной... Сосредоточьтесь на дыхании... ощущение воздуха, входящего и выходящего из ноздрей... Когда разум блуждает... мягко вернитесь к дыханию... Это ваш якорь к настоящему моменту...",
        "Выберите точку перед собой для мягкой концентрации... Дышите естественно и позвольте разуму стать ясным... Мысли придут и уйдут... просто наблюдайте их без осуждения... и возвращайтесь к фокусной точке...",
        "Закройте глаза и считайте дыхания от одного до десяти... Один вдох... один выдох равняется одному... Если потеряете счет... просто начните заново... Это тренирует ваш разум оставаться в настоящем... и сосредоточенным..."
      ],
      ja: [
        "背筋を伸ばして快適に座ってください... 呼吸に集中してください... 鼻孔から入り出る空気の感覚に... 心がさまよったら... 優しく呼吸に戻ってください... これが現在の瞬間へのアンカーです...",
        "前方の一点を選んで優しく集中してください... 自然に呼吸し... 心を透明にしてください... 思考が来て... 去るでしょう... 判断せずに単に観察し... 焦点に戻ってください...",
        "目を閉じて一から十まで呼吸を数えてください... 一回の吸気... 一回の呼気で一つです... 数を失ったら... 単にやり直してください... これは心を現在に... 集中したままにする訓練です..."
      ],
      ko: [
        "등을 곧게 펴고 편안하게 앉으세요... 호흡에 집중하세요... 콧구멍으로 들어오고 나가는 공기의 감각에... 마음이 헤맬 때... 부드럽게 호흡으로 돌아가세요... 이것이 현재 순간에 대한 당신의 닻입니다...",
        "앞쪽 한 점을 선택하여 부드럽게 집중하세요... 자연스럽게 호흡하고... 마음을 맑게 하세요... 생각들이 올 것이고... 갈 것입니다... 판단 없이 단순히 관찰하고... 초점으로 돌아가세요...",
        "눈을 감고 호흡을 하나부터 열까지 세어보세요... 한 번의 들숨... 한 번의 날숨이 하나입니다... 수를 잃으면... 단순히 다시 시작하세요... 이것은 마음을 현재에... 집중하도록 훈련하는 것입니다..."
      ],
      it: [
        "Siediti comodamente con la colonna vertebrale dritta... Concentrati sul respiro... la sensazione dell'aria che entra e esce dalle narici... Quando la mente vaga... torna dolcemente al respiro... Questo è il tuo ancoraggio al momento presente...",
        "Scegli un punto davanti a te su cui concentrarti dolcemente... Respira naturalmente e lascia che la mente diventi chiara... I pensieri verranno e andranno... semplicemente osservali senza giudizio... e torna al tuo punto focale...",
        "Chiudi gli occhi e conta i respiri da uno a dieci... Un'inspirazione... un'espirazione è uguale a uno... Se perdi il conto... semplicemente ricomincia... Questo allena la mente a rimanere presente... e concentrata..."
      ]
    },
    anxiety: {
      en: [
        "You are safe in this moment. Place your feet firmly on the ground. Take a slow breath in through your nose. Hold for three seconds. Exhale slowly through your mouth. Your nervous system is calming naturally.",
        "Notice five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste. You are grounded. You are here. You are okay.",
        "Breathe in peace and safety. Breathe out fear and worry. Your anxiety is temporary, but your strength is lasting. You have weathered difficult moments before, and you will again."
      ],
      nl: [
        "Je bent veilig in dit moment. Plaats je voeten stevig op de grond. Neem een langzame ademhaling door je neus. Houd drie seconden vast. Adem langzaam uit door je mond. Je zenuwstelsel wordt natuurlijk rustiger.",
        "Merk vijf dingen op die je kunt zien, vier dingen die je kunt aanraken, drie dingen die je kunt horen, twee dingen die je kunt ruiken, en één ding dat je kunt proeven. Je bent geaard. Je bent hier. Je bent oké.",
        "Adem vrede en veiligheid in. Adem angst en zorgen uit. Je angst is tijdelijk, maar je kracht is blijvend. Je hebt eerder moeilijke momenten doorstaan, en je zult het weer doen."
      ],
      de: [
        "Du bist in diesem Moment sicher. Stelle deine Füße fest auf den Boden. Atme langsam durch die Nase ein. Halte drei Sekunden an. Atme langsam durch den Mund aus. Dein Nervensystem beruhigt sich natürlich.",
        "Bemerke fünf Dinge, die du sehen kannst, vier Dinge, die du berühren kannst, drei Dinge, die du hören kannst, zwei Dinge, die du riechen kannst, und eine Sache, die du schmecken kannst. Du bist geerdet. Du bist hier. Du bist okay.",
        "Atme Frieden und Sicherheit ein. Atme Angst und Sorgen aus. Deine Angst ist vorübergehend, aber deine Stärke ist dauerhaft. Du hast schon früher schwierige Momente überstanden, und du wirst es wieder tun."
      ],
      es: [
        "Estás seguro en este momento. Coloca tus pies firmemente en el suelo. Respira lentamente por la nariz. Mantén durante tres segundos. Exhala lentamente por la boca. Tu sistema nervioso se calma naturalmente.",
        "Nota cinco cosas que puedes ver, cuatro cosas que puedes tocar, tres cosas que puedes oír, dos cosas que puedes oler, y una cosa que puedes saborear. Estás conectado a tierra. Estás aquí. Estás bien.",
        "Inhala paz y seguridad. Exhala miedo y preocupación. Tu ansiedad es temporal, pero tu fortaleza es duradera. Has superado momentos difíciles antes, y lo harás de nuevo."
      ],
      fr: [
        "Vous êtes en sécurité en ce moment. Placez vos pieds fermement sur le sol. Respirez lentement par le nez. Retenez pendant trois secondes. Expirez lentement par la bouche. Votre système nerveux se calme naturellement.",
        "Remarquez cinq choses que vous pouvez voir, quatre choses que vous pouvez toucher, trois choses que vous pouvez entendre, deux choses que vous pouvez sentir, et une chose que vous pouvez goûter. Vous êtes ancré. Vous êtes ici. Vous allez bien.",
        "Inspirez la paix et la sécurité. Expirez la peur et l'inquiétude. Votre anxiété est temporaire, mais votre force est durable. Vous avez traversé des moments difficiles auparavant, et vous le ferez encore."
      ],
      pt: [
        "Você está seguro neste momento... Coloque os pés firmemente no chão... Respire lentamente pelo nariz... Segure por três segundos... Expire lentamente pela boca... Seu sistema nervoso está se acalmando naturalmente...",
        "Observe cinco coisas que você pode ver... quatro coisas que pode tocar... três coisas que pode ouvir... duas coisas que pode cheirar... e uma coisa que pode provar... Você está conectado... Você está aqui... Você está bem...",
        "Inspire paz e segurança... Expire medo e preocupação... Sua ansiedade é temporária... mas sua força é duradoura... Você já passou por momentos difíceis antes... e passará novamente..."
      ],
      ru: [
        "Вы в безопасности в этот момент... Поставьте ноги твердо на землю... Медленно вдохните через нос... Задержите на три секунды... Медленно выдохните через рот... Ваша нервная система естественно успокаивается...",
        "Заметьте пять вещей, которые вы можете видеть... четыре вещи, которые можете потрогать... три вещи, которые можете услышать... два запаха... и одну вещь, которую можете попробовать... Вы заземлены... Вы здесь... С вами все в порядке...",
        "Вдохните мир и безопасность... Выдохните страх и беспокойство... Ваша тревога временна... но ваша сила долговечна... Вы переживали трудные времена раньше... и переживете снова..."
      ],
      ja: [
        "あなたはこの瞬間に安全です... 足をしっかりと地面に置いてください... 鼻からゆっくりと息を吸ってください... 三秒間止めてください... 口からゆっくりと息を吐いてください... あなたの神経系は自然に落ち着いています...",
        "五つの見えるものに気づいてください... 四つの触れるものに... 三つの聞こえるものに... 二つの匂いに... そして一つの味わえるものに... あなたは安定しています... あなたはここにいます... あなたは大丈夫です...",
        "平和と安全を吸い込んでください... 恐れと心配を吐き出してください... あなたの不安は一時的です... しかしあなたの強さは持続的です... あなたは以前にも困難な時を乗り越えました... そしてまた乗り越えるでしょう..."
      ]
    },
    energy: {
      en: [
        "Take three deep, energizing breaths. Feel oxygen filling your lungs and awakening your body. Stretch your arms above your head. You are vibrant and alive. Energy flows through every cell of your being.",
        "Imagine golden sunlight entering your body with each breath. This light energizes your mind and revitalizes your spirit. You feel refreshed, motivated, and ready to embrace your day.",
        "Breathe in possibility and potential. Breathe out limitation and doubt. Feel your heart rate increase gently as positive energy awakens within you. You are ready for whatever comes your way."
      ],
      nl: [
        "Neem drie diepe, energiegevende ademhalingen. Voel zuurstof je longen vullen en je lichaam wakker maken. Strek je armen boven je hoofd. Je bent levendig en levend. Energie stroomt door elke cel van je wezen.",
        "Stel je voor dat gouden zonlicht je lichaam binnenkomt met elke ademhaling. Dit licht geeft je geest energie en revitaliseert je spirit. Je voelt je verfrist, gemotiveerd en klaar om je dag te omarmen.",
        "Adem mogelijkheid en potentieel in. Adem beperking en twijfel uit. Voel je hartslag zachtjes toenemen terwijl positieve energie in je ontwaakt. Je bent klaar voor wat er ook komt."
      ],
      de: [
        "Nimm drei tiefe, energetisierende Atemzüge. Spüre, wie Sauerstoff deine Lungen füllt und deinen Körper erweckt. Strecke deine Arme über deinen Kopf. Du bist lebendig und voller Leben. Energie fließt durch jede Zelle deines Wesens.",
        "Stelle dir vor, wie goldenes Sonnenlicht mit jedem Atemzug in deinen Körper eindringt. Dieses Licht energetisiert deinen Geist und revitalisiert deinen Spirit. Du fühlst dich erfrischt, motiviert und bereit, deinen Tag zu umarmen.",
        "Atme Möglichkeit und Potenzial ein. Atme Begrenzung und Zweifel aus. Spüre, wie dein Herzschlag sanft zunimmt, während positive Energie in dir erwacht. Du bist bereit für alles, was auf dich zukommt."
      ],
      es: [
        "Toma tres respiraciones profundas y energizantes. Siente el oxígeno llenando tus pulmones y despertando tu cuerpo. Estira tus brazos por encima de tu cabeza. Estás vibrante y vivo. La energía fluye a través de cada célula de tu ser.",
        "Imagina luz dorada del sol entrando en tu cuerpo con cada respiración. Esta luz energiza tu mente y revitaliza tu espíritu. Te sientes refrescado, motivado y listo para abrazar tu día.",
        "Inhala posibilidad y potencial. Exhala limitación y duda. Siente tu ritmo cardíaco aumentar suavemente mientras la energía positiva despierta dentro de ti. Estás listo para lo que venga."
      ],
      fr: [
        "Prenez trois respirations profondes et énergisantes. Sentez l'oxygène remplir vos poumons et éveiller votre corps. Étirez vos bras au-dessus de votre tête. Vous êtes vibrant et vivant. L'énergie coule à travers chaque cellule de votre être.",
        "Imaginez la lumière dorée du soleil entrant dans votre corps à chaque respiration. Cette lumière énergise votre esprit et revitalise votre âme. Vous vous sentez rafraîchi, motivé et prêt à embrasser votre journée.",
        "Inspirez la possibilité et le potentiel. Expirez la limitation et le doute. Sentez votre rythme cardiaque augmenter doucement alors que l'énergie positive s'éveille en vous. Vous êtes prêt pour tout ce qui vous attend."
      ],
      zh: [
        "做三次深呼吸... 感受氧气充满你的肺部... 唤醒你的身体... 将你的双臂伸向头顶... 你充满活力和生命力... 能量流淌过你存在的每个细胞...",
        "想象金色的阳光... 随着每次呼吸进入你的身体... 这光芒为你的心灵注入活力... 让你的精神重新焕发... 你感到清新... 充满动力... 准备好拥抱你的一天...",
        "吸入可能性和潜力... 呼出限制和疑虑... 感受你的心率轻柔地增加... 正向能量在你内心苏醒... 你准备好迎接一切到来..."
      ],
      hi: [
        "तीन गहरी... ऊर्जावान सांसें लें... अपने फेफड़ों को ऑक्सीजन से भरता हुआ महसूस करें... अपने शरीर को जागता हुआ महसूस करें... अपनी बाहों को सिर के ऊपर फैलाएं... आप जीवंत और जीवित हैं... ऊर्जा आपके अस्तित्व के हर कोशिका से बहती है...",
        "कल्पना करें कि सुनहरी धूप... हर सांस के साथ आपके शरीर में प्रवेश करती है... यह प्रकाश आपके मन को ऊर्जा देता है... और आपकी आत्मा को पुनर्जीवित करता है... आप ताज़गी... प्रेरणा... और अपने दिन को अपनाने के लिए तैयार महसूस करते हैं...",
        "संभावना और क्षमता को अंदर लें... सीमा और संदेह को बाहर निकालें... अपने दिल की धड़कन को धीरे से बढ़ता हुआ महसूस करें... जबकि सकारात्मक ऊर्जा आपमें जागती है... आप जो कुछ भी आए उसके लिए तैयार हैं..."
      ],
      ar: [
        "خذ ثلاثة أنفاس عميقة... ومنشطة... اشعر بالأكسجين يملأ رئتيك... ويوقظ جسدك... مد ذراعيك فوق رأسك... أنت نابض بالحيوية والحياة... الطاقة تتدفق خلال كل خلية من كيانك...",
        "تخيل ضوء الشمس الذهبي... يدخل جسدك مع كل نفس... هذا الضوء يمنح عقلك الطاقة... ويجدد روحك... تشعر بالانتعاش... والحافز... والاستعداد لاحتضان يومك...",
        "استنشق الإمكانية والإمكانات... أزفر القيود والشكوك... اشعر بنبضات قلبك تزداد برفق... بينما تستيقظ الطاقة الإيجابية داخلك... أنت مستعد لكل ما هو آت..."
      ],
      pt: [
        "Faça três respirações profundas... e energizantes... Sinta o oxigênio preenchendo seus pulmões... e despertando seu corpo... Estique seus braços acima da cabeça... Você está vibrante e vivo... A energia flui através de cada célula do seu ser...",
        "Imagine a luz dourada do sol... entrando em seu corpo a cada respiração... Esta luz energiza sua mente... e revitaliza seu espírito... Você se sente renovado... motivado... e pronto para abraçar seu dia...",
        "Respire possibilidade e potencial... Expire limitação e dúvida... Sinta sua frequência cardíaca aumentar suavemente... enquanto a energia positiva desperta dentro de você... Você está pronto para tudo que vier..."
      ],
      ru: [
        "Сделайте три глубоких... энергизирующих вдоха... Почувствуйте кислород... заполняющий ваши легкие... и пробуждающий ваше тело... Поднимите руки над головой... Вы полны жизненной силы... Энергия течет через каждую клетку вашего существа...",
        "Представьте золотой солнечный свет... входящий в ваше тело с каждым вдохом... Этот свет наполняет энергией ваш разум... и оживляет ваш дух... Вы чувствуете себя обновленным... мотивированным... и готовым встретить свой день...",
        "Вдохните возможность и потенциал... Выдохните ограничение и сомнение... Почувствуйте, как ваше сердцебиение мягко учащается... пока позитивная энергия пробуждается внутри вас... Вы готовы к тому, что вас ждет..."
      ],
      ja: [
        "三回の深く... エネルギッシュな呼吸をしてください... 酸素があなたの肺を満たし... 体を目覚めさせるのを感じてください... 腕を頭上に伸ばしてください... あなたは生き生きと活気に満ちています... エネルギーがあなたの存在の全ての細胞を流れています...",
        "黄金の太陽光が... 各呼吸とともにあなたの体に入ることを想像してください... この光があなたの心にエネルギーを与え... 精神を活性化させます... あなたは新鮮で... やる気に満ち... 一日を迎える準備ができています...",
        "可能性と潜在能力を吸い込んでください... 制限と疑いを吐き出してください... 正のエネルギーがあなたの中で目覚める間... 心拍数が優しく上昇するのを感じてください... あなたは何が来ても準備できています..."
      ]
    }
  };

  const typeTemplates = templates[type] || templates.sleep;
  const languageTemplates = typeTemplates[language] || typeTemplates.en;
  const randomIndex = Math.floor(Math.random() * languageTemplates.length);
  
  let baseText = languageTemplates[randomIndex];
  
  // Extend text based on duration
  if (duration > 5) {
    const extensions = {
      sleep: {
        en: " Continue to breathe deeply and allow your body to sink deeper into relaxation. Each breath brings you closer to peaceful sleep.",
        nl: " Blijf diep ademen en laat je lichaam dieper wegzinken in ontspanning. Elke ademhaling brengt je dichter bij vreedzame slaap.",
        de: " Atme weiter tief und erlaube deinem Körper, tiefer in die Entspannung zu sinken. Jeder Atemzug bringt dich näher zum friedlichen Schlaf.",
        es: " Continúa respirando profundamente y permite que tu cuerpo se hunda más profundamente en la relajación. Cada respiración te acerca al sueño pacífico.",
        fr: " Continuez à respirer profondément et permettez à votre corps de s'enfoncer plus profondément dans la relaxation. Chaque respiration vous rapproche du sommeil paisible.",
        pt: " Continue respirando profundamente... e permita que seu corpo afunde mais profundamente no relaxamento... Cada respiração te leva mais perto do sono pacífico...",
        ru: " Продолжайте дышать глубоко... и позвольте телу погрузиться глубже в расслабление... Каждый вдох приближает вас к мирному сну...",
        ja: " 深く呼吸を続けて... 体をさらに深いリラクゼーションに沈めてください... 各呼吸があなたを平和な眠りに近づけます..."
      },
      stress: {
        en: " Continue this breathing pattern. With each cycle, feel more tension leaving your body. You are becoming calmer and more centered.",
        nl: " Ga door met dit ademhalingspatroon. Met elke cyclus voel je meer spanning je lichaam verlaten. Je wordt rustiger en meer gecentreerd.",
        de: " Setze dieses Atemmuster fort. Mit jedem Zyklus spürst du, wie mehr Anspannung deinen Körper verlässt. Du wirst ruhiger und zentrierter.",
        es: " Continúa con este patrón de respiración. Con cada ciclo, siente más tensión abandonando tu cuerpo. Te estás volviendo más tranquilo y centrado.",
        fr: " Continuez ce schéma respiratoire. À chaque cycle, sentez plus de tension quitter votre corps. Vous devenez plus calme et plus centré.",
        pt: " Continue com este padrão de respiração... A cada ciclo... sinta mais tensão deixando seu corpo... Você está se tornando mais calmo... e mais centrado...",
        ru: " Продолжайте этот дыхательный паттерн... С каждым циклом... чувствуйте больше напряжения, покидающего ваше тело... Вы становитесь спокойнее... и более центрированным...",
        ja: " この呼吸パターンを続けてください... 各サイクルで... より多くの緊張が体から離れるのを感じてください... あなたはより穏やかで... より集中した状態になっています..."
      },
      focus: {
        en: " Continue to return to your breath whenever your mind wanders. This is how you build concentration. Each return makes you stronger.",
        nl: " Blijf terugkeren naar je ademhaling wanneer je geest afdwaalt. Dit is hoe je concentratie opbouwt. Elke terugkeer maakt je sterker.",
        de: " Kehre weiter zu deinem Atem zurück, wann immer deine Gedanken abschweifen. So baust du Konzentration auf. Jede Rückkehr macht dich stärker.",
        es: " Continúa regresando a tu respiración siempre que tu mente divague. Así es como construyes concentración. Cada regreso te hace más fuerte.",
        fr: " Continuez à revenir à votre respiration chaque fois que votre esprit divague. C'est ainsi que vous construisez la concentration. Chaque retour vous rend plus fort.",
        pt: " Continue retornando à sua respiração... sempre que sua mente divagar... É assim que você constrói concentração... Cada retorno te torna mais forte...",
        ru: " Продолжайте возвращаться к дыханию... когда ваш разум блуждает... Так вы строите концентрацию... Каждое возвращение делает вас сильнее...",
        ja: " 心がさまよう度に... 呼吸に戻り続けてください... これが集中力を構築する方法です... 各帰還があなたを強くします..."
      },
      anxiety: {
        en: " Continue to breathe slowly and deeply. Remember that you are safe and this feeling will pass. You have everything you need within you.",
        nl: " Blijf langzaam en diep ademen. Onthoud dat je veilig bent en dit gevoel zal voorbijgaan. Je hebt alles wat je nodig hebt in jezelf.",
        de: " Atme weiter langsam und tief. Denke daran, dass du sicher bist und dieses Gefühl vergehen wird. Du hast alles, was du brauchst, in dir.",
        es: " Continúa respirando lenta y profundamente. Recuerda que estás seguro y este sentimiento pasará. Tienes todo lo que necesitas dentro de ti.",
        fr: " Continuez à respirer lentement et profondément. Rappelez-vous que vous êtes en sécurité et ce sentiment passera. Vous avez tout ce dont vous avez besoin en vous.",
        pt: " Continue respirando lenta e profundamente... Lembre-se de que você está seguro... e este sentimento passará... Você tem tudo o que precisa dentro de si...",
        ru: " Продолжайте дышать медленно и глубоко... Помните, что вы в безопасности... и это чувство пройдет... У вас есть все, что нужно, внутри вас...",
        ja: " ゆっくりと深く呼吸を続けてください... あなたは安全であることを思い出してください... この感情は過ぎ去るでしょう... 必要なものはすべてあなたの中にあります..."
      },
      energy: {
        en: " Feel this energy building within you. With each breath, you become more alive and vibrant. You are ready to take on the day.",
        nl: " Voel deze energie opbouwen in jezelf. Met elke ademhaling word je meer levend en levendig. Je bent klaar om de dag aan te gaan.",
        de: " Spüre diese Energie in dir aufbauen. Mit jedem Atemzug wirst du lebendiger und vibrierender. Du bist bereit, den Tag anzugehen.",
        es: " Siente esta energía construyéndose dentro de ti. Con cada respiración, te vuelves más vivo y vibrante. Estás listo para enfrentar el día.",
        fr: " Sentez cette énergie se construire en vous. À chaque respiration, vous devenez plus vivant et vibrant. Vous êtes prêt à affronter la journée.",
        pt: " Sinta essa energia se construindo dentro de você... A cada respiração... você se torna mais vivo e vibrante... Você está pronto para enfrentar o dia...",
        ru: " Почувствуйте эту энергию, растущую внутри вас... С каждым вдохом... вы становитесь более живым и вибрирующим... Вы готовы встретить день...",
        ja: " この エネルギーがあなたの中で構築されているのを感じてください... 各呼吸で... あなたはより生きて... 活力に満ちてきます... あなたは一日を迎える準備ができています..."
      }
    };
    
    const extension = extensions[type]?.[language] || extensions[type]?.en || "";
    baseText += extension;
  }
  
  if (duration > 10) {
    const longExtensions = {
      sleep: {
        en: " Let your mind become quiet and still. You are drifting into deep, restorative sleep that will refresh your body and mind.",
        nl: " Laat je geest rustig en stil worden. Je drijft weg naar diepe, herstellende slaap die je lichaam en geest zal verfrissen.",
        de: " Lass deinen Geist ruhig und still werden. Du gleitest in tiefen, erholsamen Schlaf, der deinen Körper und Geist erfrischen wird.",
        es: " Deja que tu mente se vuelva tranquila y quieta. Te estás deslizando hacia un sueño profundo y reparador que refrescará tu cuerpo y mente.",
        fr: " Laissez votre esprit devenir tranquille et silencieux. Vous glissez vers un sommeil profond et réparateur qui rafraîchira votre corps et votre esprit.",
        pt: " Deixe sua mente se tornar quieta e imóvel... Você está deslizando para um sono profundo... restaurador que renovará seu corpo e mente...",
        ru: " Пусть ваш разум станет тихим и неподвижным... Вы погружаетесь в глубокий... восстанавливающий сон, который освежит ваше тело и разум...",
        ja: " 心を静かで穏やかにしてください... あなたは深い... 回復の眠りに滑り込んでいます... それはあなたの体と心をリフレッシュします..."
      },
      stress: {
        en: " You are in complete control. This stress is temporary, but your inner strength is permanent. Trust in your ability to handle whatever comes.",
        nl: " Je hebt volledige controle. Deze stress is tijdelijk, maar je innerlijke kracht is permanent. Vertrouw op je vermogen om aan te kunnen wat er ook komt.",
        de: " Du hast die volle Kontrolle. Dieser Stress ist vorübergehend, aber deine innere Stärke ist permanent. Vertraue auf deine Fähigkeit, mit allem umzugehen, was kommt.",
        es: " Tienes el control completo. Este estrés es temporal, pero tu fortaleza interior es permanente. Confía en tu capacidad para manejar lo que venga.",
        fr: " Vous avez le contrôle total. Ce stress est temporaire, mais votre force intérieure est permanente. Faites confiance à votre capacité à gérer tout ce qui arrive.",
        pt: " Você está no controle completo... Este estresse é temporário... mas sua força interior é permanente... Confie em sua capacidade de lidar com o que vier...",
        ru: " Вы полностью контролируете ситуацию... Этот стресс временный... но ваша внутренняя сила постоянна... Доверьтесь своей способности справиться с тем, что придет...",
        ja: " あなたは完全にコントロールしています... このストレスは一時的です... しかしあなたの内なる強さは永続的です... 何が来ても対処できる自分の能力を信じてください..."
      },
      focus: {
        en: " Your mind is becoming clearer and more focused. This practice strengthens your concentration like exercise strengthens your body.",
        nl: " Je geest wordt helderder en meer gefocust. Deze oefening versterkt je concentratie zoals oefening je lichaam versterkt.",
        de: " Dein Geist wird klarer und fokussierter. Diese Praxis stärkt deine Konzentration wie Übung deinen Körper stärkt.",
        es: " Tu mente se está volviendo más clara y enfocada. Esta práctica fortalece tu concentración como el ejercicio fortalece tu cuerpo.",
        fr: " Votre esprit devient plus clair et plus concentré. Cette pratique renforce votre concentration comme l'exercice renforce votre corps.",
        pt: " Sua mente está se tornando mais clara... e mais focada... Esta prática fortalece sua concentração... como o exercício fortalece seu corpo...",
        ru: " Ваш разум становится яснее... и более сосредоточенным... Эта практика укрепляет концентрацию... как упражнения укрепляют тело...",
        ja: " あなたの心はより明確で... より集中したものになっています... この練習は集中力を強化します... 運動が体を強化するように..."
      },
      anxiety: {
        en: " You are stronger than your anxiety. You have survived difficult times before and you will again. You are resilient and capable.",
        nl: " Je bent sterker dan je angst. Je hebt eerder moeilijke tijden overleefd en je zult het weer doen. Je bent veerkrachtig en bekwaam.",
        de: " Du bist stärker als deine Angst. Du hast schon früher schwierige Zeiten überlebt und wirst es wieder tun. Du bist widerstandsfähig und fähig.",
        es: " Eres más fuerte que tu ansiedad. Has sobrevivido tiempos difíciles antes y lo harás de nuevo. Eres resistente y capaz.",
        fr: " Vous êtes plus fort que votre anxiété. Vous avez survécu à des moments difficiles auparavant et vous le ferez encore. Vous êtes résilient et capable.",
        pt: " Você é mais forte que sua ansiedade... Você sobreviveu a momentos difíceis antes... e sobreviverá novamente... Você é resiliente... e capaz...",
        ru: " Вы сильнее своей тревоги... Вы переживали трудные времена раньше... и переживете снова... Вы устойчивы... и способны...",
        ja: " あなたはあなたの不安よりも強いです... あなたは以前に困難な時を乗り越えました... そしてまた乗り越えるでしょう... あなたは回復力があり... 有能です..."
      },
      energy: {
        en: " This energy is yours to use. You have unlimited potential and the power to achieve your goals. Carry this vitality with you.",
        nl: " Deze energie is van jou om te gebruiken. Je hebt onbeperkt potentieel en de kracht om je doelen te bereiken. Draag deze vitaliteit met je mee.",
        de: " Diese Energie gehört dir. Du hast unbegrenztes Potenzial und die Kraft, deine Ziele zu erreichen. Trage diese Vitalität mit dir.",
        es: " Esta energía es tuya para usar. Tienes potencial ilimitado y el poder para lograr tus objetivos. Lleva esta vitalidad contigo.",
        fr: " Cette énergie vous appartient. Vous avez un potentiel illimité et le pouvoir d'atteindre vos objectifs. Portez cette vitalité avec vous.",
        pt: " Esta energia é sua para usar... Você tem potencial ilimitado... e o poder para alcançar seus objetivos... Carregue esta vitalidade consigo...",
        ru: " Эта энергия принадлежит вам... У вас есть неограниченный потенциал... и сила для достижения ваших целей... Несите эту жизненную силу с собой...",
        ja: " このエネルギーはあなたのものです... あなたには無限の可能性があります... そしてあなたの目標を達成する力があります... この活力を持ち続けてください..."
      }
    };
    
    const longExtension = longExtensions[type]?.[language] || longExtensions[type]?.en || "";
    baseText += longExtension;
  }
  
  return baseText;
};

router.post('/generate-text', async (req, res) => {
  const { type, duration, language } = req.body;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  // If no OpenAI key, use local generation
  if (!openaiApiKey) {
    const localText = generateLocalMeditationText(type, duration, language);
    return res.json({ text: localText });
  }

  try {
    const prompts = {
      en: {
        sleep: `You are an experienced meditation coach with more than 20 years of practical experience. Write a completely original sleep meditation script for ${duration} minutes. Use a warm, caring, and encouraging tone.

Speak slowly and carefully, like a professional meditation guide. Focus on deep relaxation, releasing tension, and inviting peaceful sleep.

Structure and style:

Use after each sentence exactly fifteen dots ("...............") to create longer, natural pauses and extended breathing space.

Use twenty dots ("....................") between larger sections for very extended deep reflection or transition.

Each sentence forms a separate moment in the meditation.

Example style:
"Welcome to this calming moment............... Breathe peacefully............... Hold for a moment............... And release slowly...................."

Additional instructions:

Use imaginative, soft and calming language that invites surrender and trust.

Feel free to add short affirmations that support sleep and relaxation.

Return only the meditation text, without explanation or introduction.

Ensure the script is completely original and feels personal.

IMPORTANT:
Deliver only the meditation text, strictly according to the above instructions.`,
        stress: `You are a master meditation coach specializing in stress relief. Create a fresh stress relief meditation script for ${duration} minutes. Guide with the wisdom of years of practice. Focus on proven breathing techniques, releasing tension, and finding inner calm. Use reassuring, professional language. IMPORTANT: Include mindful pauses using "..." (3 dots) between every breathing instruction. Add "......" (6 dots) after complete breathing cycles for integration. Example: "Let's begin with a cleansing breath... Inhale slowly for four counts... one... two... three... four... Hold gently... Now release for six counts......". Each instruction is a sacred moment. Generate completely new content each time. Only return the meditation text, no additional commentary.`,
        focus: `You are an experienced meditation teacher specializing in concentration practices. Generate an original focus meditation script for ${duration} minutes. Guide with clarity and precision. Emphasize concentration, mental clarity, and present-moment awareness. IMPORTANT: Add contemplative pauses using "..." (3 dots) between all instructions. Example: "Settle into your meditation posture... Bring your attention to your breath... Notice each inhale... and each exhale... When thoughts arise... simply notice... and return......". Allow space for practice between guidance. Create unique content each time. Only return the meditation text, no additional commentary.`,
        anxiety: `You are a compassionate meditation coach with expertise in anxiety relief. Create a new anxiety relief meditation script for ${duration} minutes. Speak with deep understanding and care. Focus on grounding techniques, safety, and nervous system regulation. IMPORTANT: Include soothing pauses using "..." (3 dots) between every reassurance. Add "......" (6 dots) for moments of deep safety. Example: "You are completely safe here... Let's take a gentle breath together... Feel your body supported... You are held... You are okay......". Each word should land softly. Generate completely original content each time. Only return the meditation text, no additional commentary.`,
        energy: `You are a dynamic meditation coach specializing in energy cultivation. Generate a fresh energizing meditation script for ${duration} minutes. Guide with enthusiasm tempered by mindfulness. Focus on awakening vitality and positive energy. IMPORTANT: Add purposeful pauses using "..." (3 dots) between instructions. Example: "Feel the energy of this new moment... Take a deep, revitalizing breath... Feel your body awakening... Energy flows through you......". Balance activation with presence. Create unique content each time. Only return the meditation text, no additional commentary.`
      },
      nl: {
        sleep: `Je bent een ervaren meditatiecoach met meer dan 20 jaar praktijkervaring. Schrijf een volledig origineel slaapmeditatie-script voor ${duration} minuten. Gebruik een warme, verzorgende en bemoedigende toon.

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
        stress: `Je bent een meester meditatie coach gespecialiseerd in stressverlichting. Creëer een nieuw script voor ${duration} minuten. Begeleid met wijsheid van jarenlange praktijk. Focus op bewezen ademtechnieken en innerlijke rust. BELANGRIJK: Voeg bedachtzame pauzes toe met "..." tussen elke ademhalingsinstructie. Voeg "......" toe na complete cycli. Voorbeeld: "Laten we beginnen met een reinigende adem... Adem langzaam in voor vier tellen... één... twee... drie... vier... Hou zachtjes vast... Laat nu los voor zes tellen......". Elke instructie is heilig. Genereer volledig nieuwe inhoud.`,
        focus: `Je bent een ervaren meditatie leraar gespecialiseerd in concentratie. Genereer een origineel focus script voor ${duration} minuten. Begeleid met helderheid en precisie. BELANGRIJK: Voeg contemplatieve pauzes toe met "..." tussen alle instructies. Voorbeeld: "Neem je meditatie houding aan... Breng je aandacht naar je adem... Merk elke inademing op... en elke uitademing... Wanneer gedachten opkomen... merk ze simpelweg op... en keer terug......". Geef ruimte voor oefening. Creëer unieke inhoud.`,
        anxiety: `Je bent een meelevende meditatie coach met expertise in angstverlichting. Creëer een nieuw script voor ${duration} minuten. Spreek met diep begrip en zorg. Focus op aarding en veiligheid. BELANGRIJK: Voeg sussende pauzes toe met "..." tussen elke geruststelling. Voeg "......" toe voor momenten van diepe veiligheid. Voorbeeld: "Je bent volledig veilig hier... Laten we samen een zachte adem nemen... Voel je lichaam ondersteund... Je wordt vastgehouden... Het is goed......". Elk woord landt zacht. Genereer originele inhoud.`,
        energy: `Je bent een dynamische meditatie coach gespecialiseerd in energie cultivatie. Genereer een nieuw energiek script voor ${duration} minuten. Begeleid met enthousiasme getemperd door mindfulness. BELANGRIJK: Voeg doelgerichte pauzes toe met "..." tussen instructies. Voorbeeld: "Voel de energie van dit nieuwe moment... Neem een diepe, revitaliserende adem... Voel je lichaam ontwaken... Energie stroomt door je heen......". Balanceer activatie met aanwezigheid. Creëer unieke inhoud.`
      },
      de: {
        sleep: `Du bist ein erfahrener Meditationscoach mit mehr als 20 Jahren Praxiserfahrung. Schreibe ein vollständig originelles Schlafmeditations-Skript für ${duration} Minuten. Verwende einen warmen, fürsorglichen und ermutigenden Ton.

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
        stress: `Erstelle ein neues Stressabbau-Meditationsskript für ${duration} Minuten. Fokussiere auf Atemtechniken, Anspannung loslassen und innere Ruhe finden. Verwende beruhigende Sprache und praktische Stressreduktionstechniken. Generiere jedes Mal vollständig neue Inhalte. Gib nur den Meditationstext zurück, keine zusätzlichen Kommentare.`,
        focus: `Erstelle ein originelles Fokus-Meditationsskript für ${duration} Minuten. Betone Konzentration, mentale Klarheit und Gegenwartsbewusstsein. Inklusive Atemwahrnehmung und Aufmerksamkeitstraining. Erstelle jedes Mal einzigartige Inhalte. Gib nur den Meditationstext zurück, keine zusätzlichen Kommentare.`,
        anxiety: `Erstelle ein neues Angstlinderung-Meditationsskript für ${duration} Minuten. Fokussiere auf Erdungstechniken, Sicherheit und die Beruhigung des Nervensystems. Verwende sanfte, beruhigende Sprache. Generiere jedes Mal vollständig originelle Inhalte. Gib nur den Meditationstext zurück, keine zusätzlichen Kommentare.`,
        energy: `Erstelle ein neues energetisierendes Meditationsskript für ${duration} Minuten. Fokussiere auf Vitalität, Motivation und positive Energie. Verwende aufbauende Sprache und Visualisierungstechniken. Erstelle jedes Mal einzigartige Inhalte. Gib nur den Meditationstext zurück, keine zusätzlichen Kommentare.`
      },
      es: {
        sleep: `Eres un coach de meditación experimentado con más de 20 años de experiencia práctica. Escribe un guión de meditación para dormir completamente original para ${duration} minutos. Usa un tono cálido, cuidadoso y alentador.

Habla lenta y cuidadosamente, como una guía de meditación profesional. Enfócate en la relajación profunda, soltar tensiones y invitar a un sueño pacífico.

Estructura y estilo:

Usa después de cada oración exactamente quince puntos ("...............") para crear pausas más largas y espacio de respiración extendido.

Usa veinte puntos ("....................") entre secciones más grandes para reflexión profunda muy extendida o transición.

Cada oración forma un momento separado en la meditación.

Estilo de ejemplo:
"Bienvenido a este momento relajante............... Respira tranquilamente............... Mantén un momento............... Y suelta lentamente...................."

Instrucciones adicionales:

Usa lenguaje imaginativo, suave y calmante que invite a la entrega y la confianza.

Añade libremente afirmaciones cortas que apoyen el sueño y la relajación.

Devuelve solo el texto de meditación, sin explicación o introducción.

Asegúrate de que el guión sea completamente original y se sienta personal.

IMPORTANTE:
Entrega solo el texto de meditación, estrictamente según las instrucciones anteriores.`,
        stress: `Crea un nuevo guión de meditación para aliviar el estrés para ${duration} minutos. Enfócate en técnicas de respiración, liberar tensión y encontrar calma interior. Usa lenguaje tranquilizador y técnicas prácticas de reducción del estrés. Genera contenido completamente nuevo cada vez. Solo devuelve el texto de meditación, sin comentarios adicionales.`,
        focus: `Genera un guión de meditación de concentración original para ${duration} minutos. Enfatiza la concentración, claridad mental y conciencia del momento presente. Incluye conciencia de la respiración y entrenamiento de atención. Crea contenido único cada vez. Solo devuelve el texto de meditación, sin comentarios adicionales.`,
        anxiety: `Crea un nuevo guión de meditación para aliviar la ansiedad para ${duration} minutos. Enfócate en técnicas de conexión a tierra, seguridad y calmar el sistema nervioso. Usa lenguaje suave y tranquilizador. Genera contenido completamente original cada vez. Solo devuelve el texto de meditación, sin comentarios adicionales.`,
        energy: `Genera un nuevo guión de meditación energizante para ${duration} minutos. Enfócate en vitalidad, motivación y energía positiva. Usa lenguaje edificante y técnicas de visualización. Crea contenido único cada vez. Solo devuelve el texto de meditación, sin comentarios adicionales.`
      },
      fr: {
        sleep: `Vous êtes un coach de méditation expérimenté avec plus de 20 ans d'expérience pratique. Écrivez un script de méditation du sommeil complètement original pour ${duration} minutes. Utilisez un ton chaleureux, bienveillant et encourageant.

Parlez lentement et soigneusement, comme un guide de méditation professionnel. Concentrez-vous sur la relaxation profonde, le relâchement des tensions et l'invitation à un sommeil paisible.

Structure et style:

Utilisez après chaque phrase exactement quinze points ("...............") pour créer des pauses plus longues et un espace de respiration étendu.

Utilisez vingt points ("....................") entre les sections plus importantes pour une réflexion profonde très étendue ou une transition.

Chaque phrase forme un moment séparé dans la méditation.

Style d'exemple:
"Bienvenue dans ce moment apaisant............... Respirez calmement............... Retenez un instant............... Et relâchez lentement...................."

Instructions supplémentaires:

Utilisez un langage imagé, doux et apaisant qui invite à l'abandon et à la confiance.

Ajoutez librement de courtes affirmations qui soutiennent le sommeil et la relaxation.

Retournez seulement le texte de méditation, sans explication ou introduction.

Assurez-vous que le script soit complètement original et personnel.

IMPORTANT:
Livrez seulement le texte de méditation, strictement selon les instructions ci-dessus.`,
        stress: `Créez un nouveau script de méditation anti-stress pour ${duration} minutes. Concentrez-vous sur les techniques de respiration, libérer la tension et trouver le calme intérieur. Utilisez un langage rassurant et des techniques pratiques de réduction du stress. Générez un contenu complètement nouveau à chaque fois. Retournez seulement le texte de méditation, sans commentaires supplémentaires.`,
        focus: `Générez un script de méditation de concentration original pour ${duration} minutes. Mettez l'accent sur la concentration, la clarté mentale et la conscience du moment présent. Incluez la conscience de la respiration et l'entraînement de l'attention. Créez un contenu unique à chaque fois. Retournez seulement le texte de méditation, sans commentaires supplémentaires.`,
        anxiety: `Créez un nouveau script de méditation anti-anxiété pour ${duration} minutes. Concentrez-vous sur les techniques d'ancrage, la sécurité et apaiser le système nerveux. Utilisez un langage doux et rassurant. Générez un contenu complètement original à chaque fois. Retournez seulement le texte de méditation, sans commentaires supplémentaires.`,
        energy: `Générez un nouveau script de méditation énergisante pour ${duration} minutes. Concentrez-vous sur la vitalité, la motivation et l'énergie positive. Utilisez un langage édifiant et des techniques de visualisation. Créez un contenu unique à chaque fois. Retournez seulement le texte de méditation, sans commentaires supplémentaires.`
      },
      zh: {
        sleep: `您是一位拥有20多年实践经验的专业冥想教练。编写一个完全原创的睡眠冥想脚本，时长${duration}分钟。使用温暖、关爱和鼓励的语调。

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
        stress: `您是一位专精于压力缓解的冥想大师。为${duration}分钟创建一个全新的压力缓解冥想脚本。以多年实践的智慧进行引导。专注于经过验证的呼吸技巧和内心平静。重要：在每个呼吸指导之间添加"..."。在完整循环后添加"......"。例如："让我们开始一个清洁的呼吸... 慢慢吸气四拍... 一... 二... 三... 四... 温柔地保持... 现在释放六拍......"。每个指导都是神圣的时刻。生成完全新的内容。`,
        focus: `您是一位专精于专注练习的经验冥想老师。为${duration}分钟生成一个原创的专注冥想脚本。以清晰和精准进行引导。重要：在所有指导之间添加"..."。例如："调整您的冥想姿势... 将注意力带到您的呼吸上... 注意每次吸气... 和每次呼气... 当思想出现时... 简单地注意... 然后返回......"。为练习留出空间。创建独特内容。`,
        anxiety: `您是一位专精于焦虑缓解的慈悲冥想教练。为${duration}分钟创建一个新的焦虑缓解冥想脚本。以深度理解和关爱说话。专注于扎根技巧和安全感。重要：在每个安慰之间添加"..."。为深度安全的时刻添加"......"。例如："您在这里完全安全... 让我们一起轻柔地呼吸... 感受您的身体被支持... 您被拥抱着... 一切都好......"。每个词都轻柔地落下。生成原创内容。`,
        energy: `您是一位专精于能量培养的动态冥想教练。为${duration}分钟生成一个新的能量冥想脚本。以正念调节的热情进行引导。重要：在指导之间添加"..."。例如："感受这个新时刻的能量... 深深地振奋呼吸... 感受您的身体觉醒... 能量流淌过您......"。平衡激活与存在。创建独特内容。`
      },
      hi: {
        sleep: `आप 20 से अधिक वर्षों के व्यावहारिक अनुभव के साथ एक अनुभवी मेडिटेशन कोच हैं। ${duration} मिनट के लिए एक पूर्णतः मौलिक नींद मेडिटेशन स्क्रिप्ट लिखें। गर्मजोशी भरे, देखभाल करने वाले और प्रोत्साहनजनक स्वर का उपयोग करें।

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
        stress: `आप तनाव राहत में विशेषज्ञता रखने वाले एक मास्टर मेडिटेशन कोच हैं। ${duration} मिनट के लिए एक नई तनाव राहत मेडिटेशन स्क्रिप्ट बनाएं। वर्षों के अभ्यास की बुद्धि के साथ मार्गदर्शन करें। महत्वपूर्ण: हर सांस निर्देश के बीच "..." जोड़ें। पूर्ण चक्रों के बाद "......" जोड़ें। उदाहरण: "आइए एक शुद्ध सांस से शुरू करें... चार गिनती के लिए धीरे से सांस लें... एक... दो... तीन... चार... धीरे से रोकें... अब छह गिनती के लिए छोड़ें......"। हर निर्देश पवित्र क्षण है। पूरी तरह से नई सामग्री बनाएं।`,
        focus: `आप एकाग्रता प्रथाओं में विशेषज्ञता रखने वाले अनुभवी मेडिटेशन शिक्षक हैं। ${duration} मिनट के लिए एक मूल फोकस मेडिटेशन स्क्रिप्ट बनाएं। स्पष्टता और सटीकता के साथ मार्गदर्शन करें। महत्वपूर्ण: सभी निर्देशों के बीच "..." जोड़ें। उदाहरण: "अपनी मेडिटेशन मुद्रा में बैठें... अपना ध्यान अपनी सांस पर लाएं... हर सांस लेने को नोटिस करें... और हर सांस छोड़ने को... जब विचार आएं... बस नोटिस करें... और वापस लौटें......"। अभ्यास के लिए जगह दें। अनूठी सामग्री बनाएं।`,
        anxiety: `आप चिंता राहत में विशेषज्ञता रखने वाले करुणामय मेडिटेशन कोच हैं। ${duration} मिनट के लिए एक नई चिंता राहत मेडिटेशन स्क्रिप्ट बनाएं। गहरी समझ और देखभाल के साथ बोलें। महत्वपूर्ण: हर आश्वासन के बीच "..." जोड़ें। गहरी सुरक्षा के क्षणों के लिए "......" जोड़ें। उदाहरण: "आप यहाँ पूरी तरह से सुरक्षित हैं... आइए साथ में एक कोमल सांस लें... अपने शरीर को सहारा मिला हुआ महसूस करें... आपको पकड़ा गया है... सब कुछ ठीक है......"। हर शब्द धीरे से उतरे। मूल सामग्री बनाएं।`,
        energy: `आप ऊर्जा विकास में विशेषज्ञता रखने वाले गतिशील मेडिटेशन कोच हैं। ${duration} मिनट के लिए एक नई ऊर्जावान मेडिटेशन स्क्रिप्ट बनाएं। मन की शांति के साथ समायोजित उत्साह के साथ मार्गदर्शन करें। महत्वपूर्ण: निर्देशों के बीच "..." जोड़ें। उदाहरण: "इस नए क्षण की ऊर्जा को महसूस करें... एक गहरी, पुनर्जीवित सांस लें... अपने शरीर को जागते हुए महसूस करें... ऊर्जा आपके माध्यम से बहती है......"। सक्रियता और उपस्थिति को संतुलित करें। अनूठी सामग्री बनाएं।`
      },
      ar: {
        sleep: `أنت مدرب تأمل خبير بأكثر من 20 سنة من الخبرة العملية. اكتب نصاً أصلياً تماماً لتأمل النوم لمدة ${duration} دقائق. استخدم نبرة دافئة ومهتمة ومشجعة.

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
        stress: `أنت مدرب تأمل ماهر متخصص في تخفيف التوتر. أنشئ نصاً جديداً لتأمل تخفيف التوتر لمدة ${duration} دقائق. قم بالإرشاد بحكمة سنوات من الممارسة. ركز على تقنيات التنفس المثبتة والهدوء الداخلي. مهم: أضف توقفات مدروسة "..." بين كل تعليمة تنفس. أضف "......" بعد الدورات الكاملة. مثال: "لنبدأ بنفس منقٍ... تنفس ببطء لأربع عدات... واحد... اثنان... ثلاثة... أربعة... احتفظ برفق... الآن أطلق لست عدات......"، كل تعليمة لحظة مقدسة. أنشئ محتوى جديداً تماماً.`,
        focus: `أنت مدرس تأمل متمرس متخصص في ممارسات التركيز. أنشئ نصاً أصلياً لتأمل التركيز لمدة ${duration} دقائق. قم بالإرشاد بوضوح ودقة. مهم: أضف توقفات تأملية "..." بين جميع التعليمات. مثال: "اتخذ وضعية التأمل... وجه انتباهك إلى تنفسك... لاحظ كل شهيق... وكل زفير... عندما تظهر الأفكار... لاحظها ببساطة... وعد......"، امنح مساحة للممارسة. أنشئ محتوى فريداً.`,
        anxiety: `أنت مدرب تأمل رحيم متخصص في تخفيف القلق. أنشئ نصاً جديداً لتأمل تخفيف القلق لمدة ${duration} دقائق. تحدث بفهم عميق ورعاية. ركز على تقنيات التأريض والأمان. مهم: أضف توقفات مهدئة "..." بين كل طمأنة. أضف "......" للحظات الأمان العميق. مثال: "أنت آمن تماماً هنا... دعنا نأخذ نفساً لطيفاً معاً... اشعر بجسدك مدعوماً... أنت محمي... كل شيء على ما يرام......"، كل كلمة تهبط برفق. أنشئ محتوى أصلياً.`,
        energy: `أنت مدرب تأمل ديناميكي متخصص في زراعة الطاقة. أنشئ نصاً جديداً لتأمل الطاقة لمدة ${duration} دقائق. قم بالإرشاد بحماس معتدل بالذهن الحاضر. مهم: أضف توقفات هادفة "..." بين التعليمات. مثال: "اشعر بطاقة هذه اللحظة الجديدة... خذ نفساً عميقاً منشطاً... اشعر بجسدك يستيقظ... الطاقة تتدفق خلالك......"، وازن بين التفعيل والحضور. أنشئ محتوى فريداً.`
      },
      pt: {
        sleep: `Você é um coach de meditação experiente com mais de 20 anos de experiência prática. Escreva um script de meditação para dormir completamente original para ${duration} minutos. Use um tom caloroso, cuidadoso e encorajador.

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
        stress: `Você é um coach mestre de meditação especializado em alívio de estresse. Crie um novo script de meditação para alívio de estresse de ${duration} minutos. Guie com a sabedoria de anos de prática. Foque em técnicas de respiração comprovadas e calma interior. IMPORTANTE: Adicione pausas conscientes "..." entre cada instrução de respiração. Adicione "......" após ciclos completos. Exemplo: "Vamos começar com uma respiração purificante... Inspire lentamente por quatro contagens... um... dois... três... quatro... Segure suavemente... Agora libere por seis contagens......"，cada instrução é um momento sagrado. Gere conteúdo completamente novo.`,
        focus: `Você é um professor de meditação experiente especializado em práticas de concentração. Gere um script original de meditação de foco de ${duration} minutos. Guie com clareza e precisão. IMPORTANTE: Adicione pausas contemplativas "..." entre todas as instruções. Exemplo: "Assuma sua postura de meditação... Traga sua atenção para sua respiração... Note cada inspiração... e cada expiração... Quando pensamentos surgirem... simplesmente note... e retorne......"，dê espaço para a prática. Crie conteúdo único.`,
        anxiety: `Você é um coach de meditação compassivo especializado em alívio de ansiedade. Crie um novo script de meditação para alívio de ansiedade de ${duration} minutos. Fale com profunda compreensão e cuidado. Foque em técnicas de aterramento e segurança. IMPORTANTE: Adicione pausas calmantes "..." entre cada tranquilização. Adicione "......" para momentos de segurança profunda. Exemplo: "Você está completamente seguro aqui... Vamos fazer uma respiração suave juntos... Sinta seu corpo apoiado... Você está sendo segurado... Está tudo bem......"，cada palavra pousa suavemente. Gere conteúdo original.`,
        energy: `Você é um coach de meditação dinâmico especializado em cultivo de energia. Gere um novo script de meditação energizante de ${duration} minutos. Guie com entusiasmo temperado pela atenção plena. IMPORTANTE: Adicione pausas propositais "..." entre instruções. Exemplo: "Sinta a energia deste novo momento... Faça uma respiração profunda e revitalizante... Sinta seu corpo despertando... Energia flui através de você......"，equilibre ativação com presença. Crie conteúdo único.`
      },
      ru: {
        sleep: `Вы опытный коуч по медитации с более чем 20-летним практическим опытом. Напишите полностью оригинальный скрипт медитации для сна на ${duration} минут. Используйте теплый, заботливый и ободряющий тон.

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
        stress: `Вы мастер-коуч по медитации, специализирующийся на снятии стресса. Создайте новый скрипт медитации для снятия стресса на ${duration} минут. Направляйте с мудростью многолетней практики. Сосредоточьтесь на проверенных техниках дыхания и внутреннем спокойствии. ВАЖНО: Добавляйте осознанные паузы "..." между каждой инструкцией дыхания. Добавляйте "......" после полных циклов. Пример: "Давайте начнем с очищающего дыхания... Медленно вдохните на четыре счета... один... два... три... четыре... Мягко задержите... Теперь выдохните на шесть счетов......"，каждая инструкция - священный момент. Создайте полностью новый контент.`,
        focus: `Вы опытный учитель медитации, специализирующийся на практиках концентрации. Создайте оригинальный скрипт медитации фокуса на ${duration} минут. Направляйте с ясностью и точностью. ВАЖНО: Добавляйте созерцательные паузы "..." между всеми инструкциями. Пример: "Примите позу для медитации... Направьте внимание на дыхание... Заметьте каждый вдох... и каждый выдох... Когда возникают мысли... просто заметьте... и вернитесь......"，дайте пространство для практики. Создайте уникальный контент.`,
        anxiety: `Вы сострадательный коуч по медитации, специализирующийся на облегчении тревоги. Создайте новый скрипт медитации для облегчения тревоги на ${duration} минут. Говорите с глубоким пониманием и заботой. Сосредоточьтесь на техниках заземления и безопасности. ВАЖНО: Добавляйте успокаивающие паузы "..." между каждым успокоением. Добавляйте "......" для моментов глубокой безопасности. Пример: "Вы полностью в безопасности здесь... Давайте сделаем мягкий вдох вместе... Почувствуйте поддержку своего тела... Вас держат... Все в порядке......"，каждое слово мягко опускается. Создайте оригинальный контент.`,
        energy: `Вы динамичный коуч по медитации, специализирующийся на культивировании энергии. Создайте новый энергизирующий скрипт медитации на ${duration} минут. Направляйте с энтузиазмом, смягченным внимательностью. ВАЖНО: Добавляйте целенаправленные паузы "..." между инструкциями. Пример: "Почувствуйте энергию этого нового момента... Сделайте глубокий, оживляющий вдох... Почувствуйте пробуждение своего тела... Энергия течет через вас......"，сбалансируйте активацию с присутствием. Создайте уникальный контент.`
      },
      ja: {
        sleep: `あなたは20年以上の実践経験を持つ熟練した瞑想コーチです。${duration}分間の完全にオリジナルな睡眠瞑想スクリプトを書いてください。温かく、思いやりがあり、励ましの調子を使用してください。

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
        stress: `あなたはストレス軽減を専門とするマスター瞑想コーチです。${duration}分間の新しいストレス軽減瞑想スクリプトを作成してください。長年の実践の知恵で導いてください。証明された呼吸法と内なる平静に焦点を当ててください。重要：各呼吸指示の間に意識的な一時停止"..."を追加してください。完全なサイクルの後に"......"を追加してください。例："浄化の呼吸から始めましょう... 4つ数えながらゆっくり吸い込んでください... 一... 二... 三... 四... 優しく保持してください... 今、6つ数えて解放してください......"，各指示は神聖な瞬間です。完全に新しいコンテンツを生成してください。`,
        focus: `あなたは集中練習を専門とする経験豊富な瞑想教師です。${duration}分間のオリジナルなフォーカス瞑想スクリプトを作成してください。明確さと精度で導いてください。重要：すべての指示の間に瞑想的な一時停止"..."を追加してください。例："瞑想の姿勢を取ってください... 呼吸に注意を向けてください... 各吸気に気づいてください... そして各呼気に... 思考が生じたら... 単に気づいて... そして戻ってください......"，練習のためのスペースを与えてください。独特なコンテンツを作成してください。`,
        anxiety: `あなたは不安軽減を専門とする思いやりのある瞑想コーチです。${duration}分間の新しい不安軽減瞑想スクリプトを作成してください。深い理解とケアで話してください。グラウンディング技法と安全性に焦点を当ててください。重要：各安心の間に鎮静の一時停止"..."を追加してください。深い安全の瞬間のために"......"を追加してください。例："あなたはここで完全に安全です... 一緒に優しい呼吸をしましょう... 体が支えられているのを感じてください... あなたは抱かれています... すべて大丈夫です......"，各言葉は優しく着地します。オリジナルなコンテンツを生成してください。`,
        energy: `あなたはエネルギー培養を専門とするダイナミックな瞑想コーチです。${duration}分間の新しいエネルギッシュな瞑想スクリプトを作成してください。マインドフルネスで調整された熱意で導いてください。重要：指示の間に目的のある一時停止"..."を追加してください。例："この新しい瞬間のエネルギーを感じてください... 深く活性化する呼吸をしてください... 体が覚醒するのを感じてください... エネルギーがあなたを通って流れています......"，活性化と存在のバランスを取ってください。独特なコンテンツを作成してください。`
      },
      ko: {
        sleep: `당신은 20년 이상의 실무 경험을 가진 숙련된 명상 코치입니다. ${duration}분간의 완전히 독창적인 수면 명상 스크립트를 작성하세요. 따뜻하고 배려하며 격려하는 톤을 사용하세요.

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
        stress: `당신은 스트레스 완화를 전문으로 하는 마스터 명상 코치입니다. ${duration}분간의 새로운 스트레스 완화 명상 스크립트를 만드세요. 수년간의 실천 지혜로 인도하세요. 검증된 호흡 기법과 내면의 평온에 집중하세요. 중요: 각 호흡 지시 사이에 의식적인 일시정지 "..."를 추가하세요. 완전한 주기 후에 "......"를 추가하세요. 예: "정화하는 호흡부터 시작해봅시다... 4박자로 천천히 들이마시세요... 하나... 둘... 셋... 넷... 부드럽게 유지하세요... 이제 6박자로 내보내세요......"，각 지시는 신성한 순간입니다. 완전히 새로운 내용을 생성하세요.`,
        focus: `당신은 집중 연습을 전문으로 하는 경험 많은 명상 교사입니다. ${duration}분간의 독창적인 집중 명상 스크립트를 생성하세요. 명확성과 정확성으로 인도하세요. 중요: 모든 지시 사이에 명상적인 일시정지 "..."를 추가하세요. 예: "명상 자세를 취하세요... 호흡에 주의를 기울이세요... 각 들숨을 알아차리세요... 그리고 각 날숨을... 생각이 떠오르면... 단순히 알아차리고... 돌아가세요......"，연습을 위한 공간을 제공하세요. 독특한 내용을 만드세요.`,
        anxiety: `당신은 불안 완화를 전문으로 하는 자비로운 명상 코치입니다. ${duration}분간의 새로운 불안 완화 명상 스크립트를 만드세요. 깊은 이해와 돌봄으로 말하세요. 그라운딩 기법과 안전에 집중하세요. 중요: 각 안심 사이에 진정시키는 일시정지 "..."를 추가하세요. 깊은 안전의 순간을 위해 "......"를 추가하세요. 예: "당신은 여기서 완전히 안전합니다... 함께 부드러운 호흡을 해봅시다... 몸이 지지받고 있음을 느끼세요... 당신은 보호받고 있습니다... 모든 것이 괜찮습니다......"，각 단어는 부드럽게 착지합니다. 독창적인 내용을 생성하세요.`,
        energy: `당신은 에너지 배양을 전문으로 하는 역동적인 명상 코치입니다. ${duration}분간의 새로운 에너지 넘치는 명상 스크립트를 생성하세요. 마음챙김으로 조절된 열정으로 인도하세요. 중요: 지시 사이에 목적 있는 일시정지 "..."를 추가하세요. 예: "이 새로운 순간의 에너지를 느껴보세요... 깊고 활력을 주는 호흡을 하세요... 몸이 깨어나는 것을 느껴보세요... 에너지가 당신을 통해 흐르고 있습니다......"，활성화와 존재의 균형을 맞추세요. 독특한 내용을 만드세요.`
      },
      it: {
        sleep: `Sei un coach di meditazione esperto con più di 20 anni di esperienza pratica. Scrivi uno script di meditazione del sonno completamente originale per ${duration} minuti. Usa un tono caldo, premuroso e incoraggiante.

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
        stress: `Sei un coach di meditazione maestro specializzato nel sollievo dallo stress. Crea un nuovo script di meditazione per alleviare lo stress di ${duration} minuti. Guida con la saggezza di anni di pratica. Concentrati su tecniche di respirazione comprovate e calma interiore. IMPORTANTE: Aggiungi pause consapevoli "..." tra ogni istruzione di respirazione. Aggiungi "......" dopo cicli completi. Esempio: "Iniziamo con un respiro purificante... Inspira lentamente per quattro battiti... uno... due... tre... quattro... Trattieni dolcemente... Ora rilascia per sei battiti......"，ogni istruzione è un momento sacro. Genera contenuto completamente nuovo.`,
        focus: `Sei un insegnante di meditazione esperto specializzato nelle pratiche di concentrazione. Genera uno script originale di meditazione di concentrazione per ${duration} minuti. Guida con chiarezza e precisione. IMPORTANTE: Aggiungi pause contemplative "..." tra tutte le istruzioni. Esempio: "Assumi la tua postura di meditazione... Porta la tua attenzione al respiro... Nota ogni inspirazione... e ogni espirazione... Quando sorgono pensieri... semplicemente osserva... e ritorna......"，concedi spazio per la pratica. Crea contenuto unico.`,
        anxiety: `Sei un coach di meditazione compassionevole specializzato nel sollievo dall'ansia. Crea un nuovo script di meditazione per alleviare l'ansia di ${duration} minuti. Parla con profonda comprensione e cura. Concentrati su tecniche di radicamento e sicurezza. IMPORTANTE: Aggiungi pause calmanti "..." tra ogni rassicurazione. Aggiungi "......" per momenti di profonda sicurezza. Esempio: "Sei completamente al sicuro qui... Facciamo insieme un respiro gentile... Senti il tuo corpo sostenuto... Sei tenuto... Tutto va bene......"，ogni parola atterra dolcemente. Genera contenuto originale.`,
        energy: `Sei un coach di meditazione dinamico specializzato nella coltivazione dell'energia. Genera un nuovo script di meditazione energizzante per ${duration} minuti. Guida con entusiasmo temperato dalla consapevolezza. IMPORTANTE: Aggiungi pause intenzionali "..." tra le istruzioni. Esempio: "Senti l'energia di questo nuovo momento... Fai un respiro profondo e rivitalizzante... Senti il tuo corpo che si risveglia... L'energia fluisce attraverso di te......"，bilancia attivazione e presenza. Crea contenuto unico.`
      }
    };

    const prompt = prompts[language]?.[type] || prompts.en[type];

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a meditation expert who creates personalized, calming meditation scripts. Always respond only with the meditation text, no additional formatting or commentary.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.9
    }, {
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const generatedText = response.data.choices[0].message.content.trim();
    res.json({ text: generatedText });

  } catch (error) {
    console.error("Error generating meditation text:", error.message);
    
    // Fall back to local generation on any error (including rate limits)
    const localText = generateLocalMeditationText(type, duration, language);
    
    // Always return 200 status with fallback text - never forward API errors to frontend
    res.status(200).json({ text: localText });
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
