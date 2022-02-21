import { DefaultEventsMap } from "socket.io/dist/typed-events";
import onDisconnect from './src/events/room/onDisconnect';
import socketAuth from "./src/middlewares/socketAuth";
import onSendGuess from "./src/events/guess/send";
import onJoin from "./src/events/room/onJoin";
import { Server, Socket } from "socket.io";
import onRoundEnd from "./src/events/round/onRoundEnd";
import onDrawing from "./src/events/draw/onDrawing";

export type io = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>; 
export type socket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

module.exports = (io:io) => {
  io.use(socketAuth);

  io.sockets.on('connection', (socket) => {
    socket.on('connect_to_a_room', async () => await onJoin(socket, io));
    
    socket.on('guess', async (guess) => await onSendGuess(socket, guess));

    socket.on('round_end', async () => await onRoundEnd(socket, io));

    socket.on('drawing', async (data) => await  onDrawing(socket, data));

    socket.on('disconnect', async () => await onDisconnect(socket));
  });
}; 