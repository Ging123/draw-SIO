import express from 'express';
import req from 'supertest';
import mongoose from 'mongoose';
import routes from '../../../../routes';
import bodyParser from 'body-parser';
import UserRepository from '../../../repositories/userRepository';

const app = express();
const email = 'logoutUserUseCase@outlook.com';
const username = 'logoutUserUseCase';
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
  await user.deleteByEmail(email);
  await mongoose.disconnect();
});

test('Test: Logout an user', async () => {
  const userForTest = await user.findByEmail(email);
  await user.confirmEmail(userForTest);
  const result = await user.login(userForTest);
  const token = result.token;
  const res = await req(app).delete('/user/logout').set("Authorization", token)
  expect(res.status).toBe(204);
});