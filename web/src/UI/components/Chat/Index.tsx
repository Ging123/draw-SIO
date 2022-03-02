import ChatInput from '../ChatInput/Index';
import { Socket } from 'socket.io-client';
import Chat from '../../../services/chat';
import { useEffect } from 'react';
import './styles.scss';

interface props {
  socket:Socket;
}

const ChatContainer = (props:props) => {
  const chat = new Chat();

  useEffect(() => {
    props.socket.on('new_player_joined', (data) => {
      chat.sendGameMessage(data.message, 'blue');
    });

    props.socket.on('player_send_a_guess', (player) => {
      const whoSentTheMessage = `${player.username}: `;
      chat.sendGuess(player.guess, whoSentTheMessage);
    });

    props.socket.on('player_exist', (player) => {
      const message = `${player} saiu da sala`;
      chat.sendGameMessage(message, 'red');
    });
  }, []);

  return (
    <div id="chat-container">
      <div id="chat" />
      <ChatInput socket={ props.socket }/>
    </div>
  );
};

export default ChatContainer;