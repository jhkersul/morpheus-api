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

  search(query) {
    return new Promise((resolve, reject) => {
      this.client.get('search/tweets', { q: query, count: 50 }, (error, tweets, response) => {
        resolve(tweets);
      });
    });
  }
}

export default TwitterController;
