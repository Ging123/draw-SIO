import express from 'express';
import req from 'supertest';
import mongoose from 'mongoose';
import routes from '../../../../routes';
import bodyParser from 'body-parser';
import UserRepository from '../../../repositories/userRepository';

const app = express();
const email = 'loginUserUseCase@outlook.com';
const username = 'loginUserUseCase';
const password = '123456789';
const user = new UserRepository();
app.use(bodyParser.json());
app.use(routes);

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
  await user.create({
    email:email,
    username:username,
    password:password
  })
});

afterAll(async () => {
  await user.deleteByEmail(email);
  await mongoose.disconnect();
});

test('Test: Login user', async () => {
  const data = {
    emailOrUsername:email,
    password:password
  }
  const res = await req(app).post('/user/login').send(data);
  expect(res.body.token).toBeTruthy();
  expect(res.status).toBe(201);
});

test('Test: Send an email that doesnt exists', async () => {
  const data = {
    emailOrUsername:'',
    password:password
  }
  const res = await req(app).post('/user/login').send(data);
  expect(res.body).toBe('Email ou nome de usuário não existe');
  expect(res.status).toBe(400);
});

test('Test: Send wrong password', async () => {
  const data = {
    emailOrUsername:username,
    password:''
  }
  const res = await req(app).post('/user/login').send(data);
  expect(res.body).toBe('Senha digitada errada');
  expect(res.status).toBe(400);
});

test('Test: Login in an account that is already logged', async () => {
  const data = {
    emailOrUsername:username,
    password:password
  }
  const res = await req(app).post('/user/login').send(data);
  expect(res.body).toBe('Você já está logado');
  expect(res.status).toBe(400);
});