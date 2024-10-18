// Imports
require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');
const mongoose = require('mongoose');
const { connectDDBB } = require('../../config/ddbb');
const News = require('../../api/models/news.model');

// Create scrapedNews empty array
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
    const link = await row.$eval('.titleline > a', (e) => e.href);

    let site;
    try {
      site = await row.$eval('.sitestr', (e) => e.textContent);
    } catch (error) {
      site = 'No site';
    }

    let sitelink;
    try {
      sitelink = await row.$eval('.sitebit > a', (e) => e.href);
    } catch (error) {
      sitelink = 'No site';
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

    let userlink;
    try {
      userlink = await data.$eval('.hnuser', (e) => e.href);
    } catch (error) {
      userlink = 'No user declared';
    }

    const time = await data.$eval('.age', (e) => e.title);

    let comments;
    try {
      const commentText = await data.$eval(
        '.subline a:nth-of-type(3)',
        (e) => e.textContent
      );

      comments =
        parseInt(commentText.replace(`/\s*comments/`, '')) || commentText;
    } catch (error) {
      comments = 0;
    }

    const news = {
      title,
      link,
      site,
      sitelink,
      score,
      user,
      userlink,
      time,
      comments,
    };
    scrapedNews.push(news);
  }

  try {
    await page.$eval('.morelink', (e) => e.click());
    await page.waitForNavigation();

    console.log(`Llevamos ${scrapedNews.length} noticias recolectadas`);

    extractData(page, browser);
  } catch (error) {
    fileNewsDataColected(scrapedNews);
    await saveNewsOnDataBase(scrapedNews);
    await browser.close();
  }
};

// Function to write JSON's file
const fileNewsDataColected = (scrapedNews) => {
  fs.writeFile('./data/newsData.json', JSON.stringify(scrapedNews), () => {
    console.log('Wroten file news');
  });
};

// Function to save data on database
const saveNewsOnDataBase = async (scrapedNews) => {
  try {
    await connectDDBB();
    console.log('Scrap connected to DDBB');

    const allNews = await News.find();

    if (allNews.length) {
      console.log('Deleting News Data');
      await News.collection.drop();
      console.log('News Data deleted');
    }

    console.log('Inserting News Data');
    await News.insertMany(scrapedNews);
  } catch (error) {
    console.error('Error saving news in the Data Base', error);
  } finally {
    process.exit();
  }
};

// Exports
module.exports = { scrapedNews, scraper };
