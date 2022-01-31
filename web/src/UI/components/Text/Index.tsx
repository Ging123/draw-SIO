interface props {
  color?:string;
  content?:string;
  fontSize?:string;
  fontWeight?:number;
  margin?:string;
  onClick?:() => void;
}

const Text = (props:props) => {
  const styles = {
    color:props.color,
    fontSize:props.fontSize || '16px',
    fontWeight:props.fontWeight,
    margin:props.margin
  }

  return (
    <div onClick={ props.onClick } style={styles}>
      { props.content }
    </div>
  );
};

export default Text;