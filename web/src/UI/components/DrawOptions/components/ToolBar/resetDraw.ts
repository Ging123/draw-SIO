import Drawer from "../../../../../services/draw";
import { Socket } from "socket.io-client";

function resetDraw(socket:Socket) {
  new Drawer(socket).reset();
}

export default resetDraw;