const express = require('express');
const router = express.Router();
const { generateGoogleTTS } = require('../services/googleTTSService');

// Generate voice preview using Google TTS
router.post('/', async (req, res) => {
  const { voiceId, language } = req.body;

  try {
    // Preview texts in different languages
    const previewTexts = {
      'en': 'Take a deep breath in... and slowly release. Feel your body settling into this moment of calm. Let go of any tension and allow yourself to find peace within.',
      'es': 'Respira profundamente... y suelta lentamente. Siente cómo tu cuerpo se asienta en este momento de calma. Deja ir cualquier tensión y permítete encontrar paz interior.',
      'fr': 'Prenez une profonde inspiration... et relâchez lentement. Sentez votre corps s\'installer dans ce moment de calme. Laissez aller toute tension et permettez-vous de trouver la paix intérieure.',
      'de': 'Atmen Sie tief ein... und lassen Sie langsam los. Spüren Sie, wie sich Ihr Körper in diesem Moment der Ruhe niederlässt. Lassen Sie jede Anspannung los und erlauben Sie sich, inneren Frieden zu finden.',
      'nl': 'Adem diep in... en laat langzaam los. Voel hoe je lichaam zich nestelt in dit moment van rust. Laat alle spanning los en sta jezelf toe innerlijke vrede te vinden.',
      'it': 'Fai un respiro profondo... e rilascia lentamente. Senti il tuo corpo che si stabilizza in questo momento di calma. Lascia andare ogni tensione e permettiti di trovare la pace interiore.',
      'pt': 'Respire profundamente... e solte lentamente. Sinta seu corpo se assentando neste momento de calma. Deixe ir toda tensão e permita-se encontrar a paz interior.',
      'ru': 'Сделайте глубокий вдох... и медленно выдохните. Почувствуйте, как ваше тело успокаивается в этот момент покоя. Отпустите все напряжение и позвольте себе найти внутренний мир.',
      'ja': '深く息を吸って... そしてゆっくりと吐き出してください。この穏やかな瞬間に体が落ち着いていくのを感じてください。すべての緊張を手放し、内なる平安を見つけることを許してください。',
      'ko': '깊게 숨을 들이쉬고... 천천히 내쉬세요. 이 평온한 순간에 당신의 몸이 안정되는 것을 느껴보세요. 모든 긴장을 놓아주고 내면의 평화를 찾도록 허용하세요.',
      'zh': '深深地吸气... 然后慢慢呼出。感受你的身体在这个平静的时刻中安定下来。释放所有的紧张，让自己找到内在的平静。',
      'hi': 'गहरी सांस लें... और धीरे-धीरे छोड़ें। महसूस करें कि आपका शरीर इस शांत क्षण में स्थिर हो रहा है। सभी तनाव को जाने दें और अपने भीतर शांति पाने की अनुमति दें।',
      'ar': 'خذ نفسًا عميقًا... ثم أطلقه ببطء. اشعر بجسدك يستقر في هذه اللحظة من الهدوء. دع كل التوتر يذهب واسمح لنفسك بإيجاد السلام الداخلي.'
    };

    // Get the preview text for the requested language, fallback to English
    const previewText = previewTexts[language] || previewTexts['en'];

    // Generate the audio using Google TTS with isPreview flag for better distinction
    const audioContent = await generateGoogleTTS(previewText, language, voiceId, true);

    // Set appropriate headers for audio response
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioContent.length,
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    });

    // Send the audio data directly
    res.send(Buffer.from(audioContent));

  } catch (error) {
    console.error('Error generating Google voice preview:', error);
    
    if (error.code === 3) {
      // Handle specific Chirp3-HD limitations
      if (error.details && error.details.includes('pitch parameters')) {
        res.status(400).json({ 
          error: 'This voice type (Chirp3-HD/Studio) has limitations on audio parameters. Please try again.',
          details: 'Chirp3-HD and Studio voices do not support pitch adjustments.'
        });
      } else {
        res.status(400).json({ 
          error: 'Invalid voice ID or voice configuration issue',
          details: error.details || error.message
        });
      }
    } else if (error.code === 16) {
      res.status(401).json({ 
        error: 'Google Cloud authentication failed. Please check credentials.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to generate voice preview',
        details: error.message 
      });
    }
  }
});

module.exports = router;