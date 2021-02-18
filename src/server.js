'use strict';

const express = require('express');
const app = express();

// 2 middlewares that perform specific server bahaviors
const logger = require('./middleware/logger.js');
const FiveHundred = require('./error-handlers/500.js');
const FourHundred = require('./error-handlers/404.js');

const clothesRouter = require('./routes/clothes.js');
const foodRouter = require('./routes/food.js');

app.use(express.json());
app.use(logger);
app.use(clothesRouter);
app.use(foodRouter);

app.use('*', FourHundred);
app.use(FiveHundred);

module.exports = {
  app: app,
  start: (port) =>  {
    app.listen(port, () => console.log('App is running on port :: ' + port));
  },
};