interface props {
  alignItems?:'center'|'left'|'right';
  className?:string;
  children?:React.ReactNode;
  display?:'block'|'flex'|'inline'|'inline-block';
  flexDirection?:'column'|'row';
  height?:string;
  id?:string;
  justifyContent?:'center'|'left'|'right';
  padding?:string;
  position?:'absolute'|'fixed'|'relative';
  width?:string;
}

const Wrapper = (props:props) => {
  const styles = {
    alignItems:props.alignItems,
    display:props.display,
    flexDirection:props.flexDirection,
    height:props.height,
    justifyContent:props.justifyContent,
    padding:props.padding,
    position:props.position,
    width:props.width,
  }

  return (
    <div className={ props.className } id={ props.id } style={ styles }>
      { props.children }
    </div>
  );
};

export default Wrapper;
