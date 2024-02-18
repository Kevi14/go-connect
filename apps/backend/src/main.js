import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';
import cors from 'cors';
import { clipboardRouter } from './clipboard'; // Assume this is a separate router module for clipboard
import { setupSocketHandlers } from './sockets'; // Assume this sets up all your socket event handlers

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use('/clipboard', clipboardRouter); // Use the separate router module for clipboard routes

const server = http.createServer(app);
const io = new SocketIoServer(server, { cors: { origin: '*' }});

setupSocketHandlers(io); // Set up all socket.io event handlers in a separate module

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
