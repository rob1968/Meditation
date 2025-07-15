import React from 'react';
import { useTranslation } from 'react-i18next';

const MeditationForm = ({ text, setText, background, setBackground, language, setLanguage, voiceId, setVoiceId, voices, generate, isLoading }) => {
  const { t } = useTranslation();
  return (
    <>
      <textarea
        rows="5"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={t('textPlaceholder')}
        className="w-full p-2 border mb-4"
      ></textarea>
      <div className="mb-2">
        <label>{t('backgroundLabel')}</label>
        <select onChange={e => setBackground(e.target.value)} value={background}>
          <option value="ocean">{t('ocean')}</option>
          <option value="rain">{t('rain')}</option>
          <option value="forest">{t('forest')}</option>
        </select>
      </div>
      <div className="mb-2">
        <label>{t('languageLabel')}</label>
        <select onChange={e => setLanguage(e.target.value)} value={language}>
          <option value="en">{t('english')}</option>
          <option value="nl">{t('dutch')}</option>
          <option value="fr">{t('french')}</option>
          <option value="de">{t('german')}</option>
          <option value="es">{t('spanish')}</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <div className="mb-2">
        <label>{t('voiceLabel')}</label>
        <select onChange={e => setVoiceId(e.target.value)} value={voiceId}>
          {voices.map((voice, index) => (
            <option key={voice.voice_id || index} value={voice.voice_id}>{voice.name}</option>
          ))}
        </select>
      </div>
      <button onClick={generate} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={isLoading}>
        {isLoading ? t('generating') : t('generateButton')}
      </button>
    </>
  );
};

export default MeditationForm;