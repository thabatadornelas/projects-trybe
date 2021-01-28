const net = require('net');

const RESPONSE = `${['HTTP/1.1 200 OK',
  'Location: http://www.google.com/',
  'Content-Type: text/html; charset=UTF-8',
  '',
  '<H1>Protocolos</H1>'].join('\r\n')}\r\n\r\n`;

const server = net.createServer((socket) => {
  socket.write(RESPONSE);
  socket.on('data', (data) => console.log(data.toString()));
  socket.end();
});

const PORT = 8085;

server.listen(PORT, () => console.log(`Escutando a porta ${PORT}`));
