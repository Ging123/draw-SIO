import { FormEvent, useState } from 'react';
import DefaultButton from '../DefaultButton/Index';
import DefaultInput from '../DefaultInput/Index';
import Form from '../Form/Index';
import LoginUseCase from '../../../domain/use_cases/user/login/useCase';
import { useNavigate } from 'react-router-dom';
import LocalStorage from '../../../services/localstorage';

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const user = new LoginUseCase();
  const navigate = useNavigate();
  const localstorage = new LocalStorage();
  const goToEmailConfirmatePage = () => navigate('/email/confirmate');
  const goToHomePage = () => navigate('/home');

  async function send(e:FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      await user.login(emailOrUsername, password);
      goToHomePage();
    }
    catch(err:any) {
      setLoading(false);
      const emailNotConfirmed = 'Seu email ainda não foi confirmado';
      if(err !== emailNotConfirmed) return setError(err);
      localstorage.set('emailOrUsername', emailOrUsername);
      goToEmailConfirmatePage();
    }
  }

  return (
    <Form error={error} onSubmit={(e) => send(e)}>
      <DefaultInput
        onChange={(e) => setEmailOrUsername(e.target.value)}
        placeholder="Email ou nome de usuário"
        value={ emailOrUsername }
      />
      <DefaultInput
        margin="10px 0px"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        type="password"
        value={ password }
      />
      <DefaultButton
        content="Entrar"
        loading={ loading }
      />
    </Form>
  );
};

export default LoginForm;