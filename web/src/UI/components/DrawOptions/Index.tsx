import Modal from "../Modal/Index";
import ColorsWrapper from "./components/ColorsWrapper/Index";
import SizeWrapper from "./components/SizeWrapper/Index";
import ToolBar from "./components/ToolBar/Index";
import "./styles.scss";

interface props {
  close:() => void;
}

const DrawOptions = (props:props) => {
  return (
    <div className="draw-option-wrapper">
      <ToolBar />
      <ColorsWrapper />
      <SizeWrapper />
      <Modal background={ "#0000009a" } onClick={ props.close } />
    </div>
  );
}

export default DrawOptions;