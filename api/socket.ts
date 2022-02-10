import { DefaultEventsMap } from "socket.io/dist/typed-events";
import socketAuth from "./src/middlewares/socketAuth";
import { Server } from "socket.io";

type socket = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>; 

module.exports = (io:socket) => {
  io.use(socketAuth);

  io.sockets.on('connection', (socket) => {
    
  });
}; 