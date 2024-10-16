// Imports
const { getAllNews } = require('../controllers/news.controller');

const newsRouter = require('express').Router();

// Routes
newsRouter.get('/get-all-news', getAllNews);

// Exports
module.exports = newsRouter;
