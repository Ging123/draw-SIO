import { DefaultEventsMap } from "socket.io/dist/typed-events";
import socketAuth from "./src/middlewares/socketAuth";
import { Server, Socket } from "socket.io";
import onDrawing from "./src/events/draw/onDrawing";
import JoinRoomEvent from "./src/events/room/onJoin";
import OnGuessEvent from "./src/events/guess/onSend";
import OnDisconnectEvent from "./src/events/room/onDisconnect";

export type io = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>; 
export type socket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

module.exports = (io:io) => {
  io.use(socketAuth);

  io.sockets.on('connection', (socket) => {
    socket.on('connect_to_a_room', async () => {
      const event = new JoinRoomEvent(socket, io);
      await event.onJoin()
    });
    
    socket.on('guess', async (guess) => {
      const event = new OnGuessEvent(socket, io);
      await event.onSendGuess(guess);
    });

    socket.on('drawing', async (canvas) => onDrawing(socket, canvas));

    socket.on('disconnect', async () => {
      const event = new OnDisconnectEvent(socket);
      await event.onDisconnect();
    });
  });
}; 