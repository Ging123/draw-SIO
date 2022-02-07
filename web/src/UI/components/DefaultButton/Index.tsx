import './styles.scss';

interface props {
  className?:string;
  content?:string;
  loading?:boolean;
  type?:'button'|'reset'|'submit';
  margin?:string;
  onClick?:() => void;
}

const DefaultButton = (props:props) => {
  const styles = { margin:props.margin }
  const loadingClass = `${props.loading ? 'loading':'not-loading'}`;
  const userClass = `${props.className || ''}`;
  const classes = `default-button ${loadingClass} ${userClass}`;
  const content = props.loading ? 'Carregando' : props.content;

  return (
    <button 
      className={ classes } 
      disabled={ props.loading }
      type={ props.type } 
      style={ styles } 
      onClick={ props.onClick }>
      { content }
    </button>
  );
};

export default DefaultButton;
