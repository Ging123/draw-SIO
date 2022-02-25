import { FaPencilAlt, FaEraser, FaTrash } from "react-icons/fa";
import fillDrawBackground from "./fillDrawBackground";
import { BsPaintBucket } from "react-icons/bs";
import { Socket } from "socket.io-client";
import resetDraw from "./resetDraw";
import "./styles.scss";

interface props {
  color:string;
  socket:Socket;
}

const ToolBar = (props:props) => {
  return (
    <div className='tool-bar'>
      <BsPaintBucket 
        className="icone"
        onClick={() => fillDrawBackground(props.socket, props.color)}
        title="Pintar fundo" 
      />
      <FaTrash 
        className="icone" 
        onClick={() => resetDraw(props.socket)}
        title="Apagar desenho" 
      />
    </div>
  )
}

export default ToolBar;