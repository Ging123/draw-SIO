import ForgotPasswordOrSignUp from "../../components/ForgotPasswordOrSignUp/Index";
import LoginForm from "../../components/LoginForm/Index";
import Text from "../../components/Text/Index";
import Box from "../../components/Box/Index";
import { useEffect } from "react";
import LocalStorage from "../../../services/localstorage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  document.title = 'Entrar';
  const navigate = useNavigate();

  useEffect(() => {
    const localstorage = new LocalStorage();
    const token = localstorage.get('token');
    if(token) navigate('/home');
  }, []);

  return (
    <Box>
      <Text
        content="Entre para jogar"
        fontWeight={ 1000 }
        fontSize="25px"
        margin="25px"
      />
      <LoginForm /> 
      <ForgotPasswordOrSignUp/>
    </Box>
  );
};

export default Login;