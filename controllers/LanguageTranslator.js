import LanguageTranslatorV2 from 'watson-developer-cloud/language-translator/v2';
import credentials from '../credentials.json';

class LanguageTranslator {
  constructor() {
    this.translator = new LanguageTranslatorV2({
      username: credentials.lt.username,
      password: credentials.lt.password,
      url: 'https://gateway.watsonplatform.net/language-translator/api/',
    });
  }

  translate(text) {
    return new Promise((resolve, reject) => {
      this.translator.translate({ text, source: 'pt-br', target: 'en' },
      (err, translation) => {
        if (err) reject(err);
        else resolve(translation.translations[0].translation);
      });
    });
  }
}

export default LanguageTranslator;
