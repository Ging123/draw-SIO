import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Server } from "socket.io";
import joinMatch from "./src/events/joinMatch";

type socket = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>; 

module.exports = (io:socket) => {
  io.sockets.on('connection', (socket) => {
    
    socket.on('join_match', async (data:any) => await joinMatch(data, socket));
  });
}; 