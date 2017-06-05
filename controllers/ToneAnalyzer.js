import ToneAnalyzerV3 from 'watson-developer-cloud/tone-analyzer/v3';
import LanguageTranslator from './LanguageTranslator';
import credentials from '../credentials.json';

class ToneAnalyzer {
  constructor() {
    this.toneAnalyzer = new ToneAnalyzerV3({
      username: credentials.ta.username,
      password: credentials.ta.password,
      version_date: '2016-05-19',
    });
  }

  analyze(text) {
    return new Promise((resolve, reject) => {
      this.toneAnalyzer.tone(
        { text },
        (err, tone) => {
          if (err) reject(err);
          else resolve(tone);
        });
    });
  }

  translateAndAnalyze(data) {
    return new Promise((resolve, reject) => {
      const translator = new LanguageTranslator();
      translator.translate(data)
        .then((translatedText) => {
          this.analyze(translatedText)
            .then((response) => {
              const filteredResponse = response
                .document_tone.tone_categories
                .filter(element => element.category_id === 'emotion_tone');
              resolve(filteredResponse);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}

export default ToneAnalyzer;
