const puppeteer = require('puppeteer');
var execTerminal = require('child_process').exec, child;

const BASE_URL = 'http://localhost:8085';

function wait(time) {
  const start = Date.now();
  while (true) {
    if (Date.now() - start >= time) {
      return true;
    }
  }
}

describe('Criar um server TCP utilizando o módulo net capaz de responder com uma mensagem HTTP', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'], headless: true });
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  it('Será validado que ao fazer a request e acessar a url irá mostrar o texto "Protocolos"', async () => {
    var execNode = execTerminal('node exploiters/httpServer.js');
    execNode.stdout.on('data', ()=>{ });

    wait(2000);

    await page.goto(BASE_URL);

    const text =  await page.$$eval('h1', (nodes) => nodes.map((n) => n.innerText));
    expect(text).toContain('Protocolos');

    execNode.kill();
  });
});
