const http = require('http');
const sockjs = require('sockjs');
const crypto = require('crypto');

const wss = sockjs.createServer();
const clients = new Map();

wss.on('connection', (ws) => {
  const id = crypto.randomUUID();
  const color = Math.floor(Math.random() * 360);
  const metadata = { id, color };

  clients.set(ws, metadata);

  ws.on('data', (messageAsString) => {
    const message = JSON.parse(messageAsString);
    const metadata = clients.get(ws);

    message.sender = metadata.id;
    message.color = metadata.color;

    const outbound = JSON.stringify(message);

    [...clients.keys()].forEach((client) => {
      client.write(outbound);
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

const server = http.createServer();
wss.installHandlers(server, { prefix: '/cursor' });
server.listen(7171, '0.0.0.0');
