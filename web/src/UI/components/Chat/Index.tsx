import ChatInput from '../ChatInput/Index';
import { Socket } from 'socket.io-client';
import Chat from '../../../services/chat';
import { useEffect, useState } from 'react';
import './styles.scss';
import { drawTime } from '../DrawArea/Index';

interface props {
  socket:Socket;
}

const ChatContainer = (props:props) => {
  const chat = new Chat();
  const [ answer, setAnswer ] = useState("");

  useEffect(() => {
    props.socket.on('new_player_joined', (message) => {
      chat.sendGameMessage(message, 'blue');
    });

    props.socket.on('player_send_a_guess', (player) => {
      const whoSentTheMessage = `${player.username}: `;
      chat.sendGuess(player.guess, whoSentTheMessage);
    });

    props.socket.on('player_exist', (message) => {
      chat.sendGameMessage(message, 'red');
    });
    
    props.socket.on("draw_time", (data:drawTime) => {
      setAnswer(data.answer);
      setTimeout(() => setAnswer(""), 5000);
      document.title = `Você deve desenhar: ${data.answer}`;
    });
  }, []);

  return (
    <div id="chat-container">
      <div id="chat" />
      <ChatInput socket={ props.socket }/>
      {answer && 
        <div className="answer-box">{ answer }</div>  
      }
    </div>
  );
};

export default ChatContainer;