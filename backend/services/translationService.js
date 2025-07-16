const axios = require('axios');

// Language mappings for Google Translate API
const languageMap = {
  'en': 'en',
  'es': 'es', 
  'fr': 'fr',
  'de': 'de',
  'nl': 'nl',
  'zh': 'zh',
  'hi': 'hi',
  'ar': 'ar',
  'pt': 'pt',
  'ru': 'ru',
  'ja': 'ja',
  'ko': 'ko',
  'it': 'it'
};

// Simple translation service using Google Translate API
class TranslationService {
  constructor() {
    this.apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    this.baseUrl = 'https://translation.googleapis.com/language/translate/v2';
  }

  async translateText(text, targetLanguage, sourceLanguage = 'auto') {
    try {
      // If source and target are the same, return original text
      if (sourceLanguage === targetLanguage) {
        return text;
      }

      // Map our language codes to Google Translate codes
      const sourceLang = languageMap[sourceLanguage] || sourceLanguage;
      const targetLang = languageMap[targetLanguage] || targetLanguage;

      if (!this.apiKey) {
        console.warn(`Google Translate API key not found. Using original text for ${sourceLang} -> ${targetLang}`);
        console.log(`Original text length: ${text.length} characters`);
        
        // For testing purposes, return original text (no real translation)
        // In production, you should add a proper Google Translate API key
        return text;
      }

      const response = await axios.post(`${this.baseUrl}?key=${this.apiKey}`, {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      });

      if (response.data && response.data.data && response.data.data.translations) {
        return response.data.data.translations[0].translatedText;
      }

      return text; // Fallback to original text
    } catch (error) {
      console.error(`Translation error (${sourceLanguage} -> ${targetLanguage}):`, error.message);
      return text; // Return original text on error
    }
  }

  // Batch translate text to multiple languages
  async batchTranslate(text, targetLanguages, sourceLanguage = 'auto') {
    const translations = {};
    
    // Add source language
    translations[sourceLanguage] = text;
    
    // Translate to each target language
    const promises = targetLanguages.map(async (targetLang) => {
      if (targetLang === sourceLanguage) {
        translations[targetLang] = text;
      } else {
        translations[targetLang] = await this.translateText(text, targetLang, sourceLanguage);
      }
    });

    await Promise.all(promises);
    return translations;
  }
}

module.exports = new TranslationService();