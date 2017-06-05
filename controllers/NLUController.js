import NaturalLanguageUnderstandingV1 from 'watson-developer-cloud/natural-language-understanding/v1';
import LanguageTranslator from './LanguageTranslator';
import credentials from '../credentials.json';

class NLUController {
  constructor() {
    this.nlu = new NaturalLanguageUnderstandingV1({
      username: credentials.nlu.username,
      password: credentials.nlu.password,
      version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27,
    });
  }

  analyze(data) {
    return new Promise((resolve, reject) => {
      this.nlu.analyze({
        html: data, // Buffer or String
        features: {
          concepts: {},
          keywords: {},
        },
      }, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });
  }

  translateAndAnalyze(data) {
    return new Promise((resolve, reject) => {
      const translator = new LanguageTranslator();
      translator.translate(data)
        .then((translatedText) => {
          this.analyze(translatedText)
            .then(response => resolve(response))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}

export default NLUController;
