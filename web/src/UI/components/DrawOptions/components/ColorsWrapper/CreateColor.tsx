import { Socket } from "socket.io-client";
import Drawer from "../../../../../services/draw";
import LocalStorage from "../../../../../services/localstorage";

type setter = React.Dispatch<React.SetStateAction<string>>;

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
  const localstorage = new LocalStorage();
  draw.strokeStyle = color;
  draw.removeDrawEvents();
  draw.setDraw();
  localstorage.set("color", color);
  setColor(color);
}

export default createColor;