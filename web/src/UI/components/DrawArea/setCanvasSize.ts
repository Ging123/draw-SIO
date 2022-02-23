export default function setCanvasSize() {
  const currentWindowsWidth = window.innerWidth;
  if(currentWindowsWidth > 1250) return setDefaultSizeForCanvas();
  setMobileSizeForCanvas();
}

function setDefaultSizeForCanvas() {
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 700;
  canvas.height = 500;
}

function setMobileSizeForCanvas() {
  const canvas = document.getElementsByTagName('canvas')[0];
  const sixPercentOfHeightPage = window.innerHeight * 0.6;
  canvas.width = window.innerWidth;
  canvas.height = sixPercentOfHeightPage;
}