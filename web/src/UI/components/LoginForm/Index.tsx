import { FormEvent, useState } from 'react';
import DefaultButton from '../DefaultButton/Index';
import DefaultInput from '../DefaultInput/Index';
import Form from '../Form/Index';
import LoginUseCase from '../../../domain/use_cases/user/login/useCase';

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const user = new LoginUseCase();

  async function send(e:FormEvent) {
    try {
      e.preventDefault();
      await user.login(emailOrUsername, password);
    }
    catch(err:any) {
      setError(err);
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
      />
    </Form>
  );
};

export default LoginForm;