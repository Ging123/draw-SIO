import { useState } from "react";
import { Socket } from "socket.io-client";
import Modal from "../Modal/Index";
import ColorsWrapper from "./components/ColorsWrapper/Index";
import SizeWrapper from "./components/SizeWrapper/Index";
import ToolBar from "./components/ToolBar/Index";
import "./styles.scss";

interface props {
  close:() => void;
  socket:Socket;
}

const DrawOptions = (props:props) => {
  const [ color, setColor ] = useState("");

  return (
    <div className="draw-option-wrapper">
      <ToolBar 
        color={ color }
        socket={ props.socket } 
      />
      <ColorsWrapper 
        setColor={(selectedColor:string) => setColor(selectedColor)}
        socket={ props.socket } 
      />
      <SizeWrapper />
      <Modal 
        background={ "#0000009a" } 
        onClick={ props.close } 
      />
    </div>
  );
}

export default DrawOptions;