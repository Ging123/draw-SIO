import { createPortal } from "react-dom";
import "./style.scss";

interface props {
  background?:string;
  onClick?:() => void;
}

const Modal = (props:props) => {
  return createPortal (
    <div 
      className="modal" 
      onClick={ props.onClick }
      style={{ background:props.background }}
    />
  ,
  document.getElementById('modal')!
  );
}

export default Modal