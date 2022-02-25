import { Socket } from "socket.io-client";
import Drawer from "../../../../../services/draw";
import LocalStorage from "../../../../../services/localstorage";

type setter = React.Dispatch<React.SetStateAction<number>>;
type event = React.ChangeEvent<HTMLInputElement>;

class Size {

  private readonly localstorage = new LocalStorage();
  private socket:Socket;

  constructor(socket:Socket) {
    this.socket = socket;
  }

  public get(key:'pencil-size') {
    const size:number = this.localstorage.get(key);
    if(!size) return 5;
    return size;
  }

  public setPencilSize(setSize:setter, e:event, color:string) {
    const size = parseInt(e.target.value);
    const draw = new Drawer(this.socket);

    this.localstorage.set('pencil-size', size);
    draw.removeDrawEvents();
    draw.lineWidth = size;
    draw.strokeStyle = color;
    draw.setDraw();

    setSize(size);
  }
}

export default Size;