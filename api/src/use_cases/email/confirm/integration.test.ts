import express from 'express';
import req from 'supertest';
import mongoose from 'mongoose';
import routes from '../../../../routes';
import bodyParser from 'body-parser';
import UserRepository from '../../../repositories/userRepository';

const app = express();
const email = 'userConfirmEmailUseCase@gmail.com';
const username = 'userConfirmEmailUseCase';
const password = '123456789';
const user = new UserRepository();
app.use(bodyParser.json());
app.use(routes);
var confirmation_code:string;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
  const created = await user.create({
    email:email,
    username:username,
    password:password
  });
  confirmation_code = created.confirmationCode;
});

afterAll(async () => {
  await mongoose.disconnect();
});

test('Test: Confirm an account', async () => {
  const res = await req(app).get(`/user/email/confirm/${confirmation_code}`);
  expect(res.status).toBe(204);
  const userForTest = await user.findByEmail(email);
  expect(userForTest.confirmation_code).toBeFalsy();
  await user.deleteByEmail(email);
});

test('Test: Send token without owner', async () => {
  const res = await req(app).get(`/user/email/confirm/${confirmation_code}`);
  expect(res.status).toBe(400);
  expect(res.body).toBe('Token inválido');
});