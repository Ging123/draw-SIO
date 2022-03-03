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
      const players:any[] = data.players;
      const bar = new PlayerBar();
      const whoIsDrawing = data.whoIsDrawing;

      bar.create('Você', 0, `player-is-${username}`);
      players.forEach((player) => bar.create(player.username, player.score));
      bar.addPencilInWhoIsDrawing(whoIsDrawing);
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

    props.socket.on('player_earn_score', (data) => {
      const player = new PlayerBar();
      player.updateScore(data.player, data.score);
      player.updateScore(data.whoIsDrawing.username, data.whoIsDrawing.score);
    });
  }, []);

  return (
    <div id="players-bar-wrapper"></div>
  );
};

export default PlayersBar;