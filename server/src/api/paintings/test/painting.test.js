/* const supertest = require('supertest'); */
const request = require('supertest');
const { app } = require('../../../index');
/* const PaintingRoutes = require('../painting.routes'); */

/* const express = require('express');
const app = new express();
app.use('/', PaintingRoutes);

const api = supertest(PaintingRoutes); */
/* const newPainting = {
  name: `name_${new Date().getTime()}`,
  date: '2000',
  authorId: '637f50da8b678b516468737d',
};
function loginUser(auth) {
  return function (done) {
    request
      .post('/api/users/login')
      .send({
        username: 'juan',
        password: 'juan',
      })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      auth.token = res.body.token;
      return done();
    }
  };
}

test('GET paintings ', async () => {
  const res = await request(app).get('/api/paintings');
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual('Recovered all paintings');
}, 10000);

test('GET in Route Not Found', async () => {
  const res = await request(app).get('/api/painting/hola');
  expect(res.statusCode).toEqual(404);
  expect(/Route Not Found/); //aquí falla porque añadimos un params inexistente
}, 10000);

test('Post a new painting', async () => {
  await request(app)
    .post('/api/paintings')
    .send(newPainting)
    .expect(201)
    .expect((res) => {
      expect(res.body.message).toEqual('Created Painting');
    })
    .then((response) => {
      const { res } = response;
      const jsonText = JSON.parse(res.text);
      const { data } = jsonText;
      newPainting._id = data.newPainting._id;
    });
}, 10000);

test('Delete a painting', async () => {
  await request(app)
    .delete(`/api/paintings/${newPainting._id}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.message).toEqual('painting deleted');
    });
}, 15000);
 */
var token = null;

beforeEach(function (done) {
  request(app)
    .post('/api/users/login')
    .send({ username: 'gloria', password: 'gloria' })
    .end(function (err, res) {
      token = res.body.token;
      done();
    });
});

test('should get a valid token for user: user1', function (done) {
  request(app)
    .post('/api/paintings')
    .auth(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2U2MmQ1MDlkODNkODA1NzFjYzNhYiIsInVzZXJuYW1lIjoiZ2xvcmlhIiwiaWF0IjoxNjY5NTU5MDIyLCJleHAiOjE2Njk1OTUwMjJ9.fi4acWAe33A6bOS_uNSCfWJWAD6HqA5X8tn6Jsn-Wmo',
      { type: 'bearer' }
    )
    .send({
      name: `name_${new Date().getTime()}`,
      date: '2000',
      authorId: '637f50da8b678b516468737d',
    })
    .expect(200);
});

test.only('login', function (done) {
  request(app)
    .post('/api/users/login')
    /* .set(
      'Authorization',
      'Bearer ' +
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2U2MmQ1MDlkODNkODA1NzFjYzNhYiIsInVzZXJuYW1lIjoiZ2xvcmlhIiwiaWF0IjoxNjY5NTU5MDIyLCJleHAiOjE2Njk1OTUwMjJ9.fi4acWAe33A6bOS_uNSCfWJWAD6HqA5X8tn6Jsn-Wmo'
    ) */
    .send({ username: 'gloria', password: 'gloria' })
    .expect(200);
});
