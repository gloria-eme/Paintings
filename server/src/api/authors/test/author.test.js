/* const supertest = require('supertest'); */
const request = require('supertest');
const { app } = require('../../../index');
const assert = require('assert');
const mongoose = require('mongoose');

const newAuthor = {
  name: `name_${new Date().getTime()}`,
  lifedate: '1881/1973',
  country: 'Spain',
  // paintings: '637f50da8b678b516468737d',
};

describe('GET authors', () => {
  test('all authors returned', async () => {
    const res = await request(app).get('/api/authors');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Recovered all authors');
  });

  test('fail in getting the authors', async () => {
    const res = await request(app).get('/api/author');
    expect(res.statusCode).toEqual(404);
    expect(/Route Not Found/);
  });
});

describe('POST authors', () => {
  test('Post a new author', async () => {
    await request(app)
      .post('/api/authors')
      // .auth('username', 'password')
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

      // .expect('Failed in painting post');
      .expect((res) => {
        // sale cannot POST /api/authors (500)
        expect(res.error.message).toEqual('Failed in author');
        console.log(res.error.message)
      });
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

/* afterAll(async () => {
  await app.close();
  await mongoose.close();
});
afterAll(async () => {
  await new Promise((resolve) =>
    setTimeout(() => resolve(mongoose.close()), 200)
  );
}); */

var auth = {};
beforeEach(loginUser(auth));

function loginUser (auth) {
  return function (done) {
    request
      .post('/api/users/login')
      .send({
        username: 'gloria',
        password: 'gloria',
      })
      .expect(200)
      .end(onResponse);

    const onResponse = (err, res) => {
      auth.token = res.body.token;
      return done();
    }
  };
};

test.only('should respond with JSON', async () => {
  await request(app)
    .post('/api/users/login')
    .set('Authorization', 'bearer ' + auth.token)
    .expect(200)
});