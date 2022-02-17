import { FormEvent, useState } from 'react';
import { Socket } from 'socket.io-client';
import Chat from '../../../services/chat';
import './styles.scss';

interface props {
  socket:Socket;
}

const ChatInput = (props:props) => {
  const [guess, setGuess] = useState('');

  function send(e:FormEvent) {
    e.preventDefault();
    const chat = new Chat();
    props.socket.emit('guess', guess);
    chat.sendGuess(guess, "Você: ");
    setGuess('');
  }

  return (
    <form className='chat-input-form' onSubmit={ send }>
      <input 
        className="chat-input" 
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Digite sua resposta aqui"
        value={ guess }
      />
    </form>
  );
};

export default ChatInput;