import PlayersBar from "../../components/PlayersBar/Index";
import LocalStorage from "../../../services/localstorage";
import DrawArea from "../../components/DrawArea/Index";
import Wrapper from "../../components/Wrapper/Index";
import Chat from "../../components/Chat/Index";
import { useEffect, useState } from "react";
import Io from "../../../services/io";
import config from "../../../config";
import './styles.scss';

const Game = () => {
  const token = new LocalStorage().get('token');
  const io = new Io();
  const [socket, setSocket] = useState(io.connect(config.apiUrl, token));

  useEffect(() => {
    socket.on('connect_error', (err:any) => {
      console.log(err);
    });

    socket.emit("join_to_chat");
  }, []);

  return (
    <Wrapper id="game-page-wrapper">
      <PlayersBar/>
      <DrawArea/>
      <Chat/>
    </Wrapper>
  );
};

export default Game;