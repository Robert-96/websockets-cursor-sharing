const WebSocket = require('ws');
const crypto = require('crypto');

const wss = new WebSocket.Server({ port: 7071 });
const clients = new Map();

wss.on('connection', (ws) => {
  const id = crypto.randomUUID();
  const color = Math.floor(Math.random() * 360);
  const metadata = { id, color };

  clients.set(ws, metadata);

  ws.on('message', (messageAsString) => {
    const message = JSON.parse(messageAsString);
    const metadata = clients.get(ws);

    message.sender = metadata.id;
    message.color = metadata.color;

    const outbound = JSON.stringify(message);

    [...clients.keys()].forEach((client) => {
      client.send(outbound);
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});
