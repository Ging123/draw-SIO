import { Socket } from "socket.io-client";
import LocalStorage from "./localstorage";

class Drawer {

  private readonly localstorage = new LocalStorage();
  private canvas:any;
  private isDrawing = false;
  private ctx:CanvasRenderingContext2D;
  private socket:Socket;
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
    this.socket.emit("drawing", this.canvas);
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

    console.log(this.canvas)
    this.socket.emit("drawing",  'canvas');
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
  
  public drawOnCavas(canvas:any) {
    console.log('oi')
    this.ctx.drawImage(canvas, 0, 0);
  }

  public reset() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.background = "white";
  }

  public fillBackground(color="white") {
    this.canvas.style.background = color;
  }
}

export default Drawer;