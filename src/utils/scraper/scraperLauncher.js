// Imports
const { saveNewsOnDB } = require('../../api/controllers/news.controller');
const { scraper } = require('./scraper');

// Launch scraper & Save data on DB

// const getAndSaveNews = async (req, res, next) => {
//   try {
//     await scraper('https://news.ycombinator.com/news');

//     const scrapedNews = scraper.scrapedNews;

//     if (scrapedNews.length === 0) {
//       return res.status(404).json({ message: 'No news found' });
//     }

//     await saveNewsOnDB(newsData, req, res, next);
//   } catch (error) {
//     return res.status(500).json({ message: `Error fetching news: ${error}` });
//   }
// };

// getAndSaveNews();

scraper('https://news.ycombinator.com/news');
console.log('Scraper started');
// saveNewsOnDB();
