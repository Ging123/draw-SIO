import { useNavigate } from 'react-router-dom';
import Text from '../Text/Index';
import './styles.scss';

const ForgotPasswordOrSignUp = () => {
  const navigate = useNavigate();
  const goToSignUpPage = () => navigate('/signup');

  return (
    <div className="forgot-password-or-signup-wrapper">
      <Text
        content="Crie uma aqui"
        fontSize="12px"
        onClick={ goToSignUpPage }
      />
      <Text 
        content="Esqueceu sua senha ?"
        fontSize="12px"
      />
    </div>
  );
};

export default ForgotPasswordOrSignUp;