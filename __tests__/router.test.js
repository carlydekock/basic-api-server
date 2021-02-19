'use strict';

require('@code-fellows/supergoose');
const server =  require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);

describe('Server tests', () => {

  //////// TESTS FOR FOOD ROUTE
  it('should pass a 404 error on a bad route', async () => {
    const response = await request.get('/wrong');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('That route is not found');
  });
  
  it('should pass a 404 error on a bad /food method', async () => {
    const response = await request.put('/food');

    expect(response.status).toEqual(404);
    // expect(response.text).toEqual('Bad method on route');
  });

  it('should be able to create a food item on POST /food', async () => {

    const response = await request.post('/food').send({
      name: 'apple',
      type: 'fruit',
    });
    const responseTwo = await request.post('/food').send({
      name: 'pear',
      type: 'fruit',
    });
    const responseThree = await request.post('/food').send({
      name: 'banana',
      type: 'fruit',
    });


    // console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.name).toEqual('apple');
    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body._id).toBeTruthy();
    expect(responseTwo.body.name).toEqual('pear');
    expect(responseThree.status).toEqual(200);
    expect(responseThree.body._id).toBeTruthy();
    expect(responseThree.body.name).toEqual('banana');
  });

  it ('should read a food item by request parameter on GET /food',  async () => {
    const response = await request.get('/food');
    const test = await request.get(`/food/${response.body[0]._id}`);

    expect(response.status).toEqual(200);
    expect(test).toBeTruthy();
  });

  it ('should get a food list by request parameter on GET /food', async () => {
    const response = await request.get('/food');
    const test = await request.get(`/food/${response.body[0]._id}`);
    const testTwo = await request.get(`/food/${response.body[0]._id}`);
    const testThree = await request.get(`/food/${response.body[0]._id}`);

    expect(response.status).toEqual(200);
    expect(test).toBeTruthy();
    expect(testTwo).toBeTruthy();
    expect(testThree).toBeTruthy();
  });

  it ('should update an existing food item on PUT', async () => {
    const response = await request.get('/food');
    const test = await request.put(`/food/${response.body[0]._id}`).send({
      name: 'carrot',
      type: 'vegetable',
    });

    // console.log('this is test', test);
    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toBeTruthy();
    expect(test.body.type).toEqual('vegetable');
  });

  it ('should delete an existing food item on DELETE', async () => {
    const response = await request.get('/food');
    const test = await request.delete(`/food/${response.body[0]._id}`);

    expect(test.status).toEqual(200);
  });

  ///////////////////////////////////////////////////

  it('should pass a 404 error on a bad /clothes method', async () => {
    const response = await request.put('/clothes');

    expect(response.status).toEqual(404);
    // expect(response.text).toEqual('Bad method on route');
  });

  it('should be able to create a clothes item on POST /clothes', async () => {

    const response = await request.post('/clothes').send({
      name: 'sweatshirt',
      type: 'top',
    });
    const responseTwo = await request.post('/clothes').send({
      name: 'tshirt',
      type: 'top',
    });
    const responseThree = await request.post('/clothes').send({
      name: 'jacket',
      type: 'top',
    });


    // console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body._id).toBeTruthy();
    expect(response.body.name).toEqual('sweatshirt');
    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body._id).toBeTruthy();
    expect(responseTwo.body.name).toEqual('tshirt');
    expect(responseThree.status).toEqual(200);
    expect(responseThree.body._id).toBeTruthy();
    expect(responseThree.body.name).toEqual('jacket');
  });

  it ('should read a clothes item by request parameter on GET /clothes',  async () => {
    const response = await request.get('/clothes');
    const test = await request.get(`/clothes/${response.body[0]._id}`);

    expect(response.status).toEqual(200);
    expect(test).toBeTruthy();
  });

  it ('should get a food list by request parameter on GET /clothes', async () => {
    const response = await request.get('/clothes');
    const test = await request.get(`/clothes/${response.body[0]._id}`);
    const testTwo = await request.get(`/clothes/${response.body[1]._id}`);
    const testThree = await request.get(`/clothes/${response.body[2]._id}`);

    expect(response.status).toEqual(200);
    expect(test).toBeTruthy();
    expect(testTwo).toBeTruthy();
    expect(testThree).toBeTruthy();
  });


  it ('should update an existing clothes item on PUT', async () => {
    const response = await request.get('/clothes');
    const test = await request.put(`/clothes/${response.body[0]._id}`).send({
      name: 'hoody',
      type: 'top',
    });

    // console.log('this is test', test);
    expect(response.status).toEqual(200);
    expect(response.body[0]._id).toBeTruthy();
    expect(test.body.name).toEqual('hoody');
  });

  it ('should delete an existing clothes item on DELETE', async () => {
    const response = await request.get('/clothes');
    const test = await request.delete(`/clothes/${response.body[0]._id}`);

    expect(test.status).toEqual(200);
  });
});