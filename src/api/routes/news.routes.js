// Imports
const { saveNewsOnDB } = require('../controllers/news.controller');

const newsRouter = require('express').Router();

// Routes
newsRouter.post('/save_news', saveNewsOnDB);

// Exports
module.exports = newsRouter;
