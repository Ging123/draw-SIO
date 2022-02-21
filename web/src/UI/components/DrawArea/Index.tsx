import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import Drawer from '../../../services/draw';
import LocalStorage from '../../../services/localstorage';
import './styles.scss';

interface props {
  socket:Socket;
}

export interface drawTime {
  token:string;
  answer:string;
}

const DrawArea = (props:props) => {
  const canvasRef = useRef<any>();
  const localstroage = new LocalStorage();

  useEffect(() => {
    localstroage.remove("lastDrawedIndex");
    const canvas = canvasRef.current;

    props.socket.on("draw_time", (data:drawTime) => {
      const tokenToDraw = data.token;
      const drawer = new Drawer(canvas, props.socket, tokenToDraw);
      drawer.setDraw();
    });

  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const botDrawer = new Drawer(canvas, props.socket);

    props.socket.on("draw", (draw) => {
      botDrawer.drawOnCavas(draw);
    });
  }, [canvasRef])

  return ( 
    <canvas 
      id="draw-area" 
      draggable="false" 
      ref={ canvasRef }
    />
  ); 
};

export default DrawArea;
