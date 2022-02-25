import { Socket } from "socket.io-client";
import Drawer from "../../../../../services/draw";

type setter = (color: string) => void;

function createColor(color:string, index:number, socket:Socket, setColor:setter) {
  return (
    <div 
      className="color-container"
      onClick={() => changeDrawColor(color, socket, setColor)}
      style={{ background:color }}
      key={ index } 
    />
  );
}

function changeDrawColor(color:string, socket:Socket, setColor:setter) {
  const draw = new Drawer(socket);
  draw.strokeStyle = color;
  draw.removeDrawEvents();
  draw.setDraw();
  setColor(color);
}

export default createColor;