'use strict';

//For every resourse that we have we can define a router, using RESTful route definitions
const express = require('express');
const router = express.Router();

const validator = require('../middleware/validator');

const ClothesInterface = require('../models/clothes.js');
const ClothesModel = require('../models/data-collection-class.js');
const clothesController = new ClothesInterface(ClothesModel.clothesExport);

router.get('/clothes', getClothes);
router.get('/clothes/:id', getClothes);
// router.get('/clothes/:id', validator, getClothesById);
router.post('/clothes', createClothes);
router.put('/clothes/:id', validator, updateClothes);
router.delete('/clothes/:id', validator, removeClothes);

async function getClothes(request, response, next) {

  const id = request.params.id;
  const responseObject = await clothesController.read(id);

  response.json(responseObject);
}

async function createClothes(request, response, next) {

  const clothesObject = request.body;
  const responseObject = await clothesController.create(clothesObject);

  response.json(responseObject);
}

async function updateClothes(request, response, next) {

  const id = request.params.id;
  const clothesObject = request.body;
  const responseObject = await clothesController.update(id, clothesObject);

  response.json(responseObject);
}

async function removeClothes(request, response, next) {

  const id = request.params.id;
  let responseObject = await clothesController.delete(id);

  response.status(200).json(responseObject);
}

// function getClothes(request, response, next) {
//   let responseObject = clothes.read();
//   response.json(responseObject);
// }

// function getClothesById(request, response, next) {
//   const id = parseInt(request.params.id);
//   let responseObject = clothes.read(id);
//   response.json(responseObject);
// }

// function createClothes(request, response, next) {
//   const clothesObject = request.body;
//   let responseObject = clothes.create(clothesObject);
//   response.json(responseObject);
// }

// function updateClothes(request, response, next) {
//   const id = parseInt(request.params.id);
//   const clothesObject = request.body;
//   let responseObject = clothes.update(id, clothesObject);
//   response.json(responseObject);
// }

// function removeClothes(request, response, next) {
//   const id = parseInt(request.params.id);
//   let responseObject = clothes.delete(id);
//   response.status(204).json(responseObject);
// }

module.exports = router;