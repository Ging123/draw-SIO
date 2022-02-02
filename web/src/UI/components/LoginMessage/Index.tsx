import { useNavigate } from 'react-router-dom';
import Text from '../Text/Index';
import './styles.scss';

const LoginMessage = () => {
  const navigate = useNavigate();
  const goToLoginPage = () => navigate('/');

  return (
    <>
      <Text
        className="already-have-account-message"
        content="Já tem uma conta, entre aqui"
        fontSize="12px"
        onClick={ goToLoginPage }
      />
    </>
  );
};

export default LoginMessage;
