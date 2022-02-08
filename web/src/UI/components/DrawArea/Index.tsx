import { useEffect, useRef } from 'react';
import Drawer from './draw';
import './styles.scss';

const DrawArea = () => {
  const canvasRef = useRef<any>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const drawer = new Drawer(canvas);
    drawer.setDraw();
  }, []);

  return ( 
    <canvas 
      id="draw-area" 
      draggable="false" 
      ref={ canvasRef }
    />
  ); 
};

export default DrawArea;
