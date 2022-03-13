import { FaDoorOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logout from './logout';
import "./styles.scss";

const ExitIcone = () => {
  const navigate = useNavigate();

  return (
    <FaDoorOpen className="exit-icone" onClick={() =>logout(navigate)}/>
  )
}

export default ExitIcone;