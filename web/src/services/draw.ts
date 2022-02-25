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
  public strokeStyle = 'black';
  public lineWidth = 10;
  private lineDrawed:linePosition[] = [];
  private localstorage = new LocalStorage();

  constructor(socket:Socket, tokenToDraw='') {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.socket = socket;
    this.tokenToDraw = tokenToDraw;
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

    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = this.lineCap;
    this.ctx.strokeStyle = this.strokeStyle;

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

  public removeDrawEvents() {
    let cloneOfCanvas = this.canvas.cloneNode();
    const ctx = cloneOfCanvas.getContext('2d');
    ctx.drawImage(this.canvas, 0, 0);
    this.canvas.after(cloneOfCanvas);
    this.canvas.remove();
    this.canvas = cloneOfCanvas;
    this.ctx = ctx;
  }

  private getMousePosition(e:MouseEvent) {
    const container = document.getElementById('draw-area-wrapper')!;
    const currentSize = window.innerWidth;
    const sideMargins = currentSize > 1250 ? 15 : 0;

    return {
      x:e.clientX - (container.offsetLeft + sideMargins),
      y:e.clientY - container.offsetTop
    }
  }
  
  public drawOnCavas(draw:draw) {
    let lastDrawedIndex = this.getLastDrawedIndex();
    for(let i = lastDrawedIndex; i < draw.line.length; i++) {
      const line = draw.line[i];
      const mustStopDrawLine = line.stopDraw;
      
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