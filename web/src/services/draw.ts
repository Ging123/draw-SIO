import { Socket } from "socket.io-client";
import LocalStorage from "./localstorage";

interface draw {
  background?:string;
  lineWidth:number;
  stopDraw:boolean;
  strokeStyle:string;
  mouseX:number;
  mouseY:number;
  reset:boolean;
}

class Drawer {

  private readonly localstorage = new LocalStorage();
  private canvas:any;
  private isDrawing = false;
  private ctx:CanvasRenderingContext2D;
  private socket:Socket;
  private drewData:draw[] = [];
  public lineCap:CanvasLineCap = 'round';
  public strokeStyle = 'black';
  public lineWidth = this.localstorage.get("pencil-size") || 5;


  constructor(socket:Socket) {
    this.canvas = document.getElementsByTagName('canvas')[0];
    this.socket = socket;
    this.ctx = this.canvas.getContext('2d');
  }


  private startDraw() {
    this.isDrawing = true;
  }


  private endDraw() {
    this.isDrawing = false;
    this.ctx.beginPath();
    const draw = this.drawData(0, 0, true);

    this.drewData.push(draw);
    this.socket.emit("drawing", [draw]);
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

    this.emitDraw(e.clientX, e.clientY);
  }


  private emitDraw(mouseX:number, mouseY:number) {
    const drawData = this.drawData(mouseX, mouseY);
    this.drewData.push(drawData);
    this.socket.emit("drawing", [drawData]);
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
  

  public drawOnCavas(drawData:draw[]) {
    for(const draw of drawData) {
      this.drawTheDrawSent(draw);
    }
  }


  private drawTheDrawSent(draw:draw) {
    if(draw.reset) return this.reset(false);
    if(draw.stopDraw) return this.ctx.beginPath();
    if(draw.background) return this.canvas.style.background = draw.background;
    this.ctx.lineWidth = draw.lineWidth;

    this.ctx.lineCap = this.lineCap;
    this.ctx.strokeStyle = draw.strokeStyle;
    this.ctx.lineTo(draw.mouseX, draw.mouseY);
    
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(draw.mouseX, draw.mouseY);
  }


  public reset(mustEmitReset=true) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.background = "white";
    this.drewData = [];

    if(!mustEmitReset) return;
    const draw = this.drawData(0, 0, true, true);
    this.socket.emit("drawing", [draw]);
  }


  public fillBackground(color="white") {
    this.canvas.style.background = color;

    const draw = this.drawData(0, 0, false, false, color);
    this.drewData.push(draw);
    this.socket.emit("drawing", [draw]);
  }


  private drawData(mouseX:number, mouseY:number, stopDraw=false, reset=false, 
  background?:string):draw {
    return {
      background:background,
      lineWidth:this.lineWidth,
      stopDraw:stopDraw,
      strokeStyle:this.strokeStyle,
      mouseX:mouseX,
      mouseY:mouseY,
      reset:reset
    }
  }

  public emitAllDraw() {
    this.socket.emit("drawing", this.drewData);
  }
}
  
export default Drawer;