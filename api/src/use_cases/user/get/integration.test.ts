import express from 'express';
import req from 'supertest';
import mongoose from 'mongoose';
import routes from '../../../../routes';
import bodyParser from 'body-parser';
import UserRepository from '../../../repositories/userRepository';

const app = express();
const email = 'getUserUseCase@outlook.com';
const username = 'getUserUseCase';
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

test('Test: Get user data', async () => {
  const userForTest = await user.findByEmail(email);
  await user.confirmEmail(userForTest);
  const token = await user.login(userForTest);
  const res = await req(app).get('/user/').set("Authorization", token)
  expect(res.body).toBeTruthy();
  expect(res.status).toBe(200);
});