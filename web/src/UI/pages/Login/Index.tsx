import Box from "../../components/Box/Index";
import ForgotPasswordOrSignUp from "../../components/ForgotPasswordOrSignUp/Index";
import LoginForm from "../../components/LoginForm/Index";
import Text from "../../components/Text/Index";

const Login = () => {
  document.title = 'Entrar';

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