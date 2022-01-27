/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  // beforeEach(() => Dog.sync({ force: true })
  //   .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe('GET /dogs:id', () => {
  it('GET response with 200 if it finds a dog with the id provided', function () {
      agent.get('/dogs/25')
      .expect(function(res) {
        expect(res.status).equal(200);
      })
    })
})

describe('GET /dogs?name=', () => {
  it('GET response with 200 if it finds dogs with the name provided', function () {
    agent.get('/dogs?name=african')
    .expect(function(res) {
      expect(res.status).equal(200);
    })
  })
})

describe('GET /temperament', () => {
  it('GET response with 200 if it finds all the temperaments possible', function () {
    agent.get('/temperament')
    .expect(function(res) {
      expect(res.status).equal(200);
    })
  })
})
