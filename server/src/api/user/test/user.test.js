const request = require('supertest');
const { app } = require('../../../index');

// var auth = {};
// beforeEach(loginUser(auth));

// function loginUser (auth) {
//   return function (done) {
//     request
//       .post('/api/users/login')
//       .send({
//         username: 'gloria',
//         password: 'gloria',
//       })
//       .expect(200)
//       .end(onResponse);

//     const onResponse = (err, res) => {
//       auth.token = res.body.token;
//       return done();
//     }
//   };
// };

// test.only('should respond with JSON', async () => {
//   await request(app)
//     .post('/api/users/login')
//     .set('Authorization', 'bearer ' + auth.token)
//     .expect(200)
// });



