// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PORT } = require('./src/utils/urls');
const { connectDDBB } = require('./src/config/ddbb');
const newsRouter = require('./src/api/routes/news.routes');

// Express application instance
const app = express();

// Connections
connectDDBB();

// CORS
app.use(cors());

//Routes
app.use('/piratica_nuntium', newsRouter);

// Handle routes not found
app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

// Handle errors
app.use((err, req, res, next) => {
  console.error('Error', err);
  res.status(500).json({ message: 'An error ocurred' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Connected on http://localhost:${PORT}`);
});
