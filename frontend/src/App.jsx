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
  const [text, setText] = useState("Close your eyes. Breathe deeply. Relax your body.");
  const [background, setBackground] = useState("ocean");
  const [language, setLanguage] = useState("en");
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL");
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { t, i18n } = useTranslation();

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