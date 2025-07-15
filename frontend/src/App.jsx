
import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import axios from 'axios';
import MeditationForm from './components/MeditationForm';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
  const [text, setText] = useState("Close your eyes. Breathe deeply. Relax your body.");
  const [background, setBackground] = useState("ocean");
  const [language, setLanguage] = useState("en");
  const [voiceId, setVoiceId] = useState("EXAVITQu4vr4xnSDxMaL"); // Rachel
  const [voices, setVoices] = useState([]); // New state for storing voices
  const [audioUrl, setAudioUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
 
   const generate = async () => {
    setIsLoading(true); // Set loading to true when generation starts
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
       alert("Failed to generate meditation. Please try again."); // Basic error feedback
     } finally {
      setIsLoading(false); // Set loading to false when generation finishes (success or error)
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


  const { t, i18n } = useTranslation();

  const uiLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'nl', name: 'Nederlands' },
  ];

  return (
    <div className="p-8">
      <div className="mb-4">
        <label>UI Language:</label>
        <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
          {uiLanguages.map(({ code, name }) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>
      <h1 className="text-2xl font-bold mb-4">🧘‍♀️ {t('title')}</h1>
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
      <AudioPlayer audioUrl={audioUrl} />
    </div>
  );
};

export default App;
