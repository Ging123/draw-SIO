import { useNavigate } from 'react-router-dom';
import './styles.scss';

const PlayButton = () => {
  const navigate = useNavigate();
  const goToGamePage = () => navigate('/game'); 

  return (
    <button className='play-button' onClick={ goToGamePage }>
      Clique Aqui Para Jogar
    </button>
  );
};

export default PlayButton;