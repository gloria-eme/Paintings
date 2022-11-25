/* const supertest = require('supertest'); */
const request = require('supertest');
const { app } = require('../../../index');
/* const PaintingRoutes = require('../painting.routes'); */

/* const express = require('express');
const app = new express();
app.use('/', PaintingRoutes);

const api = supertest(PaintingRoutes); */

test('GET paintings', async () => {
  await request(app).get('/api/paintings').expect(200);
}, 100000);

test('GET paintings fail', async () => {
  await request(app)
    .get('/api/paintings/hola')
    .expect(404)
    .expect(/Route not found/); //aquí falla porque añadimos un params inexistente
}, 100000);

/* test('GET paintings fail', () => {
  api.get('/api/paintings/fulanito').expect(500, 'Fail to recover paintings'); //aquí falla porque añadimos un params inexistente
});*/

test('Post a new painting', async () => {
  const newPainting = {
    name: 'Guernica',
    date: '1937',
    authorId: '637f50da8b678b516468737d',
  };
  await request(app)
    .post('/api/paintings')
    /* .auth('username', 'password') */
    .send(newPainting)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .expect('Created Painting');
});
