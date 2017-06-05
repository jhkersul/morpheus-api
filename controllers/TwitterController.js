import Twitter from 'twitter';
import credentials from '../credentials.json';

class TwitterController {
  constructor() {
    this.client = new Twitter({
      consumer_key: credentials.twitter.consumer_key,
      consumer_secret: credentials.twitter.consumer_secret,
      access_token_key: credentials.twitter.access_token_key,
      access_token_secret: credentials.twitter.access_token_secret,
    });
  }

  search(query, count) {
    return new Promise((resolve, reject) => {
      this.client.get('search/tweets', { q: query, count, locale: 'pt-br' }, (error, tweets, response) => {
        resolve(tweets);
      });
    });
  }

  searchNews(query, count) {
    const improvedQuery = `${query} #G1`;

    return new Promise((resolve, reject) => {
      this.client.get('search/tweets',
        { q: improvedQuery, count, result_type: 'popular' },
        (error, tweets, response) => { resolve(tweets); });
    });
  }
}

export default TwitterController;
