import express from 'express';
import req from 'supertest';
import mongoose from 'mongoose';
import routes from '../../../../routes';
import bodyParser from 'body-parser';
import UserRepository from '../../../repositories/userRepository';

const app = express();
const email = 'userUpdateConfirmationTokenUseCase@hotmail.com';
const username = 'userUpdateConfirmationToken';
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
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

test('Test: Update confirmation token', async () => {
  const res = await req(app).put('/user/email/confirm').send({ emailOrUsername:email });
  expect(res.status).toBe(200);
});

test('Test: Confirm an email using updated confirmation code', async () => {
  const userForTest = await user.findByEmail(email);
  const data = await user.updateConfirmationCode(userForTest);
  const confirmationCode = data.confirmationCode;
  const res = await req(app).get(`/user/email/confirm/${confirmationCode}`);
  expect(res.status).toBe(302);
}); 

test('Test: Update confirmation token of an email that is already confirmed', async () => {
  const res = await req(app).put('/user/email/confirm').send({ emailOrUsername:email });
  expect(res.status).toBe(400);
  expect(res.body).toBe('Esse email já foi confirmado');
});

test('Test: Update confirmation token of an email that doesnt exists', async () => {
  await user.deleteByEmail(email);
  const res = await req(app).put('/user/email/confirm').send({ emailOrUsername:email });
  expect(res.status).toBe(400);
  expect(res.body).toBe('Esse email ou nome de usuário não existe');
});