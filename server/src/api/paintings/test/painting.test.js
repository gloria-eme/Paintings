const request = require('supertest');
const { app } = require('../../../index');

const newPainting = {
  name: `name_${new Date().getTime()}`,
  date: '2000',
  authorId: '637f50da8b678b516468737d',
};

describe('GET paintings', () => {
  test('all paintings are returned ', async () => {
    await request(app)
      .get('/api/paintings')
      .expect((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Recovered all paintings');
      });
  }, 10000);

  test('fail in route not found', async () => {
    await request(app)
      .get('/api/painting/hola')
      .expect((res) => {
        expect(res.statusCode).toEqual(404);
        expect(/Route Not Found/);
      });
  }, 10000);
});
describe('POST painting', () => {
  test('successful post', async () => {
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
});
describe('DELETE painting', () => {
  test('successful delete', async () => {
    await request(app)
      .delete(`/api/paintings/${newPainting._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('painting deleted');
      });
  }, 15000);
});
