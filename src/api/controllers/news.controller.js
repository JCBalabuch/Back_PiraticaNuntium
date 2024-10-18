// Imports
const { scraper, scrapedNews } = require('../../utils/scraper/scraper');
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

// Get News by title or user or site
const getNewsByField = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const field = req.query.field;

    if (!searchTerm || !field) {
      return res.status(406).json({
        message: 'Must introduce a word to search and select a field',
      });
    }

    const regex = new RegExp(searchTerm, 'i');

    let news;

    switch (field) {
      case 'title':
        news = await News.find({ title: regex });
        break;
      case 'user':
        news = await News.find({ user: regex });
        break;
      case 'site':
        news = await News.find({ site: regex });
        break;
      default:
        return res.status(400).json({ message: 'Invalid field' });
        break;
    }

    if (!news.length) {
      return res
        .status(404)
        .json({ message: 'No news found for this search term' });
    }

    return res.status(200).json(news);
  } catch (error) {
    console.error('Error getting news', error.message);
    return res
      .status(500)
      .json({ message: 'An error occurred while searching for news' });
  }
};

// Get News sorted by score, time or comments
const getSortedNews = async (req, res, next) => {
  try {
    const { sortedBy } = req.query;

    const sortOption = {};

    if (sortedBy === 'comments') {
      sortOption.comments = -1;
    } else if (sortedBy === 'score') {
      sortOption.score = -1;
    } else if (sortedBy === 'time') {
      sortOption.time = -1;
    } else {
      return res.status(400).json({ message: 'Invalid sort parameter' });
    }

    const sortedNews = await News.find().sort(sortOption);

    if (!sortedNews.length) {
      return res.status(404).json({ message: 'No news found' });
    }

    return res.status(200).json(sortedNews);
  } catch (error) {
    console.error('Error getting sorted news', error.message);
    return res
      .status(500)
      .json({ message: 'An error occurred while searching for news' });
  }
};

// Scrap News
const getScrapedNews = async (req, res, next) => {
  try {
    scrapedNews.length = 0;

    await scraper(url);

    return res
      .status(200)
      .json({ message: 'Scrapping completed', data: scrapedNews });
  } catch (error) {
    console.error('Error during scraing');
    return res.status(500).json({ message: 'Error during scraping' });
  }
};

// Exports
module.exports = { getAllNews, getNewsByField, getSortedNews, getScrapedNews };
