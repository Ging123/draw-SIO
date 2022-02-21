import { Socket } from "socket.io-client";
import LocalStorage from "./localstorage";

type linePosition = { x:number, y:number, stopDraw?:boolean };

interface draw {
  line:linePosition[];
}

class Drawer {

  private canvas:any;
  private isDrawing = false;
  private ctx:CanvasRenderingContext2D;
  private socket:Socket;
  public tokenToDraw:string;
  public lineCap:CanvasLineCap = 'round';
  public lineWidth = 10;
  private lineDrawed:linePosition[] = [];
  private localstorage = new LocalStorage();

  constructor(canvas:any, socket:Socket, tokenToDraw='') {
    this.canvas = canvas;
    this.socket = socket;
    this.tokenToDraw = tokenToDraw;
    this.canvas.width = 700;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d');
  }

  private startDraw() {
    this.isDrawing = true;
  }

  private endDraw() {
    this.isDrawing = false;
    this.ctx.beginPath();

    const linePositions = { x:0, y:0, stopDraw:true };
    const draw = this.drawDataToEmit(linePositions);
    const data = { draw:draw, token:this.tokenToDraw };

    this.socket.emit("drawing", data);
  }

  private draw(e:MouseEvent) {
    const mouse = this.getMousePosition(e);
    if(!this.isDrawing) return;
    if(!this.tokenToDraw) return;

    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = this.lineCap;
    this.ctx.lineTo(mouse.x, mouse.y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(mouse.x, mouse.y);

    const linePositions = { x:mouse.x, y:mouse.y };
    const draw = this.drawDataToEmit(linePositions);
    const data = { draw:draw, token:this.tokenToDraw };

    this.socket.emit("drawing", data);
  }

  private drawDataToEmit(linePosition:linePosition):draw {
    this.lineDrawed.push(linePosition);

    return {
      line:this.lineDrawed
    }
  }

  public setDraw() {
    this.canvas.addEventListener('mousedown', () => this.startDraw());
    this.canvas.addEventListener('mouseup', () => this.endDraw());
    this.canvas.addEventListener('mousemove', (e:MouseEvent) => this.draw(e));
  }

  private getMousePosition(e:MouseEvent) {
    return {
      x:e.clientX - this.canvas.offsetLeft,
      y:e.clientY - this.canvas.offsetTop
    }
  }
  
  public drawOnCavas(draw:draw) {
    let lastDrawedIndex = this.getLastDrawedIndex();
    for(let i = lastDrawedIndex; i < draw.line.length; i++) {
      const line = draw.line[i];
      const mustStopDrawLine = line.stopDraw;
      console.log(line)
      if(!mustStopDrawLine) {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = this.lineCap;
        this.ctx.lineTo(line.x, line.y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(line.x, line.y);
      }
      else {
        this.ctx.beginPath();
      }
    }
    lastDrawedIndex = draw.line.length - 1;
    this.setLastDrawedIndex(lastDrawedIndex);
  }

  private getLastDrawedIndex() {
    const lastDrawedIndex = this.localstorage.get("lastDrawedIndex");
    if(!lastDrawedIndex) return 0;
    return lastDrawedIndex;
  }

  private setLastDrawedIndex(lastDrawedIndex:number) {
    this.localstorage.set("lastDrawedIndex", lastDrawedIndex);
  }
}

export default Drawer;