import createColor from './CreateColor';
import "./styles.scss";

const ColorsWrapper = () => {
  const color = ["red", "yellow", "black", "green", "pink", "purple", "gray", 
  "blue", "white", "cyan", "orange", "lightBlue", "lightGreen", "olive", "brown",
  "khaki", "springgreen", "thistle", "teal", "navy", "lime", "hotpink", "gold", 
  "gainsboro", "darkslategray", "aquamarine", "bisque"];

  return (
    <div className="colors-wrapper">
      { color.map(createColor) }
    </div>
  );
}

export default ColorsWrapper;