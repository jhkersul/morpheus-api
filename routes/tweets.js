import express from 'express';
import TwitterController from '../controllers/TwitterController';
import ToneAnalyzer from '../controllers/ToneAnalyzer';

// Setting up environment
const router = express.Router();

router.get('/search', (req, res, next) => {
  const searchQuery = req.query.query;
  const tc = new TwitterController();
  tc.search(searchQuery, 40)
    .then((tweets) => {
      res.json(tweets.statuses);
    })
    .catch(err => res.json(err));
});

router.get('/search_news', (req, res, next) => {
  const searchQuery = req.query.query;
  const tc = new TwitterController();
  tc.searchNews(searchQuery, 10)
    .then((tweets) => {
      res.json(tweets.statuses);
    })
    .catch(err => res.json(err));
});

router.get('/analyze', (req, res, next) => {
  const searchQuery = req.query.query;
  const tc = new TwitterController();
  tc.search(searchQuery, 10)
    .then((tweets) => {
      // Twitter statuses
      const statuses = tweets.statuses;
      const texts = statuses.map(status => status.text);
      // Analyzing tone
      const ta = new ToneAnalyzer();
      ta.translateAndAnalyze(texts)
        .then(response => res.json(response))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

router.get('/analyze_news', (req, res, next) => {
  const searchQuery = req.query.query;
  const tc = new TwitterController();
  tc.searchNews(searchQuery, 10)
    .then((tweets) => {
      // Twitter statuses
      const statuses = tweets.statuses;
      const texts = statuses.map(status => status.text);
      // Analyzing tone
      const ta = new ToneAnalyzer();
      ta.translateAndAnalyze(texts)
        .then(response => res.json(response))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

module.exports = router;
