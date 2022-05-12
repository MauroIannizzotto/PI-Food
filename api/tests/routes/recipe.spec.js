/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  "title": "Tacos",
	"summary": "Carne y verdura envuelta en masa",
	"spoonacularScore": "43",
	"healthScore": "56",
	"steps": ["Cocinar la verdura y la carne para luego colocarla dentro de la masa precalentada"],
	"image": "tacos.png",
	"diets": [
		"ketogenic",
		"dairy free"
	]
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));

    //-----------------------

  describe('GET /recipes', () => {
    it('should get status 200', () =>
      agent.get('/recipes')
      .expect(200)
      .expect('Content-Type', /json/)
    );
  });
  describe('GET /types', () => {
    it('Should get status 200', () => {
      agent.get('/types')
      .expect(200)
      .expect('Content-Type', /json/)
    })
  });
  describe('POST /recipe', () => {
    it('Should post a recipe with status 200', () => {
      agent.post('/recipe')
      .send(recipe)
      .expect(200)
      .expect('Content-Type', /json/)
    })
  });
});
