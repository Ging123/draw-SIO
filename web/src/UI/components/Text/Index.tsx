interface props {
  className?:string;
  color?:string;
  content?:string;
  fontSize?:string;
  fontWeight?:number;
  margin?:string;
  onClick?:() => void;
  textAlign?:'center'|'left'|'right';
}

const Text = (props:props) => {
  const styles = {
    color:props.color,
    fontSize:props.fontSize || '16px',
    fontWeight:props.fontWeight,
    margin:props.margin,
    textAlign:props.textAlign
  }

  return (
    <div className={ props.className } onClick={ props.onClick } style={styles}>
      { props.content }
    </div>
  );
};

export default Text;