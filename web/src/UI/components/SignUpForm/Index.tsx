import { FormEvent, useState } from 'react';
import CreateAccountUseCase from '../../../domain/use_cases/user/create/useCase';
import DefaultButton from '../DefaultButton/Index';
import DefaultInput from '../DefaultInput/Index';
import Form from '../Form/Index';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const user = new CreateAccountUseCase();

  async function send(e:FormEvent) {
    try {
      e.preventDefault();
      await user.create(email, username, password);
      setError('');
    }
    catch(err:any) {
      setError(err);
    }
  }

  return (
    <Form error={ error } onSubmit={(e) => send(e)}>
      <DefaultInput
        maxLength={ 100 }
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        value={ email }
      />
      <DefaultInput
        maxLength={ 30 }
        margin='10px 0px'
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nome de usuário"
        value={ username }
      />
      <DefaultInput
        maxLength={ 30 }
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Senha'
        type="password"
        value={ password }
      />
      <DefaultButton
        content="Criar Conta"
        margin="10px 0px"
      />
    </Form>
  );
};

export default SignUpForm;
