import { Socket } from "socket.io";
import Jwt from '../../externals/jwt';

type linePosition = { x:number, y:number, stopDraw?:boolean };

interface data {
  draw:draw;
  token:string;
}

interface draw {
  line:linePosition[];
}

function onDrawing(socket:Socket, data:data) {
  const tokenData = validateToken(data.token);
  if(!tokenData) return;
  emitDraw(socket, tokenData.id, data.draw);
}

function validateToken(token:string) {
  try {
    const jwt = new Jwt(process.env.JWT_TO_DRAW!);
    const tokenData = jwt.validate(token);
    return tokenData;
  }
  catch {
    return false;
  }
}

function emitDraw(socket:Socket, roomId:string, draw:draw) {
  socket.broadcast.to(roomId).emit("draw", draw);
}

export default onDrawing;