import { DefaultEventsMap } from "socket.io/dist/typed-events";
import disconectFromRoom from './src/events/room/disconnect';
import socketAuth from "./src/middlewares/socketAuth";
import sendGuess from "./src/events/guess/send";
import joinARoom from "./src/events/room/join";
import { Server, Socket } from "socket.io";
import onRoundEnd from "./src/events/round/onRoundEnd";

export type io = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>; 
export type socket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

var roomId:string;
var whoIsDrawing:string;

module.exports = (io:io) => {
  io.use(socketAuth);

  io.sockets.on('connection', (socket) => {
    socket.on('connect_to_a_room', async () => roomId = await joinARoom(socket, io));
    
    socket.on('guess', async (guess) => await sendGuess(socket, roomId, guess));

    socket.on('round_end', async () => await onRoundEnd(socket, roomId, io));

    socket.on('disconnect', async () => await disconectFromRoom(socket, roomId));
  });
}; 