import express from 'express';
import req from 'supertest';
import mongoose from 'mongoose';
import routes from '../../../../routes';
import bodyParser from 'body-parser';
import UserRepository from '../../../repositories/userRepository';

const app = express();
const email = 'createUserUseCase@outlook.com';
const username = 'createUserUseCase';
const password = '123456789';
const user = new UserRepository();
app.use(bodyParser.json());
app.use(routes);

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
});

afterAll(async () => {
  await user.deleteByEmail(email);
  await mongoose.disconnect();
});

test('Test: Insert an user', async () => {
  const data = {
    email:email,
    username:username,
    password:password
  }
  const res = await req(app).post('/user').send(data);
  expect(res.body).toBeTruthy();
  expect(res.status).toBe(201);
});

test('Test: Send empty email', async () => {
  const data = {
    email:'',
    username:username,
    password:password
  }
  const res = await req(app).post('/user').send(data);
  const emptyEmail = 'Campo de email não foi preenchido';
  expect(res.body).toBe(emptyEmail);
  expect(res.status).toBe(400);
});

test('Test: Send invalid email', async () => {
  const data = {
    email:'aa',
    username:username,
    password:password
  }
  const res = await req(app).post('/user').send(data);
  const invalidEmail = 'Email inválido';
  expect(res.body).toBe(invalidEmail);
  expect(res.status).toBe(400);
});

test('Test: Send email with length greater than 100', async () => {
  const data = {
    email:'ksaodksaodksaodksoakdfasfoaskfoaskofkasofksaofkosakfsaosadkjgierjgirjegmerigmasdsadsadsadasdaasdasddasdsasderimgiergerkgokergokreogkreokorekgorekgoerkgoerkgokergoerkgwpfwepkfwopfkwpofkwpfkwldfksdlkfdlskflkdslfksdlkflsdkflsd@outlook.com',
    username:username,
    password:password
  }
  const res = await req(app).post('/user').send(data);
  const emailLengthGreaterThanMax = 'Email deve ter menos de 100 caracteries';
  expect(res.body).toBe(emailLengthGreaterThanMax);
  expect(res.status).toBe(400);
});

test('Test: Doesnt send username', async () => {
  const data = {
    email:email,
    username:'',
    password:password
  }
  const res = await req(app).post('/user').send(data);
  const emptyUsername = 'Campo de nome de usuário não foi preenchido';
  expect(res.body).toBe(emptyUsername);
  expect(res.status).toBe(400);
});

test('Test: Send username with length greater than 30', async () => {
  const data = {
    email:email,
    username:'saodkasokdsaodksaodksaodksaodksoadsaodksaofkosakfoasifosaifosakfosakfoksaofpksakfpsakfpaskfpkaspfksapokfposakfpksaofpksapofksapofkpsafkpsafsafsafsaf',
    password:password
  }
  const res = await req(app).post('/user').send(data);
  const usernameLengthGreaterThanMax = 'Nome de usuário deve ter no máximo 30 caracteries';
  expect(res.body).toBe(usernameLengthGreaterThanMax);
  expect(res.status).toBe(400);
});

test('', async () => {
  const data = {
    email:email,
    username:'kkkk?',
    password:password
  }
  const res = await req(app).post('/user').send(data);
  const usernameHasSpecialChar = 'Nome de usuário não pode ter caracteries especiais';
  expect(res.body).toBe(usernameHasSpecialChar);
  expect(res.status).toBe(400);
})

test('Test: Send empty password', async () => {
  const data = {
    email:email,
    username:username,
    password:''
  }
  const res = await req(app).post('/user').send(data);
  const emptyPassword = 'Campo de senha não foi preenchido';
  expect(res.body).toBe(emptyPassword);
  expect(res.status).toBe(400);
});

test('Test: Send password with length greater than 30', async () => {
  const data = {
    email:email,
    username:username,
    password:'saodkasokdsaodksaodksaodksaodksoadsaodksaofkosakfoasifosaifosakfosakfoksaofpksakfpsakfpaskfpkaspfksapokfposakfpksaofpksapofksapofkpsafkpsafsafsafsaf'
  }
  const res = await req(app).post('/user').send(data);
  const passwordLengthGreaterThanMax = 'Senha deve ter no máximo 30 caracteries';
  expect(res.body).toBe(passwordLengthGreaterThanMax);
  expect(res.status).toBe(400);
});

test('Test: Send password with length shorter than 7', async () => {
  const data = {
    email:email,
    username:username,
    password:'a'
  }
  const res = await req(app).post('/user').send(data);
  const passwordLengthShorterThanMin = 'Senha deve ter no mínimo 7 caracteries';
  expect(res.body).toBe(passwordLengthShorterThanMin);
  expect(res.status).toBe(400);
});

test('Test: Send an email that is already being used', async () => {
  const data = {
    email:email,
    username:username,
    password:password
  }
  const res = await req(app).post('/user').send(data);
  const emailAlreadyBeingUsed = 'Esse email já está sendo utilizado';
  expect(res.body).toBe(emailAlreadyBeingUsed);
  expect(res.status).toBe(400);
});

test('Test: Send an username that is already being used', async () => {
  const data = {
    email:'createUserUseCase2@outlook.com',
    username:username,
    password:password
  }
  const res = await req(app).post('/user').send(data);
  const emailAlreadyBeingUsed = 'Esse nome de usuário já está sendo utilizado';
  expect(res.body).toBe(emailAlreadyBeingUsed);
  expect(res.status).toBe(400);
});