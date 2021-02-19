'use strict';

require('@code-fellows/supergoose');

const FoodInterface = require('../src/models/food.js');
const foodModel = require('../src/models/data-collection-class.js');

const foodController = new FoodInterface(foodModel.foodExport);

describe('testing the food model controller', () => {
  it ('should be able to create a valid model', async () => {

    const newFood = await foodController.create({name: 'test', type: 'test'});

    expect(newFood.name).toEqual('test');
  });

  // it ('should be able', async () => {

  //   const 

  // });
});