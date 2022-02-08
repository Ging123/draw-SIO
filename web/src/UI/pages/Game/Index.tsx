import PlayersBar from "../../components/PlayersBar/Index";
import DrawArea from "../../components/DrawArea/Index";
import Wrapper from "../../components/Wrapper/Index";
import Chat from "../../components/Chat/Index";
import './styles.scss';

const Game = () => {
  return (
    <Wrapper id="game-page-wrapper">
      <PlayersBar/>
      <DrawArea/>
      <Chat/>
    </Wrapper>
  );
};

export default Game;