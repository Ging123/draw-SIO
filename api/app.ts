require('dotenv').config();
import connectToMoongo from './src/configs/moongose';
import Cache from './src/externals/cache';
import bodyParser from 'body-parser';
import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = process.env.SERVER_PORT! || 8000;
const server = createServer(app);
const io = new Server(server);
const cache = new Cache();

require('./socket')(io);
 
app.use(cors({ 
  origin:process.env.CLIENT_URL!,
  credentials:true
}));
app.use(bodyParser.json());
app.use(routes);

!(async function config() {
  try {
    const message = `The server start in the port ${port}`;
    await connectToMoongo();
    await cache.connect();
    await cache.deleteAll();
    await cache.quit();
    server.listen(port, () => console.log(message));
  }
  catch(err:unknown) {
    console.log(err);
  }
})(); 