import SendConfirmationCodeAgain from '../../components/SendConfirmationCodeAgain/Index';
import Wrapper from '../../components/Wrapper/Index';
import Text from '../../components/Text/Index';

const EmailConfirmate = () => {
  document.title = 'Confirme Seu Email';

  return (
    <Wrapper 
      alignItems="center"
      display="flex" 
      flexDirection="column"
      height="100vh"
      justifyContent="center"
    >
      <Text 
        content="Quase Lá :)"
        fontSize="25px" 
        fontWeight={ 1000 }
      />
      <Text
        content="Enviamos um código de verificação para o seu email"
        fontSize="18px"
        margin='15px 0px 20px 0px'
      />
      <SendConfirmationCodeAgain />
    </Wrapper>
  );
};

export default EmailConfirmate;