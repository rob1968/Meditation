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
  const [background, setBackground] = useState("ocean");
  const [language, setLanguage] = useState("en");
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL");
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { t, i18n } = useTranslation();

  // Meditation templates with multiple variations for each type
  const meditationTemplates = {
    sleep: [
      "Close your eyes and breathe deeply. Feel your body sinking into the bed. With each exhale, release the tension from your day. Your mind is calm and peaceful. Let yourself drift into restful sleep.",
      "Settle into your pillow and take slow, gentle breaths. Feel the weight of the day melting away from your shoulders. Your breathing becomes slower and deeper. Allow sleep to embrace you like a warm blanket.",
      "Let your body become heavy and relaxed. As you breathe out, imagine floating on a peaceful cloud. Your thoughts are drifting away. You are safe, comfortable, and ready for deep, restorative sleep."
    ],
    stress: [
      "Take a deep breath in for four counts. Hold for four. Exhale slowly for six counts. Feel the tension leaving your body. You are strong and capable. This moment of stress will pass. You have everything you need within you.",
      "Place your hand on your heart and feel it beating. Breathe in calm, breathe out worry. Your body knows how to relax. With each breath, you're returning to your center. You are in control of this moment.",
      "Imagine stress as clouds passing through a clear blue sky. They come and they go, but the sky remains peaceful. You are the sky. Breathe deeply and watch your worries drift away into the distance."
    ],
    focus: [
      "Sit tall and breathe naturally. Focus on the sensation of air entering and leaving your nostrils. When your mind wanders, gently return to your breath. This is your anchor. Your concentration grows stronger with practice.",
      "Choose a point in front of you to gaze at softly. Breathe steadily and let your mind become clear like still water. Thoughts may arise, but let them pass like leaves on a stream. You are present and alert.",
      "Count your breaths from one to ten, then start again. One breath in, one breath out. If you lose count, simply begin again at one. This simple practice trains your mind to be sharp and focused."
    ],
    anxiety: [
      "You are safe in this moment. Place both feet firmly on the ground. Take a slow breath in through your nose. Hold for three seconds. Exhale slowly through your mouth. Your nervous system is calming down naturally.",
      "Name five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste. You are grounded. You are here. You are okay.",
      "Breathe in peace, breathe out fear. Your anxiety is temporary, but your strength is permanent. With each breath, you're choosing calm over chaos. You have weathered storms before, and you will again."
    ],
    energy: [
      "Take three quick, energizing breaths. Feel the oxygen filling your lungs and awakening your body. Stretch your arms above your head. You are vibrant and alive. Energy flows through every cell of your being.",
      "Imagine golden sunlight entering your body with each breath. This light energizes your mind and revitalizes your spirit. You feel refreshed, motivated, and ready to embrace your day with enthusiasm.",
      "Breathe in possibility, breathe out limitation. Feel your heart rate gently increase as positive energy awakens within you. You are capable, strong, and ready to take on any challenge that comes your way."
    ]
  };

  const generateRandomMeditationText = (type) => {
    const templates = meditationTemplates[type] || meditationTemplates.sleep;
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  };

  const selectMeditationType = (type) => {
    setMeditationType(type);
    const newText = generateRandomMeditationText(type);
    setText(newText);
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
          setLanguage={setLanguage}
          voiceId={voiceId}
          setVoiceId={setVoiceId}
          voices={voices}
          generate={generate}
          isLoading={isLoading}
          meditationType={meditationType}
          selectMeditationType={selectMeditationType}
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