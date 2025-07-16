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
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL");
  const [voices, setVoices] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { t, i18n } = useTranslation();


  const generateAIMeditationText = async (type, duration, currentLanguage) => {
    try {
      const response = await axios.post('http://localhost:5002/api/meditation/generate-text', {
        type,
        duration,
        language: currentLanguage
      });
      
      return response.data.text;
    } catch (error) {
      console.error('Error calling meditation text API:', error);
      // Fallback to a simple default text if API is completely unavailable
      return `Take a deep breath and relax. Focus on your breathing and let go of any tension. You are at peace and in control.`;
    }
  };

  const generateRandomMeditationText = (type, duration, currentLanguage) => {
    // Use AI generation instead of fixed templates
    return generateAIMeditationText(type, duration, currentLanguage);
  };

  const selectMeditationType = async (type) => {
    setMeditationType(type);
    setIsLoading(true);
    try {
      const newText = await generateRandomMeditationText(type, duration, i18n.language);
      setText(newText);
    } catch (error) {
      console.error('Error generating meditation text:', error);
      setText(`Take a deep breath and relax. Focus on your breathing and let go of any tension. You are at peace and in control.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDurationChange = async (newDuration) => {
    setDuration(newDuration);
    if (text) {
      setIsLoading(true);
      try {
        // Regenerate text with new duration
        const newText = await generateRandomMeditationText(meditationType, newDuration, i18n.language);
        setText(newText);
      } catch (error) {
        console.error('Error generating meditation text:', error);
        setText(`Take a deep breath and relax. Focus on your breathing and let go of any tension. You are at peace and in control.`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Initialize with a random sleep meditation on first load
  useEffect(() => {
    if (!text) {
      selectMeditationType('sleep');
    }
  }, [text]);

  // Update text when UI language changes
  useEffect(() => {
    if (text && meditationType) {
      const updateText = async () => {
        setIsLoading(true);
        try {
          const newText = await generateRandomMeditationText(meditationType, duration, i18n.language);
          setText(newText);
        } catch (error) {
          console.error('Error generating meditation text:', error);
          setText(`Take a deep breath and relax. Focus on your breathing and let go of any tension. You are at peace and in control.`);
        } finally {
          setIsLoading(false);
        }
      };
      updateText();
    }
  }, [i18n.language]);

  const generate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post('http://localhost:5002/api/meditation', {
        text,
        background,
        language: i18n.language,
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

  const fetchVoices = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/meditation/voices');
      setVoices(res.data);
    } catch (error) {
      console.error("Error fetching voices:", error);
    }
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  const uiLanguages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'nl', label: 'Nederlands' },
    { value: 'zh', label: '中文' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'ar', label: 'العربية' },
    { value: 'pt', label: 'Português' },
    { value: 'ru', label: 'Русский' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'it', label: 'Italiano' },
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