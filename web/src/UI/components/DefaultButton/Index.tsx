import './styles.scss';

interface props {
  content?:string;
  type?:'button'|'reset'|'submit';
  margin?:string;
  onClick?:() => void;
}

const DefaultButton = (props:props) => {
  const styles = { margin:props.margin }

  return (
    <button 
      className="default-button" 
      type={ props.type } 
      style={ styles } 
      onClick={props.onClick}>
      { props.content }
    </button>
  );
};

export default DefaultButton;
