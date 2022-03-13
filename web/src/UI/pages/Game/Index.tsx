import PlayersBar from "../../components/PlayersBar/Index";
import ChatContainer from "../../components/Chat/Index";
import DrawArea from "../../components/DrawArea/Index";
import Wrapper from "../../components/Wrapper/Index";
import { useEffect } from "react";
import './styles.scss';
import { useNavigate } from "react-router-dom";
import GetNewTokenForUser from "../../../domain/use_cases/user/get_new_token/useCase";
import Io from "../../../services/io";
import LocalStorage from "../../../services/localstorage";
import config from "../../../config";

const Game = () => {
  const navigate = useNavigate();
  const localstorage = new LocalStorage();
  const goToLoginPage = () => navigate('/');
  const token = new LocalStorage().get('token');
  const io = new Io();
  const socket = io.set(config.apiUrl, token);

  document.title = 'Tente adivinhar a resposta :)';

  useEffect(() => {
    socket.connect();
    localstorage.remove('color');

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
        /*localstorage.remove('token');*/
        goToLoginPage();
      }
    });

    socket.on('new_round_start', () => document.title = 'Tente adivinhar a resposta :)');

    socket.on("draw_time", (data) => {
      document.title = `Você deve desenhar: ${data.answer}`;
    });

    socket.emit("connect_to_a_room");

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <Wrapper display="flex" width="100%">
      <PlayersBar socket={ socket }/>
      <DrawArea socket={ socket }/>
      <ChatContainer socket={ socket }/>
    </Wrapper>
  ); 
};

export default Game;