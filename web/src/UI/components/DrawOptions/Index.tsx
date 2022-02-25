import { useState } from "react";
import { Socket } from "socket.io-client";
import LocalStorage from "../../../services/localstorage";
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
  const localstorage = new LocalStorage()
  const defaultColor:string = localstorage.get('color') || "black";
  const [ color, setColor ] = useState(defaultColor);

  return (
    <div className="draw-option-wrapper">
      <ToolBar 
        color={ color }
        socket={ props.socket } 
      />
      <ColorsWrapper 
        setColor={ setColor }
        socket={ props.socket } 
      />
      <SizeWrapper 
        color={ color }
        socket={ props.socket }
      />
      <Modal 
        background={ "#0000009a" } 
        onClick={ props.close } 
      />
    </div>
  );
}

export default DrawOptions;