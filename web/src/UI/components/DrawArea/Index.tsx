import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import Drawer from '../../../services/draw';
import './styles.scss';

interface props {
  socket:Socket;
}

const DrawArea = (props:props) => {
  const canvasRef = useRef<any>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const drawer = new Drawer(canvas);

    props.socket.on("draw_time", () => {
      drawer.setDraw();
    });
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
