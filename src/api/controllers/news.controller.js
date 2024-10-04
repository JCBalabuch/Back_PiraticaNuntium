// Imports
const News = require('../models/news.model');
// const newsData = require('../../../data/newsData.json');

// Save News on Data Base
const saveNewsOnDB = async (newsData, req, res, next) => {
  try {
    await News.insertMany(newsData);
    return res
      .status(201)
      .json({ message: 'All News saved on Data Base', element: newsData });
  } catch (error) {
    return res.status(400).json({
      message: `Error inserting the news on Data Base, because: ${error}`,
    });
  }
};
// Get News

// Exports
module.exports = { saveNewsOnDB };
