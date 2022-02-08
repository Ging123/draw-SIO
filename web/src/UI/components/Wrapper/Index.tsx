interface props {
  alignItems?:'center'|'left'|'right';
  className?:string;
  children?:React.ReactNode;
  display?:'block'|'flex'|'inline'|'inline-block';
  flexDirection?:'column'|'row';
  height?:string;
  id?:string;
  justifyContent?:'center'|'left'|'right';
  width?:string;
}

const Wrapper = (props:props) => {
  const styles = {
    alignItems:props.alignItems,
    display:props.display || 'flex',
    flexDirection:props.flexDirection,
    height:props.height,
    justifyContent:props.justifyContent,
    width:props.width || '100%',
  }

  return (
    <div className={ props.className } id={ props.id } style={ styles }>
      { props.children }
    </div>
  );
};

export default Wrapper;
