'use strict';

const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
});

const clothesSchema = mongoose.Schema({
  // name: { type: String, required: true },
  name: { type: String },
  type: { type: String },
});

const foodModel = mongoose.model('food', foodSchema);
const clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = {
  foodExport: foodModel,
  clothesExport: clothesModel,
};