import { Socket } from "socket.io";
import Cache from "../../externals/cache";
import { room } from "../../use_cases/room/base";

interface draw {
  background?:string;
  lineWidth:number;
  stopDraw:boolean;
  strokeStyle:string;
  mouseX:number;
  mouseY:number;
  reset:boolean;
}

class OnDrawEvent {

  private socket:Socket;
  private roomId:string;
  private player:string;
  private cache = new Cache();


  constructor(socket:Socket) {
    this.socket = socket;
    this.player = this.socket.data.username;
    this.roomId = this.socket.data.roomId;
  }


  public async onDraw(draw:draw[]) {
    if(!draw) return;
    if(draw.length <= 0) return;
    const drawIsValid = await this.drawIsValid(draw);
    if(!drawIsValid) return;
    this.socket.broadcast.to(this.roomId).emit("draw", draw);
  }


  private async drawIsValid(draw:draw[]) {
    const room = await this.getRoom();
    if(!room) return false;
    const playerIsDrawing = this.playerIsDrawing(room);

    if(!playerIsDrawing) return false;
    return this.backgroundColorIsValid(draw);
  }


  private playerIsDrawing(room:room) {
    return room.whoIsDrawing === this.player;
  }


  private async getRoom() {
    await this.cache.connect();
    const room = await this.cache.get(`room-${this.roomId}`);
    await this.cache.quit();
    return room;
  }


  private backgroundColorIsValid(drawData:draw[]) {
    const lastDraw = drawData.length - 1;
    const draw = drawData[lastDraw];
    if(!draw.background) return true;
    const validBackgroundColor = this.validBackgroundColors(); 

    for(const validColor of validBackgroundColor) {
      if(validColor === draw.background) return true;
    }
    return false;
  }


  private validBackgroundColors() {
    return [
      "red", "yellow", "black", "green", "pink", "purple", "gray", 
      "blue", "white", "cyan", "orange", "lightBlue", "lightGreen", "olive", 
      "brown","khaki", "springgreen", "thistle", "teal", "navy", "lime", 
      "hotpink", "gold", "gainsboro", "darkslategray", "aquamarine", "bisque"
    ];
  }
}

export default OnDrawEvent;