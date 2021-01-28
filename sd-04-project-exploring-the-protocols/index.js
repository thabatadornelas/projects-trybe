const net = require('net');
const os = require('os');

const { getLocationInfos } = require('./location');

const getHeaderValue = (data, header) => {
  const headerData = data
    .split('\r\n')
    .find((chunk) => chunk.startsWith(header));

  return headerData.split(': ').pop();
};

const startOfResponse = 'HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n';

const endOfResponse = '\r\n\r\n';

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const clientIP = getHeaderValue(data.toString(), 'X-Forwarded-For');
    const device = getHeaderValue(data.toString(), 'User-Agent');

    getLocationInfos(clientIP, ({
      city, postal_code: code, region, region_name: regionName, country_name: country, company,
    }) => {
      socket.write(startOfResponse);
      socket.write('<html><head><meta http-equiv="content-type" content="text/html;charset=utf-8">');
      socket.write('<title>Trybe 🚀</title></head><body>');
      socket.write('<H1>Explorando os Protocolos 🧐🔎</H1>');
      socket.write(`<h5 data-testid="device">${device}</h5>`);
      socket.write(`<h5 data-testid="ip">${clientIP}</h5>`);
      socket.write(`<h5 data-testid="city">${city}</h5>`);
      socket.write(`<h5 data-testid="postal_code">${code}</h5>`);
      socket.write(`<h5 data-testid="region">${regionName}, ${region}</h5>`);
      socket.write(`<h5 data-testid="country">${country}</h5>`);
      socket.write(`<h5 data-testid="company">${company}</h5>`);
      socket.write(`<h5 data-testid="arch">${os.platform()} - ${os.arch()} - ${os.release()}</h5>`);
      socket.write(`<h5 data-testid="cpu">${os.cpus()}</h5>`);
      socket.write(`<h5 data-testid="memory">${os.totalmem() / (1024 ** 3)}</h5>`);
      socket.write('<iframe src="https://giphy.com/embed/l3q2zVr6cu95nF6O4" width="480" height="236" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
      socket.write('</body></html>');
      socket.write(endOfResponse);
    });
  });
});

server.listen(8080);
