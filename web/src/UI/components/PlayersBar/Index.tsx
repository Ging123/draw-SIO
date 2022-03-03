import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import PlayerBar from './playerBar';
import './styles.scss';

interface props {
  socket:Socket;
}

const PlayersBar = (props:props) => {

  useEffect(() => {
    props.socket.on('you_has_join_a_room', (data) => {
      const username:string = data.clientUsername;
      const players:string[] = data.players;
      const player = new PlayerBar();
      const whoIsDrawing = data.whoIsDrawing;

      player.create('Você', `player-is-${username}`);
      players.forEach((name) => player.create(name));
      player.addPencilInWhoIsDrawing(whoIsDrawing);
    });

    props.socket.on('new_player_joined', (data) => {
      const player = new PlayerBar();
      player.create(data.player);
  });

  props.socket.on('draw_time', (data) => {
    const player = new PlayerBar();
    const whoIsDrawing = data.drawer;
    player.addPencilInWhoIsDrawing(whoIsDrawing);
  });

  props.socket.on('player_exist', (playerWhoLeft) => {
    const player = new PlayerBar();
    player.remove(playerWhoLeft);
  });
  }, []);

  return (
    <div id="players-bar-wrapper"></div>
  );
};

export default PlayersBar;