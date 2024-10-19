// Imports
const {
  getAllNews,
  getNewsByField,
  getSortedNews,
  getScrapedNews,
} = require('../controllers/news.controller');

const newsRouter = require('express').Router();

// Routes
newsRouter.get('/get-all-news', getAllNews);
newsRouter.get('/get-news-by-field', getNewsByField);
newsRouter.get('/get-sorted-news', getSortedNews);
newsRouter.post('/scrap-news', getScrapedNews);

// Exports
module.exports = newsRouter;
