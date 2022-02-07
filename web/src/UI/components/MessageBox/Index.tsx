import { createPortal } from 'react-dom';
import './styles.scss';

interface props {
  background?:string;
  color?:string;
  content?:string;
}

const MessageBox = (props:props) => {
  const styles = { background:props.background, color:props.color }

  return (
    createPortal(
      <div className="message-box" style={ styles }>
        { props.content }
      </div>, 
      document.getElementById('message-box')!
    )
  );
};

export default MessageBox;