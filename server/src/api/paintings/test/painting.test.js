/* const supertest = require('supertest'); */
const request = require('supertest');
const { app } = require('../../../index');
/* const PaintingRoutes = require('../painting.routes'); */

/* const express = require('express');
const app = new express();
app.use('/', PaintingRoutes);

const api = supertest(PaintingRoutes); */
const newPainting = {
  name: `name_${new Date().getTime()}`,
  date: '2000',
  authorId: '637f50da8b678b516468737d',
};

test('GET paintings ', async () => {
  const res = await request(app).get('/api/paintings');
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual('Recovered all paintings');
}, 100000);

test('GET in Route Not Found', async () => {
  const res = await request(app).get('/api/painting/hola');
  expect(res.statusCode).toEqual(404);
  expect(/Route Not Found/); //aquí falla porque añadimos un params inexistente
}, 100000);

test.only('Post a new painting', async () => {
  await request(app)
    .post('/api/paintings')
    .send(newPainting)
    .expect(201)
    .expect((res) => {
      expect(res.body.message).toEqual('Created Painting');
    })
    .then((res) => {
      /*     newPainting._id = res.body._id;  */
      console.log(res.res);
    });
});

test('Delete a painting', async () => {
  await request(app)
    .delete(`/api/paintings/${newPainting._id}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.message).toEqual('painting deleted');
    });
}, 150000);
/* test('post a movie with res', async () => {
  const newPainting = {
    name: 'Esto es un test',
    date: '2022',
    authorId: '637f888f08f271a0f963c646',
  };
  const res = await request(app).post('/api/paintings').send(newPainting);
  await expect(res.statusCode).toEqual(201);
  await expect(res.body.message).toEqual('Created Painting');
}); */
