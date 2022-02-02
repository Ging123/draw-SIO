import Box from "../../components/Box/Index";
import LoginMessage from "../../components/LoginMessage/Index";
import SignUpForm from "../../components/SignUpForm/Index";
import Text from "../../components/Text/Index";

const SignUp = () => {
  document.title = 'Crie Sua Conta';

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