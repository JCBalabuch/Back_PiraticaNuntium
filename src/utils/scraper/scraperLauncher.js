// Imports
const { scraper } = require('./scraper');

scraper(process.env.SCRAP_URL);
console.log('Scraper started');
