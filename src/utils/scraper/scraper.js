// Imports
const puppeteer = require('puppeteer');
const fs = require('fs');

const scrapedNews = [];

// Connect scraper function
const scraper = async (url) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  extractData(page, browser);
};

// Scraper data function
const extractData = async (page, browser) => {
  const tableRow = await page.$$('tr.athing');
  const tableData = await page.$$('td.subtext');

  for (let i = 0; i < tableRow.length; i++) {
    const row = tableRow[i];
    const data = tableData[i];

    const title = await row.$eval('.titleline', (e) => e.textContent);

    let site;
    try {
      site = await row.$eval('.sitestr', (e) => e.textContent);
    } catch (error) {
      site = 'No site';
    }

    let score;
    try {
      score = await data.$eval('.score', (e) =>
        parseInt(e.textContent.replace(' points', ''))
      );
    } catch (error) {
      score = 0;
    }

    let user;
    try {
      user = await data.$eval('.hnuser', (e) => e.textContent);
    } catch (error) {
      user = 'No user declared';
    }

    const time = await data.$eval('.age', (e) => e.title);

    let comments;
    try {
      const commentText = await data.$eval(
        '.subline a:nth-of-type(3)',
        (e) => e.textContent
      );

      console.log('línea 59', typeof commentText);
      console.log('línea 59', commentText);
      console.log('línea 60', commentText.length);
      console.log('línea 61', commentText.includes('&nbsp;comments'));
      console.log('línea 62', commentText.includes(' comments'));

      //   comments = commentText.includes('&nbsp;comments')
      //     ? parseInt(commentText.replace('&nbsp;comments', ''))
      //     : commentText;

      //   console.log('línea 63', comments);

      //   parseInt(e.textContent.replace(' points', ''));
    } catch (error) {
      comments = 0;
    }

    const news = {
      title,
      site,
      score,
      user,
      time,
      comments,
    };

    scrapedNews.push(news);
  }

  //   console.log(scrapedNews);
};

// Exports
module.exports = { scraper };
