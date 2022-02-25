import Drawer from "../../../../../services/draw";
import { Socket } from "socket.io-client";

function fillDrawBackground(socket:Socket, color:string) {
  const draw = new Drawer(socket);
  draw.fillBackground(color);
}

export default fillDrawBackground;