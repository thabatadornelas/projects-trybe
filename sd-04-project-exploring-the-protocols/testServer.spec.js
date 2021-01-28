const fs = require('fs');
const puppeteer = require('puppeteer');
const ngrok = require('ngrok');
var execTerminal = require('child_process').exec, child;

const BASE_URL = 'http://localhost:4040/inspect/http';

function dataTestid(name) {
  return `[data-testid=${name}]`;
}

function wait(time) {
    const start = Date.now();
    while (true) {
      if (Date.now() - start >= time) {
        return true;
      }
    }
  }

describe('Criar um túnel através do Ngrok', () => {
  it('Será validado se os comandos estão dentro do arquivo instruction.json', async () => {
    const instruction = fs.readFileSync('./instruction.json', 'utf8');
    const instructionJson = JSON.parse(instruction.toString());
    expect(instructionJson.linkSetup).toContain('https://dashboard.ngrok.com/get-started/setup');
    expect(instructionJson.commandExtractNgrok).toContain('unzip /path/to/ngrok.zip');
    expect(instructionJson.commandoToken).toContain('./ngrok authtoken');
    expect(instructionJson.token).not.toBeNull();
    expect(instructionJson.installNgrokPackage).toContain('npm install ngrok');
    expect(instructionJson.commandStart).toContain('ngrok http https://localhost:8080/');
    expect(instructionJson.commandNgrok).toContain('/ngrok http 8080');
  });
});

describe('Configurar uma chamada HTTPS à API `iplocation`', () => {
  it('Será validado que foi configurada a chamada do `iplocation`', async () => {
    const location = fs.readFileSync('./src/location.js', 'utf8');
    const locationString = location.toString();
    expect(locationString).toContain("hostname: 'iplocation.com'");
    expect(locationString).toContain("port: 443");
    expect(locationString).toContain("path: '/'");
    expect(locationString).toContain("method: 'POST'");
    expect(locationString).toContain("'Content-Type': 'application/x-www-form-urlencoded'");
  });
});

describe('Adicionar a estrutura de início de requisição HTTP', () => {
  it('Será validado que foi adicionado a estrutura da requisição no startOfResponse', async () => {
    const location = fs.readFileSync('./src/index.js', 'utf8');
    const locationString = location.toString();
    expect(locationString).toContain("HTTP/1.1 200 OK\\r\\nContent-Type: text/html; charset=UTF-8\\r\\n\\r\\n");
  });
});

describe('Adicionar a estrutura de fim da requisição HTTP', () => {
  it('Será validado que foi adicionado a estrutura da requisição no endOfResponse', async () => {
    const location = fs.readFileSync('./src/index.js', 'utf8');
    const locationString = location.toString();
    expect(locationString).toContain("\\r\\n\\r\\n");
  });
});

describe('Identificar o endereço de IP do client', () => {
  it('Será validado que foi adicionado o código para pegar endereço de IP', async () => {
    const location = fs.readFileSync('./src/index.js', 'utf8');
    const locationString = location.toString();
    expect(locationString).toContain("getHeaderValue(data.toString(), 'X-Forwarded-For');");
  });
});

describe('Configurar a request HTTPS para enviar o endereço IP', () => {
  it('Será validado que foi adicionado a request no arquivo location', async () => {
    const location = fs.readFileSync('./src/location.js', 'utf8');
    const locationString = location.toString();
    expect(locationString).toContain("req.write(`ip=${clientIP}`);");
  });
});

describe('Responder o IP do client', () => {
  it('Será validado que ao acessar a url sera possível visualizar o ip do client', async () => {
    const instructions = fs.readFileSync('./instruction.json', 'utf8');
    const instructionsString = JSON.parse(instructions.toString());
    await ngrok.authtoken(instructionsString.token);
    await ngrok.connect(8080);
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'], headless: true });
    page = await browser.newPage();

    const client = execTerminal('node src/index.js &');
    client.stdout.setEncoding('utf8');
    client.stdout.on('data', () => { });

    wait(2000);

    await page.goto(BASE_URL);
    await page.waitForSelector('a[target="_blank"]');
    const url =  await page.$$eval('a[target="_blank"]', (nodes) => nodes.map((n) => n.innerText));
  
    newPage = await browser.newPage();
    newPage.goto(url[1]);
    await newPage.waitForSelector(dataTestid('ip'));
    const textIp = await newPage.$$eval(dataTestid('ip'), (nodes) => nodes.map((n) => n.innerText));

    expect(textIp).not.toBeNull();

    await ngrok.kill(); 
    client.stdout.on('close', (data) => { data.kill(); });
    client.stdout.on('exit', (data) => { data.kill(); });
    });
});

describe('Responder informações extraídas através do IP do client', () => {
  it('Será validado que as informações da localização do cliente serão exibidas na tela', async () => {
    const instructions = fs.readFileSync('./instruction.json', 'utf8');
    const instructionsString = JSON.parse(instructions.toString());
    await ngrok.authtoken(instructionsString.token);
    await ngrok.connect(8080);
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'], headless: true });
    page = await browser.newPage();

    const client = execTerminal('node src/index.js &');
    client.stdout.setEncoding('utf8');
    client.stdout.on('data', () => { });

    wait(2000);

    await page.goto(BASE_URL);
    await page.waitForSelector('a[target="_blank"]');
    const url =  await page.$$eval('a[target="_blank"]', (nodes) => nodes.map((n) => n.innerText));

    newPage = await browser.newPage();
    newPage.goto(url[1]);
    await newPage.waitForSelector(dataTestid('city'));
    const textCity = await newPage.$$eval(dataTestid('city'), (nodes) => nodes.map((n) => n.innerText));
    await newPage.waitForSelector(dataTestid('postal_code'));
    const textPostaCode = await newPage.$$eval(dataTestid('postal_code'), (nodes) => nodes.map((n) => n.innerText));
    await newPage.waitForSelector(dataTestid('region'));
    const textRegion = await newPage.$$eval(dataTestid('region'), (nodes) => nodes.map((n) => n.innerText));
    await newPage.waitForSelector(dataTestid('country'));
    const textCountry = await newPage.$$eval(dataTestid('country'), (nodes) => nodes.map((n) => n.innerText));
    await newPage.waitForSelector(dataTestid('company'));
    const textCompany = await newPage.$$eval(dataTestid('company'), (nodes) => nodes.map((n) => n.innerText));

    expect(textCity).not.toBeNull();
    expect(textPostaCode).not.toBeNull();
    expect(textRegion).not.toBeNull();
    expect(textCountry).not.toBeNull();
    expect(textCompany).not.toBeNull();

    await ngrok.kill(); 
    client.stdout.on('close', (data) => { data.kill(); });
    client.stdout.on('exit', (data) => { data.kill(); });
  });
});

describe('Responder dados do dispositivo (client)', () => {
  it('Será validado se que ao acessar a tela listou os dados do dispositivo', async () => {
    const instructions = fs.readFileSync('./instruction.json', 'utf8');
    const instructionsString = JSON.parse(instructions.toString());
    await ngrok.authtoken(instructionsString.token);
    await ngrok.connect(8080);
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'], headless: true });
    page = await browser.newPage();

    const client = execTerminal('node src/index.js &');
    client.stdout.setEncoding('utf8');
    client.stdout.on('data', () => { });

    wait(2000);

    await page.goto(BASE_URL);
    await page.waitForSelector('a[target="_blank"]');
    const url =  await page.$$eval('a[target="_blank"]', (nodes) => nodes.map((n) => n.innerText));

    newPage = await browser.newPage();
    newPage.goto(url[1]);
    await newPage.waitForSelector(dataTestid('device'));
    const deviceText = await newPage.$$eval(dataTestid('device'), (nodes) => nodes.map((n) => n.innerText));

    expect(deviceText).not.toBeNull();

    await ngrok.kill(); 
    client.stdout.on('close', (data) => { data.kill(); });
    client.stdout.on('exit', (data) => { data.kill(); });
  });
});

describe('Responder a request com os resources do Server', () => {
  it('Validar se acessar o site vai listar as informações do sistema', async () => {
    const instructions = fs.readFileSync('./instruction.json', 'utf8');
    const instructionsString = JSON.parse(instructions.toString());
    await ngrok.authtoken(instructionsString.token);
    await ngrok.connect(8080);
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1920,1080'], headless: true });
    page = await browser.newPage();

    const client = execTerminal('node src/index.js &');
    client.stdout.setEncoding('utf8');
    client.stdout.on('data', () => { });

    wait(2000);

    await page.goto(BASE_URL);
    await page.waitForSelector('a[target="_blank"]');
    const url =  await page.$$eval('a[target="_blank"]', (nodes) => nodes.map((n) => n.innerText));

    newPage = await browser.newPage();
    newPage.goto(url[1]);
    await newPage.waitForSelector(dataTestid('arch'));
    const textArch = await newPage.$$eval(dataTestid('arch'), (nodes) => nodes.map((n) => n.innerText));
    await newPage.waitForSelector(dataTestid('cpu'));
    const textCpu = await newPage.$$eval(dataTestid('cpu'), (nodes) => nodes.map((n) => n.innerText));
    await newPage.waitForSelector(dataTestid('memory'));
    const textMemory = await newPage.$$eval(dataTestid('memory'), (nodes) => nodes.map((n) => n.innerText));

    expect(textArch).not.toBeNull();
    expect(textCpu).not.toBeNull();
    expect(textMemory).not.toBeNull();

    await ngrok.kill(); 
    client.stdout.on('close', (data) => { data.kill(); });
    client.stdout.on('exit', (data) => { data.kill(); });
  });
});
