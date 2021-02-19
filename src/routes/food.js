'use strict';

//For every resourse that we have we can define a router, using RESTful route definitions
const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');

const FoodInterface = require('../models/food.js');
const FoodModel = require('../models/data-collection-class.js');
const foodController = new FoodInterface(FoodModel.foodExport);

router.get('/food', getFood);
router.get('/food/:id', getFood);
// router.get('/food/:id', validator, getFoodById);
router.post('/food', createFood);
router.put('/food/:id', validator, updateFood);
router.delete('/food/:id', validator, removeFood);


async function getFood(request, response, next) {

  const id = request.params.id;
  const responseObject = await foodController.read(id);

  response.json(responseObject);
}

async function createFood(request, response, next) {

  const foodObject = request.body;
  const responseObject = await foodController.create(foodObject);

  response.json(responseObject);
}

async function updateFood(request, response, next) {

  const id = request.params.id;
  const foodObject = request.body;
  const responseObject = await foodController.update(id, foodObject);

  response.json(responseObject);
}

async function removeFood(request, response, next) {

  const id = request.params.id;
  let responseObject = await foodController.delete(id);

  response.status(200).json(responseObject);
}

// function getFood(request, response, next) {
//   let responseObject = food.read();
//   response.json(responseObject);
// }

// function getFoodById(request, response, next) {
//   const id = parseInt(request.params.id);
//   let responseObject = food.read(id);
//   response.json(responseObject);
// }

// function createFood(request, response, next) {
//   const foodObject = request.body;
//   let responseObject = food.create(foodObject);
//   response.json(responseObject);
// }

// function updateFood(request, response, next) {
//   const id = parseInt(request.params.id);
//   const foodObject = request.body;
//   let responseObject = food.update(id, foodObject);
//   response.json(responseObject);
// }

// function removeFood(request, response, next) {
//   const id = parseInt(request.params.id);
//   let responseObject = food.delete(id);
//   response.status(204).json(responseObject);
// }

module.exports = router;