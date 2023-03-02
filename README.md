# websockets-cursor-sharing

> An interactive web application that shares cursor positions in real-time, created using WebSockets and Node.js.

This demo application is designed to generate a distinct colored cursor icon for each user who is connected to the application. As a user moves their mouse, their cursor icon moves on their own screen and on the screen of every other connected user. The movement of the cursor icon is updated in real-time as the user moves their mouse.

## How it's built?

* `/app` is the frontend application.
* `/server` is a WebSocket server.
* Web app connects to the WebSocket server.
* On connection, each client is assigned an id and a color.
* On mouse move, coordinate updates are sent to the server.
* The server adds the client's id and other metadata.
* The new coordinates are sent to all the clients.

## What's in here?

This repository consists of two variations of a demonstration application that leverages WebSockets to share cursor positions. The primary version uses [ws](https://www.npmjs.com/package/ws) on the `main` branch, whereas the `sockjs` branch utilizes [SockJS](https://www.npmjs.com/package/sockjs).

## Running this Demo

```bash
> npm install
> npm run start
```
