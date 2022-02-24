function createColor(color:string, index:number) {
  return (
    <div 
      className="color-container"
      style={{ background:color }}
      key={ index } 
    />
  );
}

export default createColor;