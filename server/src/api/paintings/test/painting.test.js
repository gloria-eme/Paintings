/* const mongoose = require('mongoose');
const request = require('supertest');

/* const Painting = require('../../paintings/model.painting'); */

const PaintingRoutes = require('../painting.routes');
const supertest = require('supertest');
const api = supertest(PaintingRoutes);

const request = require('supertest');
const assert = require('assert');
const express = require('express');

/* const app = express(); */

api.get('/api/paintings', function (req, res) {
  res.status(200).json({ name: 'john' });
});

<<<<<<< Updated upstream
request(api)
  .get('/api/paintings')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });
=======
describe('POST paintings', () => {
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
  test('Post a new painting FAIL', async () => {
    await request(app)
      .post('/api/paintings')
      .send({
        nombre: `name_${new Date().getTime()}`,
      })
      .expect(500);
    /*  .expect(res.body.message)
    .toBe('Failed in painting post'); */
    /* assert.equal(res.body.message, 'Resource Not Found'); */
  }, 10000);
});
>>>>>>> Stashed changes

/* const initialPainting = [
  {
    name: 'Patatas fritas al óleo',
    date: new Date(),
  },
  {
    name: 'Ay que vientecito hay en Málaga',
    date: new Date(),
  },
];

beforeEach(async () => {
  await Painting.deleteMany({});

  const painting1 = new Painting(initialPainting[0]);
  await painting1.save();

  const painting2 = new Painting(initialPainting[1]);
  await painting2.save();
}); */

/* test('Get paintings as json', async () => {
  await api.get('/api/paintings').expect(200);
}); */

/* describe('GET /api', function () {
  it('responds with json', function (done) {
    request(api)
      .get('/api/paintings')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
}); */

/* test('hay dos notas', async () => {
  const response = await api.get('/api/paintings');
  expect(response.body).toHaveLength(initialPainting.length);
});
 */
/* test('Post a new painting', async () => {
  const newPainting = {
    name: 'Guernica',
    date: '1937',
  };
  await api
    .post('/api/paintings')
    .send(newPainting)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/paintings');
  const contents = response.body.map((painting) => painting.name);
  expect(response.body).toHaveLenght(helper.initialPaintings.lenght + 1);
  expect(contents).toContain('Guernica');
}); */

/* afterAll(() => {
  mongoose.connection.close();
  server.close();
}); */
