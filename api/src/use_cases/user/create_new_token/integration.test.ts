import express from 'express';
import req from 'supertest';
import mongoose from 'mongoose';
import routes from '../../../../routes';
import bodyParser from 'body-parser';
import UserRepository from '../../../repositories/userRepository';

const app = express();
const email = 'createNewTokenUserUseCase@outlook.com';
const username = 'createNewTokenUserUseCase';
const password = '123456789';
const user = new UserRepository();
var newToken:string;
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

test('Test: Create a new token', async () => {
  const userForTest = await user.findByEmail(email);
  await user.confirmEmail(userForTest);
  const token = await user.login(userForTest);
  const res = await req(app).post('/user/newToken').set("Authorization", token);
  expect(res.body.token).toBeTruthy();
  expect(res.status).toBe(201);
  newToken = res.body.token;
});

test('Test: Use new token in some route', async () => {
  const res = await req(app).delete('/user/').set("Authorization", newToken)
  expect(res.status).toBe(204);
});