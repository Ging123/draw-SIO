import { Socket } from "socket.io-client";
import Drawer from "../../../../../services/draw";

function createColor(color:string, index:number, socket:Socket) {
  return (
    <div 
      className="color-container"
      onClick={() => changeDrawColor(color, socket)}
      style={{ background:color }}
      key={ index } 
    />
  );
}

function changeDrawColor(color:string, socket:Socket) {
  const draw = new Drawer(socket);
  draw.strokeStyle = color;
  draw.removeDrawEvents();
  draw.setDraw();
}

export default createColor;