const frisby = require('frisby');
const flipout = require('flipout');
const data = require('../data/dataset/stranger-things-characters.json');
require('dotenv').config();

const HAWKINS_URL = `https://thabatadornelas-bk.herokuapp.com?batata=${Math.random()}`
const UPSIDEDOWN_URL = `https://thabatadornelas-bd.herokuapp.com?batata=${Math.random()}`

const flipData = data.map(({ name, origin, status }) => ({
  name: flipout(name),
  origin: flipout(origin),
  status: flipout(status),
}));

describe('Verifica o Deploy no Heroku', () => {
  it('Será validado que ao fazer uma requisição do tipo GET para o endpoint da API Hawkins serão retornadas as informações corretas.', async () => {
    await frisby
      .get(HAWKINS_URL)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        JSON.parse(body).forEach((character) => {
          expect(data).toContainEqual(character);
        });
      });
  });

// teste

  it('Será validado que ao fazer uma requisição do tipo GET para o endpoint da API upsideDown serão retornadas as informações corretas',
    async () => {
      await frisby
        .get(UPSIDEDOWN_URL)
        .expect('status', 200)
        .then((response) => {
          const { body } = response;
          JSON.parse(body).forEach((character) => {
            expect(flipData).toContainEqual(character);
          });
        });
  });
});
