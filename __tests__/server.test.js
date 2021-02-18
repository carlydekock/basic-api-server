'use strict';

const server =  require('../src/server.js');
const supertest = require('supertest');
const request = supertest(server.app);


describe('Server tests', () => {
  // it('should pass a 500 error with an invalid food ID', async () => {
  //   const response = await request.get('/food/wrong');

  //   expect(response.status).toEqual(500);
  //   expect(response.text).toEqual('Invalid food ID');
  // });

  it('should pass a 404 error on a bad route', async () => {
    const response = await request.get('/wrong');

    expect(response.status).toEqual(404);
    expect(response.text).toEqual('That route is not found');
  });
  
  it('should pass a 404 error on a bad method', async () => {
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
    expect(response.body.id).toEqual(1);
    expect(response.body.data.name).toEqual('apple');
    expect(responseTwo.status).toEqual(200);
    expect(responseTwo.body.id).toEqual(2);
    expect(responseTwo.body.data.name).toEqual('pear');
    expect(responseThree.status).toEqual(200);
    expect(responseThree.body.id).toEqual(3);
    expect(responseThree.body.data.name).toEqual('banana');
  });

  it ('should read a food item by request parameter on GET /food',  async () => {
    const response = await request.get('/food/1');

    // console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
  });

  it('should get a food list by request parameter on GET /food', async () => {
    const response = await request.get('/food');

    expect(response.status).toEqual(200);
    expect(response.body[0].data).toEqual({ name: 'apple', type: 'fruit'});
    expect(response.body[1].data).toEqual({ name: 'pear', type: 'fruit'});
    expect(response.body[2].data).toEqual({ name: 'banana', type: 'fruit'});
  });

  it ('should update an existing food item on PUT /food/:id', async () => {
    const response = await request.put('/food/1').send({
      name: 'carrot',
      type:  'vegetable',
    });

    // console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(1);
    expect(response.body.data.name).toEqual('carrot');
  });

  it('should delete an existing food item on DELETE /food/:id', async () => {
    const response = await request.delete('/food/1');

    expect(response.status).toEqual(204);
  });
});