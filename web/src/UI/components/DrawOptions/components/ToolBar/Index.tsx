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
      <FaPencilAlt className="icone" />
      <FaEraser className="icone" />
      <BsPaintBucket 
        className="icone"
        onClick={() => fillDrawBackground(props.socket, props.color)} 
      />
      <FaTrash 
        className="icone" 
        onClick={() => resetDraw(props.socket)} 
      />
    </div>
  )
}

export default ToolBar;