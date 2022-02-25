import { Socket } from 'socket.io-client';
import createColor from './CreateColor';
import "./styles.scss";

interface props {
  setColor:(color:string) => void;
  socket:Socket;
}

const ColorsWrapper = (props:props) => {
  const socket = props.socket;
  const color = ["red", "yellow", "black", "green", "pink", "purple", "gray", 
  "blue", "white", "cyan", "orange", "lightBlue", "lightGreen", "olive", "brown",
  "khaki", "springgreen", "thistle", "teal", "navy", "lime", "hotpink", "gold", 
  "gainsboro", "darkslategray", "aquamarine", "bisque"];

  return (
    <div className="colors-wrapper">
      { color.map((color, index) => createColor(color, index, socket, props.setColor)) }
    </div>
  );
}

export default ColorsWrapper;