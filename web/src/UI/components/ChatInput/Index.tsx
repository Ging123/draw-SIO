import { FormEvent, useState } from 'react';
import Chat from './chat';
import './styles.scss';

const ChatInput = () => {
  const [guess, setGuess] = useState('');

  function send(e:FormEvent) {
    e.preventDefault();
    const chat = new Chat();
    chat.send(guess);
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