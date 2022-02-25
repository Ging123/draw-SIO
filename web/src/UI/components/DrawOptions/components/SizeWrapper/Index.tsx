import { Socket } from "socket.io-client";
import { useState } from "react";
import Size from "./size";
import "./styles.scss";

interface props {
  color:string;
  socket:Socket;
} 

const SizeWrapper = (props:props) => {
  const size = new Size(props.socket);
  const [ pencilSize, setPencilSize ] = useState(size.get('pencil-size'));

  return (
    <div className="size-wrapper">
      <b>Lapiz</b>
      <input 
        max={ 20 }
        min={ 1 }
        onChange={(e) => size.setPencilSize(setPencilSize, e, props.color)}
        style={{ width:"100%" }}
        type="range" 
        value={ pencilSize }
      />
    </div>
  );
}

export default SizeWrapper;