import LoginMessage from "../../components/LoginMessage/Index";
import SignUpForm from "../../components/SignUpForm/Index";
import Text from "../../components/Text/Index";
import Box from "../../components/Box/Index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LocalStorage from "../../../services/localstorage";

const SignUp = () => {
  document.title = 'Crie Sua Conta';

  const navigate = useNavigate();

  useEffect(() => {
    const localstorage = new LocalStorage();
    const token = localstorage.get('token');
    if(token) navigate('/home');
  }, []);

  return (
    <Box>
      <Text
        content="Cadastre-se"
        fontWeight={ 1000 }
        fontSize="25px"
        margin="25px"
      />
      <SignUpForm />
      <LoginMessage />
    </Box>
  );
};

export default SignUp;