import { Socket } from "socket.io";

function onDrawing(socket:Socket, canvas:any) {
  if(!socket.data.isDrawing) return;
}

export default onDrawing;