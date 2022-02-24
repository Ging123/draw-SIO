import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import Drawer from '../../../services/draw';
import LocalStorage from '../../../services/localstorage';
import Wrapper from '../Wrapper/Index';
import setCanvasSize from './setCanvasSize';
import { FaPaintBrush } from 'react-icons/fa';
import './styles.scss';
import DrawOptions from '../DrawOptions/Index';

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
  const [ answer, setAnswer ] = useState("");
  const [ drawOptionIsOpen, setDrawOptionVisibility ] = useState(false);

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
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    props.socket.on("draw", (draw) => {
      botDrawer.drawOnCavas(draw);
    });

    props.socket.on("draw_time", (data:drawTime) => {
      setAnswer(data.answer);
      setTimeout(() => {
        const answerBox = document.getElementsByClassName('answer-box')[0];
        if(answerBox) setAnswer("");
      }, 5000);
      document.title = `Você deve desenhar: ${data.answer}`;
    });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    }
  }, [canvasRef])

  return ( 
    <Wrapper id="draw-area-wrapper" position="relative">
      <canvas 
        id="draw-area" 
        draggable="false" 
        ref={ canvasRef }
      />
      {answer && 
        <div className="answer-box">{ answer }</div>  
      }
      <div 
        className="draw-options-button" 
        onClick={() => setDrawOptionVisibility(true)}
      >
        <FaPaintBrush className='icone' />
      </div>
      {drawOptionIsOpen && 
        <DrawOptions close={() => setDrawOptionVisibility(false)}/>
      }
    </Wrapper>
  ); 
};

export default DrawArea;