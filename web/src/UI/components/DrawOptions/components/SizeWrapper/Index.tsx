import "./styles.scss";

const SizeWrapper = () => {
  return (
    <div className="size-wrapper">
      <b>Lapiz</b>
      <input 
        style={{ width:"100%" }}
        type="range" 
      />
      <b>Borracha</b>
      <input 
        style={{ width:"100%" }}
        type="range" 
      />
    </div>
  );
}

export default SizeWrapper;