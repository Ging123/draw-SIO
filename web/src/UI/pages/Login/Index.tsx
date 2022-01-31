import Box from "../../components/Box/Index";
import Text from "../../components/Text/Index";

const Login = () => {
  document.title = 'Login';

  return (
    <Box>
      <Text
        content="Enter to Play :)"
        fontWeight={ 1000 }
        fontSize="25px"
      />
    </Box>
  );
};

export default Login;