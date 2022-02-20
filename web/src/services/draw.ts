class Drawer {

  private canvas:any;
  private isDrawing = false;
  private ctx:CanvasRenderingContext2D;
  public lineCap:CanvasLineCap = 'round';
  public lineWidth = 10;

  constructor(canvas:any) {
    this.canvas = canvas;
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
  }

  private draw(e:MouseEvent) {
    const mouse = this.getMousePosition(e);
    if(!this.isDrawing) return;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = this.lineCap;
    this.ctx.lineTo(mouse.x, mouse.y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(mouse.x, mouse.y);
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
}

export default Drawer;