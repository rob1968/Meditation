import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './i18n';
import './styles/globals.css';
import MeditationForm from './components/MeditationForm';
import AudioPlayer from './components/AudioPlayer';
import Background from './components/ui/Background';
import { Select, FormField } from './components/ui';
import styles from './App.module.css';

const App = () => {
  const [text, setText] = useState("");
  const [meditationType, setMeditationType] = useState("sleep");
  const [duration, setDuration] = useState(5); // Duration in minutes
  const [background, setBackground] = useState("ocean");
  const [language, setLanguage] = useState("en");
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL");
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { t, i18n } = useTranslation();

  // Meditation templates with multiple variations for each type, duration, and language
  const meditationTemplates = {
    sleep: {
      short: {
        en: [
          "Close your eyes and breathe deeply. Feel your body sinking into the bed. With each exhale, release the tension from your day. Your mind is calm and peaceful. Let yourself drift into restful sleep.",
          "Settle into your pillow and take slow, gentle breaths. Feel the weight of the day melting away from your shoulders. Your breathing becomes slower and deeper. Allow sleep to embrace you like a warm blanket.",
          "Let your body become heavy and relaxed. As you breathe out, imagine floating on a peaceful cloud. Your thoughts are drifting away. You are safe, comfortable, and ready for deep, restorative sleep."
        ],
        nl: [
          "Sluit je ogen en adem diep in. Voel je lichaam wegzinken in het bed. Met elke uitademing laat je de spanning van de dag los. Je geest is kalm en vreedzaam. Laat jezelf wegdrijven naar rustgevende slaap.",
          "Nestel je in je kussen en neem langzame, zachte ademteugen. Voel het gewicht van de dag wegsmelten van je schouders. Je ademhaling wordt langzamer en dieper. Laat de slaap je omhelzen als een warme deken.",
          "Laat je lichaam zwaar en ontspannen worden. Terwijl je uitademt, stel je voor dat je drijft op een vredige wolk. Je gedachten drijven weg. Je bent veilig, comfortabel en klaar voor diepe, herstellende slaap."
        ],
        de: [
          "Schließe deine Augen und atme tief ein. Spüre, wie dein Körper ins Bett sinkt. Mit jedem Ausatmen lässt du die Anspannung des Tages los. Dein Geist ist ruhig und friedlich. Lass dich sanft in erholsamen Schlaf gleiten.",
          "Kuschle dich in dein Kissen und nimm langsame, sanfte Atemzüge. Spüre, wie das Gewicht des Tages von deinen Schultern schmilzt. Deine Atmung wird langsamer und tiefer. Lass den Schlaf dich wie eine warme Decke umhüllen.",
          "Lass deinen Körper schwer und entspannt werden. Während du ausatmest, stelle dir vor, auf einer friedlichen Wolke zu schweben. Deine Gedanken treiben davon. Du bist sicher, bequem und bereit für tiefen, erholsamen Schlaf."
        ],
        es: [
          "Cierra los ojos y respira profundamente. Siente tu cuerpo hundiéndose en la cama. Con cada exhalación, libera la tensión del día. Tu mente está tranquila y en paz. Déjate llevar hacia un sueño reparador.",
          "Acomódate en tu almohada y toma respiraciones lentas y suaves. Siente el peso del día derritiéndose de tus hombros. Tu respiración se vuelve más lenta y profunda. Permite que el sueño te abrace como una manta cálida.",
          "Deja que tu cuerpo se vuelva pesado y relajado. Al exhalar, imagina que flotas en una nube pacífica. Tus pensamientos se alejan. Estás seguro, cómodo y listo para un sueño profundo y reparador."
        ],
        fr: [
          "Fermez les yeux et respirez profondément. Sentez votre corps s'enfoncer dans le lit. À chaque expiration, relâchez la tension de la journée. Votre esprit est calme et paisible. Laissez-vous dériver vers un sommeil réparateur.",
          "Installez-vous confortablement dans votre oreiller et prenez des respirations lentes et douces. Sentez le poids de la journée fondre de vos épaules. Votre respiration devient plus lente et plus profonde. Laissez le sommeil vous envelopper comme une couverture chaude.",
          "Laissez votre corps devenir lourd et détendu. En expirant, imaginez que vous flottez sur un nuage paisible. Vos pensées s'éloignent. Vous êtes en sécurité, confortable et prêt pour un sommeil profond et réparateur."
        ]
      },
      medium: {
        en: [
          "Close your eyes and begin to breathe slowly and deeply. Feel your body settling into the bed, becoming heavier with each breath. Starting from the top of your head, release all tension. Let your forehead relax, your jaw soften, and your shoulders drop. With each exhale, feel the stress of the day melting away. Your breathing becomes naturally slower and deeper. Allow your mind to become quiet and peaceful. You are completely safe and supported. Let yourself drift gently into restful, restorative sleep."
        ],
        nl: [
          "Sluit je ogen en begin langzaam en diep te ademen. Voel je lichaam zich nestelen in het bed, zwaarder wordend met elke ademteug. Begin vanaf de bovenkant van je hoofd alle spanning los te laten. Laat je voorhoofd ontspannen, je kaak verzachten en je schouders zakken. Met elke uitademing voel je de stress van de dag wegsmelten. Je ademhaling wordt natuurlijk langzamer en dieper. Laat je geest rustig en vreedzaam worden. Je bent volledig veilig en ondersteund. Laat jezelf zachtjes wegdrijven naar rustgevende, herstellende slaap."
        ],
        de: [
          "Schließe deine Augen und beginne langsam und tief zu atmen. Spüre, wie sich dein Körper ins Bett bettet und mit jedem Atemzug schwerer wird. Beginne vom Scheitel deines Kopfes an, alle Anspannung loszulassen. Lass deine Stirn entspannen, deinen Kiefer weich werden und deine Schultern sinken. Mit jedem Ausatmen spürst du, wie der Stress des Tages dahinschmilzt. Deine Atmung wird natürlich langsamer und tiefer. Erlaube deinem Geist, ruhig und friedlich zu werden. Du bist vollkommen sicher und geborgen. Lass dich sanft in erholsamen, regenerierenden Schlaf gleiten."
        ],
        es: [
          "Cierra los ojos y comienza a respirar lenta y profundamente. Siente tu cuerpo asentándose en la cama, volviéndose más pesado con cada respiración. Comenzando desde la parte superior de tu cabeza, libera toda tensión. Deja que tu frente se relaje, tu mandíbula se suavice y tus hombros caigan. Con cada exhalación, siente el estrés del día derritiéndose. Tu respiración se vuelve naturalmente más lenta y profunda. Permite que tu mente se vuelva silenciosa y pacífica. Estás completamente seguro y apoyado. Déjate deslizar suavemente hacia un sueño reparador y restaurador."
        ],
        fr: [
          "Fermez les yeux et commencez à respirer lentement et profondément. Sentez votre corps s'installer dans le lit, devenant plus lourd à chaque respiration. En commençant par le sommet de votre tête, relâchez toute tension. Laissez votre front se détendre, votre mâchoire s'adoucir et vos épaules tomber. À chaque expiration, sentez le stress de la journée fondre. Votre respiration devient naturellement plus lente et plus profonde. Permettez à votre esprit de devenir silencieux et paisible. Vous êtes complètement en sécurité et soutenu. Laissez-vous glisser doucement vers un sommeil réparateur et régénérateur."
        ]
      },
      long: {
        en: [
          "Close your eyes and begin this journey into peaceful sleep. Take a deep, slow breath in through your nose, and exhale gently through your mouth. Feel your body beginning to relax and settle. Starting from the very top of your head, begin to release all tension. Let your scalp relax, your forehead smooth out, and your eyes become soft and heavy. Allow your jaw to drop slightly, releasing any tension you might be holding there. Feel your neck and shoulders beginning to soften and drop. With each breath, you're releasing more and more of the day's stress and tension. Your arms are becoming heavy and relaxed, your hands resting peacefully. Your chest rises and falls naturally and slowly. Feel your back settling into the bed, supported and comfortable. Your breathing is becoming deeper and more rhythmic. Let your stomach relax completely. Your hips and legs are becoming heavy and still. Even your feet are relaxing completely. You are safe, you are supported, and you are ready for deep, restorative sleep. Let your mind become quiet and peaceful as you drift gently into restful slumber."
        ],
        nl: [
          "Sluit je ogen en begin deze reis naar vredige slaap. Neem een diepe, langzame ademteug door je neus en adem zachtjes uit door je mond. Voel je lichaam beginnen te ontspannen en tot rust komen. Begin vanaf de bovenkant van je hoofd alle spanning los te laten. Laat je hoofdhuid ontspannen, je voorhoofd glad worden en je ogen zacht en zwaar worden. Laat je kaak licht zakken en alle spanning die je daar vasthoudt loslaten. Voel je nek en schouders beginnen te verzachten en zakken. Met elke ademteug laat je meer en meer van de stress en spanning van de dag los. Je armen worden zwaar en ontspannen, je handen rusten vreedzaam. Je borst rijst en daalt natuurlijk en langzaam. Voel je rug zich nestelen in het bed, ondersteund en comfortabel. Je ademhaling wordt dieper en ritmischer. Laat je buik volledig ontspannen. Je heupen en benen worden zwaar en stil. Zelfs je voeten ontspannen volledig. Je bent veilig, je bent ondersteund en je bent klaar voor diepe, herstellende slaap. Laat je geest rustig en vreedzaam worden terwijl je zachtjes wegdrijft naar rustgevende sluimer."
        ]
      }
    },
    stress: {
      short: {
        en: [
          "Take a deep breath in for four counts. Hold for four. Exhale slowly for six counts. Feel the tension leaving your body. You are strong and capable. This moment of stress will pass. You have everything you need within you.",
          "Place your hand on your heart and feel it beating. Breathe in calm, breathe out worry. Your body knows how to relax. With each breath, you're returning to your center. You are in control of this moment.",
          "Imagine stress as clouds passing through a clear blue sky. They come and they go, but the sky remains peaceful. You are the sky. Breathe deeply and watch your worries drift away into the distance."
        ],
        nl: [
          "Neem een diepe ademteug voor vier tellen. Houd vast voor vier tellen. Adem langzaam uit voor zes tellen. Voel de spanning je lichaam verlaten. Je bent sterk en bekwaam. Dit moment van stress zal voorbijgaan. Je hebt alles wat je nodig hebt in jezelf.",
          "Leg je hand op je hart en voel het kloppen. Adem kalmte in, adem zorgen uit. Je lichaam weet hoe te ontspannen. Met elke ademteug keer je terug naar je centrum. Je hebt controle over dit moment.",
          "Stel je stress voor als wolken die door een heldere blauwe lucht trekken. Ze komen en gaan, maar de lucht blijft vreedzaam. Jij bent de lucht. Adem diep en kijk hoe je zorgen wegdrijven in de verte."
        ]
      },
      medium: [
        "Begin by taking a deep breath in through your nose for four counts. Hold this breath for four counts. Now exhale slowly through your mouth for six counts. Feel the tension beginning to leave your body with each exhale. You are strong, capable, and resilient. Place your hand on your heart and feel its steady rhythm. This moment of stress is temporary and will pass. With each breath, you're choosing calm over chaos. You have weathered difficult moments before, and you will again. Continue this breathing pattern, feeling more relaxed with each cycle. You have everything you need within you to handle whatever comes your way.",
        "Find a comfortable position and close your eyes. Place both hands on your heart and feel it beating steadily. Take a moment to acknowledge that you are safe right now. Begin to breathe slowly and naturally. Breathe in calm and peace, breathe out worry and tension. Your body has an incredible ability to relax and restore itself. With each breath, you're returning to your natural state of balance and centeredness. You are in control of this moment and your response to it. Feel the stress leaving your body with each exhale. You are grounded, you are strong, and you are at peace.",
        "Imagine your stress as dark clouds passing through a bright, clear blue sky. Notice how the clouds come and go, but the sky itself remains vast, peaceful, and unchanged. You are like that sky - vast, peaceful, and constant. The stressful thoughts and feelings are temporary visitors that will pass. Take slow, deep breaths and watch as your worries begin to drift away into the distance. With each breath, the sky of your mind becomes clearer and more peaceful. You are not your stress - you are the awareness that observes it. Rest in this peaceful awareness."
      ],
      long: [
        "Let's begin this journey toward deep relaxation and stress relief. Find a comfortable position, either sitting or lying down. Close your eyes and take a moment to notice your breathing just as it is. Now, let's practice a calming breath technique. Breathe in slowly through your nose for four counts: one, two, three, four. Hold this breath gently for four counts: one, two, three, four. Now exhale slowly through your mouth for six counts: one, two, three, four, five, six. Feel the tension beginning to leave your body with each exhale. You are strong, capable, and resilient. This moment of stress, however overwhelming it may feel, is temporary and will pass. Place your hand on your heart and feel its steady, reassuring rhythm. Your heart has been beating faithfully your entire life, supporting you through every challenge. Trust in your body's wisdom and its ability to find balance. With each breath cycle, you're choosing calm over chaos, peace over panic. You have weathered difficult storms before, and you have the strength to weather this one too. Continue this breathing pattern, feeling more grounded and centered with each cycle. You are exactly where you need to be, and you have everything within you to handle whatever comes your way. Let this knowing fill you with confidence and peace."
      ]
    },
    focus: {
      short: {
        en: [
          "Sit tall and breathe naturally. Focus on the sensation of air entering and leaving your nostrils. When your mind wanders, gently return to your breath. This is your anchor. Your concentration grows stronger with practice.",
          "Choose a point in front of you to gaze at softly. Breathe steadily and let your mind become clear like still water. Thoughts may arise, but let them pass like leaves on a stream. You are present and alert.",
          "Count your breaths from one to ten, then start again. One breath in, one breath out. If you lose count, simply begin again at one. This simple practice trains your mind to be sharp and focused."
        ],
        nl: [
          "Zit rechtop en adem natuurlijk. Focus op de sensatie van lucht die je neusgaten in en uit gaat. Wanneer je geest afdwaalt, keer zachtjes terug naar je ademhaling. Dit is je anker. Je concentratie wordt sterker met oefening.",
          "Kies een punt voor je om zachtjes naar te kijken. Adem gelijkmatig en laat je geest helder worden als stil water. Gedachten kunnen opkomen, maar laat ze voorbijgaan als bladeren op een stroom. Je bent aanwezig en alert.",
          "Tel je ademhalingen van één tot tien, begin dan opnieuw. Eén ademhaling in, één ademhaling uit. Als je de tel kwijtraakt, begin gewoon opnieuw bij één. Deze eenvoudige oefening traint je geest om scherp en gefocust te zijn."
        ]
      },
      medium: [
        "Sit comfortably with your spine straight but relaxed. Begin to breathe naturally and focus your attention on the sensation of air entering and leaving your nostrils. Feel the coolness of the air as it enters and the warmth as it leaves. When your mind inevitably wanders to other thoughts, gently and without judgment, return your attention to your breath. This is your anchor in the present moment. With each return to the breath, you're strengthening your concentration muscle. Your ability to focus grows stronger with practice, just like physical exercise strengthens your body.",
        "Find a comfortable seated position and choose a point in front of you to gaze at softly. It could be a spot on the wall, a candle flame, or any object that feels neutral. Breathe steadily and naturally. Let your mind become clear and still like calm water. Thoughts and sensations will arise - this is completely normal. Instead of fighting them, simply observe them and let them pass like leaves floating on a gentle stream. You are training your mind to be present, alert, and focused. With each moment of awareness, you're developing greater mental clarity and concentration.",
        "Begin by sitting with your spine upright and your body relaxed. Close your eyes and start counting your breaths from one to ten. One breath in, one breath out - that's one. Two breaths in, two breaths out - that's two. Continue this pattern up to ten, then start again at one. If you lose count or your mind wanders, don't worry - simply begin again at one. This isn't about perfection; it's about training your attention. Each time you notice your mind has wandered and you bring it back, you're strengthening your focus. This simple practice is like going to the gym for your mind, making it sharper and more concentrated."
      ],
      long: [
        "Welcome to this focused meditation practice. Find a comfortable seated position with your spine naturally upright, your shoulders relaxed, and your hands resting comfortably. Close your eyes gently and begin to notice your natural breathing rhythm. Don't try to change it - just observe it as it is. Now, begin to focus your attention on the specific sensation of air entering and leaving your nostrils. Feel the coolness of the incoming air and the slight warmth of the outgoing breath. This simple sensation will be your anchor throughout this practice. As you continue to focus on your breath, you'll notice that your mind naturally begins to wander. This is not a problem - it's actually a normal part of the meditation process. When you notice your attention has moved away from your breath, gently and without any self-judgment, return your focus to the sensation at your nostrils. Each time you notice your mind has wandered and you bring it back, you're performing a mental repetition that strengthens your concentration. Think of it like lifting weights at the gym - each return to the breath is like doing a rep that makes your focus stronger. With consistent practice, you'll find that your ability to maintain attention improves, and this enhanced focus will benefit every area of your life. Continue to rest your attention on the breath, returning again and again whenever you notice your mind has wandered."
      ]
    },
    anxiety: {
      short: {
        en: [
          "You are safe in this moment. Place both feet firmly on the ground. Take a slow breath in through your nose. Hold for three seconds. Exhale slowly through your mouth. Your nervous system is calming down naturally.",
          "Name five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste. You are grounded. You are here. You are okay.",
          "Breathe in peace, breathe out fear. Your anxiety is temporary, but your strength is permanent. With each breath, you're choosing calm over chaos. You have weathered storms before, and you will again."
        ],
        nl: [
          "Je bent veilig in dit moment. Plaats beide voeten stevig op de grond. Neem een langzame ademteug door je neus. Houd drie seconden vast. Adem langzaam uit door je mond. Je zenuwstelsel kalmeert natuurlijk.",
          "Benoem vijf dingen die je kunt zien, vier dingen die je kunt aanraken, drie dingen die je kunt horen, twee dingen die je kunt ruiken, en één ding dat je kunt proeven. Je bent geaard. Je bent hier. Je bent oké.",
          "Adem vrede in, adem angst uit. Je angst is tijdelijk, maar je kracht is permanent. Met elke ademteug kies je voor kalmte boven chaos. Je hebt stormen eerder doorstaan, en je zult het weer doen."
        ]
      },
      medium: [
        "Take a moment to remind yourself that you are safe in this present moment. Place both feet firmly on the ground and feel your connection to the earth beneath you. Take a slow, deep breath in through your nose for three counts. Hold this breath gently for three seconds. Now exhale slowly through your mouth for six counts. Feel your nervous system beginning to calm down naturally. Your body knows how to find balance and peace. With each breath, you're sending a message of safety to your entire being. You are grounded, you are present, and you are okay.",
        "Let's practice a grounding technique to bring you back to the present moment. First, name five things you can see around you - really look at them and notice their colors, shapes, and details. Now, name four things you can touch - feel their texture, temperature, and weight. Next, notice three things you can hear - perhaps sounds from outside, the hum of electronics, or your own breathing. Now, identify two things you can smell - take a gentle breath in and notice any scents around you. Finally, notice one thing you can taste - perhaps the lingering taste of something you drank or just the taste in your mouth. You are grounded. You are here in this moment. You are safe and okay.",
        "Begin by taking a slow, deep breath. As you breathe in, imagine you're breathing in peace, calm, and safety. As you breathe out, imagine you're releasing fear, worry, and tension. Your anxiety is a temporary visitor - it will pass. But your inner strength is permanent and always available to you. With each breath, you're making a choice to move from chaos toward calm. You have weathered difficult storms before, and you have the resilience to weather this one too. Trust in your ability to find peace, even in the midst of uncertainty."
      ],
      long: [
        "Let's begin this calming practice for anxiety relief. First, I want you to know that you are completely safe in this moment. Whatever worries or fears you're experiencing, right now, in this present moment, you are okay. Place both feet firmly on the ground and feel your connection to the earth beneath you. This connection is grounding and stabilizing. Now, let's practice a calming breath technique. Take a slow, deep breath in through your nose for four counts. Hold this breath gently for four counts. Now exhale slowly through your mouth for six counts, letting all the tension flow out of your body. Feel your nervous system beginning to calm down naturally. Your body has an incredible wisdom and ability to find balance and peace. With each breath, you're sending a message of safety to every cell in your body. Now, let's practice a grounding technique. Look around you and name five things you can see. Really look at them - notice their colors, shapes, textures, and details. Now, name four things you can touch. Feel their texture, temperature, and weight. Feel how real and solid they are. Next, notice three things you can hear. Perhaps sounds from outside, the hum of electronics, or your own breathing. Now, identify two things you can smell. Take a gentle breath in and notice any scents around you. Finally, notice one thing you can taste. You are grounded. You are here in this moment. You are safe and okay. As you continue to breathe slowly and deeply, remember that your anxiety is temporary - it will pass. But your inner strength, your resilience, and your capacity for peace are permanent parts of who you are. You have weathered difficult storms before, and you have the strength to weather this one too."
      ]
    },
    energy: {
      short: {
        en: [
          "Take three quick, energizing breaths. Feel the oxygen filling your lungs and awakening your body. Stretch your arms above your head. You are vibrant and alive. Energy flows through every cell of your being.",
          "Imagine golden sunlight entering your body with each breath. This light energizes your mind and revitalizes your spirit. You feel refreshed, motivated, and ready to embrace your day with enthusiasm.",
          "Breathe in possibility, breathe out limitation. Feel your heart rate gently increase as positive energy awakens within you. You are capable, strong, and ready to take on any challenge that comes your way."
        ],
        nl: [
          "Neem drie snelle, energiegevende ademteugen. Voel de zuurstof je longen vullen en je lichaam wakker maken. Strek je armen boven je hoofd. Je bent levendig en levend. Energie stroomt door elke cel van je wezen.",
          "Stel je voor dat gouden zonlicht je lichaam binnenkomt met elke ademteug. Dit licht geeft je geest energie en revitaliseert je spirit. Je voelt je verfrist, gemotiveerd en klaar om je dag met enthousiasme te omarmen.",
          "Adem mogelijkheid in, adem beperking uit. Voel je hartslag zachtjes toenemen terwijl positieve energie in je ontwaakt. Je bent bekwaam, sterk en klaar om elke uitdaging aan te gaan die op je pad komt."
        ]
      },
      medium: [
        "Let's awaken your natural energy and vitality. Take three quick, energizing breaths in through your nose and out through your mouth. Feel the oxygen filling your lungs and awakening every cell in your body. Now stretch your arms above your head, reaching toward the sky. Feel the energy flowing through your arms and fingers. You are vibrant and alive. With each breath, energy flows through every cell of your being. Feel your body becoming more alert and energized. You are ready to embrace whatever comes your way with enthusiasm and vitality.",
        "Close your eyes and imagine warm, golden sunlight streaming down from above. With each breath in, imagine this golden light entering your body through the top of your head, filling your mind with clarity and focus. Feel this energizing light spreading throughout your entire body - into your arms, your chest, your stomach, your legs, all the way to your toes. This light is energizing your mind and revitalizing your spirit. You feel refreshed, motivated, and ready to embrace your day with enthusiasm and positive energy.",
        "Take a deep breath in and as you do, breathe in possibility, potential, and positive energy. As you breathe out, release any limitations, doubts, or fatigue. Feel your heart rate gently increasing as vitality awakens within you. You are capable, strong, and ready to take on any challenge that comes your way. With each breath, you're connecting with your inner power and enthusiasm. You have unlimited potential and the energy to achieve whatever you set your mind to."
      ],
      long: [
        "Welcome to this energizing meditation practice. Let's begin by awakening your natural vitality and life force energy. Start by taking three quick, energizing breaths in through your nose and out through your mouth. Feel the oxygen filling your lungs and awakening every cell in your body. Now stretch your arms above your head, reaching toward the sky. Feel the energy flowing through your arms and fingers. You are vibrant and alive. Now, close your eyes and imagine warm, golden sunlight streaming down from above. This is the light of pure energy and vitality. With each breath in, imagine this golden light entering your body through the top of your head. Feel it filling your mind with clarity, focus, and positive energy. Watch as this energizing light spreads throughout your entire body - flowing into your neck and shoulders, energizing your arms and hands, filling your chest with vitality, warming your stomach and core, and flowing down through your legs all the way to your toes. Every cell in your body is being awakened and energized. With each breath, you're connecting more deeply with your inner power and enthusiasm. Feel your body becoming more alert and energized. Your mind is becoming clearer and more focused. You are ready to embrace whatever comes your way with enthusiasm and vitality. Take a deep breath in and as you do, breathe in possibility, potential, and positive energy. As you breathe out, release any limitations, doubts, or fatigue that may be holding you back. You are capable, strong, and ready to take on any challenge that comes your way. You have unlimited potential and the energy to achieve whatever you set your mind to. Carry this energy with you throughout your day."
      ]
    }
  };

  const generateRandomMeditationText = (type, duration, currentLanguage) => {
    const templates = meditationTemplates[type] || meditationTemplates.sleep;
    let durationCategory;
    
    if (duration <= 3) {
      durationCategory = 'short';
    } else if (duration <= 8) {
      durationCategory = 'medium';
    } else {
      durationCategory = 'long';
    }
    
    const categoryTemplates = templates[durationCategory];
    
    // Handle different template structures
    if (!categoryTemplates) {
      // Fallback to short if category doesn't exist
      const shortTemplates = templates.short;
      if (shortTemplates && shortTemplates[currentLanguage]) {
        const randomIndex = Math.floor(Math.random() * shortTemplates[currentLanguage].length);
        return shortTemplates[currentLanguage][randomIndex];
      }
      return "Close your eyes and breathe deeply. Feel your body relax. You are at peace.";
    }
    
    // Check if we have language-specific templates
    if (categoryTemplates[currentLanguage]) {
      const languageTemplates = categoryTemplates[currentLanguage];
      const randomIndex = Math.floor(Math.random() * languageTemplates.length);
      return languageTemplates[randomIndex];
    }
    
    // Fallback to English
    if (categoryTemplates['en']) {
      const randomIndex = Math.floor(Math.random() * categoryTemplates['en'].length);
      return categoryTemplates['en'][randomIndex];
    }
    
    // If it's an array (old format), use it directly
    if (Array.isArray(categoryTemplates)) {
      const randomIndex = Math.floor(Math.random() * categoryTemplates.length);
      return categoryTemplates[randomIndex];
    }
    
    // Final fallback
    return "Close your eyes and breathe deeply. Feel your body relax. You are at peace.";
  };

  const selectMeditationType = (type) => {
    setMeditationType(type);
    const newText = generateRandomMeditationText(type, duration, language);
    setText(newText);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    if (text) {
      // Regenerate text with new duration
      const newText = generateRandomMeditationText(meditationType, newDuration, language);
      setText(newText);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (text) {
      // Regenerate text with new language
      const newText = generateRandomMeditationText(meditationType, duration, newLanguage);
      setText(newText);
    }
  };

  // Initialize with a random sleep meditation on first load
  useEffect(() => {
    if (!text) {
      selectMeditationType('sleep');
    }
  }, [text]);

  const generate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post('http://localhost:5002/api/meditation', {
        text,
        background,
        language,
        voiceId
      }, { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      setAudioUrl(url);
    } catch (error) {
      console.error("Error generating meditation:", error);
      setError(t('errorGenerating') || "Failed to generate meditation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await axios.get('http://localhost:5002/api/meditation/voices');
        setVoices(res.data);
      } catch (error) {
        console.error("Error fetching voices:", error);
      }
    };
    fetchVoices();
  }, []);

  const uiLanguages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'nl', label: 'Nederlands' },
  ];

  return (
    <Background>
      <div className={styles.container}>
        <div className={styles.languageSelector}>
          <FormField label={t('uiLanguage')}>
            <Select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              options={uiLanguages}
            />
          </FormField>
        </div>
        
        <MeditationForm
          text={text}
          setText={setText}
          background={background}
          setBackground={setBackground}
          language={language}
          setLanguage={handleLanguageChange}
          voiceId={voiceId}
          setVoiceId={setVoiceId}
          voices={voices}
          generate={generate}
          isLoading={isLoading}
          meditationType={meditationType}
          selectMeditationType={selectMeditationType}
          duration={duration}
          handleDurationChange={handleDurationChange}
        />
        
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
        
        <AudioPlayer audioUrl={audioUrl} />
      </div>
    </Background>
  );
};

export default App;