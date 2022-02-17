import { DefaultEventsMap } from "socket.io/dist/typed-events";
import socketAuth from "./src/middlewares/socketAuth";
import joinARoom from "./src/events/room/join";
import { Server, Socket } from "socket.io";

export type io = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>; 
export type socket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

module.exports = (io:io) => {
  io.use(socketAuth);

  io.sockets.on('connection', (socket) => {
    socket.on('connect_to_a_room', async () => await joinARoom(socket));
  });
}; 