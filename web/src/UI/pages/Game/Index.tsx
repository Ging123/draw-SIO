import PlayersBar from "../../components/PlayersBar/Index";
import LocalStorage from "../../../services/localstorage";
import ChatContainer from "../../components/Chat/Index";
import DrawArea from "../../components/DrawArea/Index";
import Wrapper from "../../components/Wrapper/Index";
import { useEffect, useState } from "react";
import Io from "../../../services/io";
import config from "../../../config";
import './styles.scss';
import { useNavigate } from "react-router-dom";
import GetNewTokenForUser from "../../../domain/use_cases/user/get_new_token/useCase";

const Game = () => {
  const token = new LocalStorage().get('token');
  const navigate = useNavigate();
  const goToLoginPage = () => navigate('/');
  const io = new Io();
  const [socket, setSocket] = useState(io.connect(config.apiUrl, token));

  useEffect(() => {
    socket.connect();

    socket.on('connect_error', async (err:any) => {
      try {
        socket.close();
        const tokenExpired = 'Token expirou ou token inválido';
        if(err.message !== tokenExpired) return goToLoginPage();
        const user = new GetNewTokenForUser();
        await user.getNewToken();
        socket.connect();
      }
      catch(err) {
        goToLoginPage();
      }
    });

    socket.emit("connect_to_a_room");
  }, [socket]);

  return (
    <Wrapper id="game-page-wrapper">
      <PlayersBar/>
      <DrawArea socket={ socket }/>
      <ChatContainer socket={ socket }/>
    </Wrapper>
  );
};

export default Game;