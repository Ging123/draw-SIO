export default function setCanvasSize() {
  const currentWindowsWidth = window.innerWidth;
  if(currentWindowsWidth > 1250) return setDefaultSizeForCanvas();
  setMobileSizeForCanvas();
}

function setDefaultSizeForCanvas() {
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = window.innerWidth * 0.5;
  canvas.height = window.innerHeight * 0.99;
}

function setMobileSizeForCanvas() {
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.6;
}