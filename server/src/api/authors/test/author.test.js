const request = require('supertest');
const { app } = require('../../../index');

const newAuthor = {
  name: `name_${new Date().getTime()}`,
  lifedate: '1881/1973',
  country: 'Spain',
};

describe('GET authors', () => {
  // listen EADDRINUSE: address already in use :::8080
  test('all authors returned', async () => {
    await request(app)
      .get('/api/authors')
      .expect((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Recovered all authors');
      });
  });

  test('fail in getting the authors', async () => {
    await request(app)
      .get('/api/author')
      .expect((res) => {
        expect(res.statusCode).toEqual(404);
        expect(/Route Not Found/);
      });
  });
});

describe('POST authors', () => {
  test('Post a new author', async () => {
    await request(app)
      .post('/api/authors')
      .send(newAuthor)
      .expect((res) => {
        expect(res.body.status).toEqual(201);
        expect(res.body.message).toEqual('Created Author');
      })
      .then((response) => {
        const { res } = response;
        const jsonText = JSON.parse(res.text);
        const { data } = jsonText;
        newAuthor._id = data.newAuthor._id;
      });
  });
  test('Post a new author FAIL', async () => {
    await request(app)
      .post('/api/authors')
      .send({
        country: 'Spain',
        name: `name_${new Date().getTime()}`,
      })

      .expect(500);
  }, 3000);
});

describe('DELETE a author', () => {
  test('succeeds taking the ID', async () => {
    await request(app)
      .delete(`/api/authors/${newAuthor._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toEqual('author deleted');
      });
  });
});
