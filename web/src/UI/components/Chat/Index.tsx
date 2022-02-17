import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import ChatInput from '../ChatInput/Index';
import Chat from '../../../services/chat';
import './styles.scss';

interface props {
  socket:Socket;
}

const ChatContainer = (props:props) => {
  const chat = new Chat();

  useEffect(() => {
    props.socket.on('new_player_joined', (message) => {
      chat.sendGameMessage(message, 'blue');
    });
  }, []);

  return (
    <div id="chat-container">
      <div id="chat" />
      <ChatInput />
    </div>
  );
};

export default ChatContainer;