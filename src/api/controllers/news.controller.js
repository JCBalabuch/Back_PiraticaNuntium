// Imports
const { scraper } = require('../../utils/scraper/scraper');
const News = require('../models/news.model');

const url = process.env.SCRAP_URL;

// Scrap news an save them on database

// Get News
const getAllNews = async (req, res, next) => {
  try {
    const news = await News.find();
    return res.status(200).json(news);
  } catch (error) {
    return res.status(400).json({ message: 'Error getting news', error });
  }
};

// Exports
module.exports = { getAllNews };
