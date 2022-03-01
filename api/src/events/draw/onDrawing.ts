import { Socket } from "socket.io";

function onDrawing(socket:Socket, canvas:any) {
  const playerCanDraw = socket.data.isDrawing;
  const roomId = socket.data.roomId;

  if(!playerCanDraw) return;
  socket.broadcast.to(roomId).emit("draw", canvas);
}

export default onDrawing;