// Imports
require('dotenv').config();
const express = require('express');
const { PORT } = require('./src/utils/urls');
const { connectDDBB } = require('./src/config/ddbb');

// Express application instance
const app = express();

// Connections
connectDDBB();

//Routes
// app.use('piratica_nuntium', searchRouter);

// Handle routes not found
app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Connected on http://localhost:${PORT}`);
});
