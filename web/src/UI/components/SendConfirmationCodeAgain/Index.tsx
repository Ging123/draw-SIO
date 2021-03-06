import UpdateConfirmationCode from '../../../domain/use_cases/user/update_confirmation_token/useCase';
import DefaultButton from '../DefaultButton/Index';
import { useNavigate } from 'react-router-dom';
import MessageBox from '../MessageBox/Index';
import { useState } from 'react';
import './style.scss';

const SendConfirmationCodeAgain = () => {
  const [sentMessage, setSentMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const goToLoginPage = () => navigate('/');
  
  async function sendNewCode() {
    try {
      const user = new UpdateConfirmationCode();
      setLoading(true);
      await user.update();
      setLoading(false);
      setSentMessage(true);
      setTimeout(() => { setSentMessage(false)}, 1000);
    }
    catch(err) {
      setLoading(false);
      if(err === 'usuário não logado') goToLoginPage();
    }
  }

  return (
    <>
      <DefaultButton 
        className='send-confirmation-code-again-button'
        content='Enviar Código Novamente'
        loading={ loading }
        onClick={ sendNewCode }
      />
      {sentMessage && 
        <MessageBox 
          content="Email enviado" 
          background="#0080009d"
        />
      }
    </>
  );
};

export default SendConfirmationCodeAgain;
