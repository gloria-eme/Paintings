/* const supertest = require('supertest'); */
const request = require('supertest');
const { app } = require('../../../index');
/* const assert = require('assert');
const mongoose = require('mongoose'); */

const newPainting = {
  name: `name_${new Date().getTime()}`,
  date: '2000',
  authorId: '637f50da8b678b516468737d',
};

describe('GET paintings', () => {
  test('all paintings returned', async () => {
    const res = await request(app).get('/api/paintings');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Recovered all paintings');
  }, 10000);

  test('fail in getting the paintings', async () => {
    const res = await request(app).get('/api/painting/hola');
    expect(res.statusCode).toEqual(404);
    expect(/Route Not Found/); //aquí falla porque añadimos un params inexistente
  }, 10000);
});

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
  test.only('Post a new painting FAIL', async () => {
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

describe('DELETE a painting');
test('succeeds taking the ID', async () => {
  await request(app)
    .delete(`/api/paintings/${newPainting._id}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.message).toEqual('painting deleted');
    });
}, 15000);

/* afterAll(async () => {
  await app.close();
  await mongoose.close();
});
afterAll(async () => {
  await new Promise((resolve) =>
    setTimeout(() => resolve(mongoose.close()), 200)
  );
}); */
