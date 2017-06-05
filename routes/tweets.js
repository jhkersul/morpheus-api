import express from 'express';
import TwitterController from '../controllers/TwitterController';

// Setting up environment
const router = express.Router();

/* GET home page. */
router.get('/search', (req, res, next) => {
  const searchQuery = req.query.query;
  const tc = new TwitterController();
  tc.search(searchQuery)
    .then((tweets) => {
      res.json(tweets.statuses);
    })
    .catch(err => res.json(err));
});

module.exports = router;
