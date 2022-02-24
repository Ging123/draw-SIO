import { FaPencilAlt, FaEraser, FaTrash } from "react-icons/fa";
import { BsPaintBucket } from "react-icons/bs";
import "./styles.scss";

const ToolBar = () => {
  return (
    <div className='tool-bar'>
      <FaPencilAlt className="icone" />
      <FaEraser className="icone" />
      <BsPaintBucket className="icone" />
      <FaTrash className="icone" />
    </div>
  )
}

export default ToolBar;