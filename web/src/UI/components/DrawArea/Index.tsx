import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import Drawer from '../../../services/draw';
import LocalStorage from '../../../services/localstorage';
import Wrapper from '../Wrapper/Index';
import setCanvasSize from './setCanvasSize';
import { FaPaintBrush } from 'react-icons/fa';
import './styles.scss';
import DrawOptions from '../DrawOptions/Index';
import Timer from './timer';

interface props {
  socket:Socket;
}

export interface drawTime {
  token:string;
  answer:string;
}

const DrawArea = (props:props) => {
  const localstroage = new LocalStorage();
  const [ answer, setAnswer ] = useState("");
  const [ drawOptionIsOpen, setDrawOptionVisibility ] = useState(false);

  useEffect(() => {
    localstroage.remove("lastDrawedIndex");

    props.socket.on("draw_time", () => {
      const drawer = new Drawer(props.socket);
      drawer.setDraw();
    });

    const botDrawer = new Drawer(props.socket);
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    props.socket.on("draw", (draw) => {
      botDrawer.drawOnCavas(draw);
    });

    props.socket.on("draw_time", (data) => {
      setAnswer(data.answer);
      
      setTimeout(() => {
        const answerBox = document.getElementsByClassName('answer-box')[0];
        if(answerBox) setAnswer("");
      }, 5000);
    });

    props.socket.on('round_start', (timeThatRoundWasStarted) => {
      const timer = new Timer();
      timer.startCountRoundTime(timeThatRoundWasStarted);
    });

    props.socket.on('you_has_join_a_room', (round) => {
      const timer = new Timer();
      const timeThatRoundStart = round.timeThatRoundStart;
      timer.startCountRoundTime(timeThatRoundStart);
    });

    props.socket.on('new_round_start', (data) => {
      const roundStartTime = data.roundStartTime;
      const timer = new Timer();
      timer.startCountRoundTime(roundStartTime);
    });

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    }
  }, []);

  return ( 
    <Wrapper id="draw-area-wrapper" position="relative">
      <canvas 
        id="draw-area" 
        draggable="false" 
      />
      {answer && 
        <div className="answer-box">{ answer }</div>  
      }
      <div 
        className="draw-options-button" 
        onClick={() => setDrawOptionVisibility(true)}
        title="Ferramentas"
      >
        <FaPaintBrush className='icone' />
      </div>
      <div className="timer">...</div>
      {drawOptionIsOpen && 
        <DrawOptions 
          close={() => setDrawOptionVisibility(false)}
          socket={ props.socket }
        />
      }
    </Wrapper>
  ); 
};

export default DrawArea;