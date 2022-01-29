import mongoose from 'mongoose';
import UserRepository from '../../../repositories/userRepository';
import UserFindByTokenUseCase from './useCase';
import Cache from '../../../externals/cache';

const user = new UserFindByTokenUseCase();
const repo = new UserRepository();
const email = 'findUserByToken@outlook.com';
const cache = new Cache();
var userForTest:any;
var token:string;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
  userForTest = await repo.create({
    email:email,
    username:'findUserByToken',
    password:'123456789'
  });
  token = await repo.login(userForTest)
});

afterAll(async () => {
  await repo.deleteByEmail(email);
  await mongoose.disconnect();
  await deleteAllFromCache();
});

async function deleteAllFromCache() {
  await cache.connect();
  await cache.deleteAll();
  await cache.quit();
}

test('Test: ', async () => {
  try {
    await user.findUserByToken(token);
  }
  catch(err:any) {
    const emailNotConfirmed = 'Seu email ainda não foi confirmado';
    expect(err.message).toBe(emailNotConfirmed);
  }
});

test('Test: Send a valid token', async () => {
  await repo.confirmEmail(userForTest);
  const userFound = await user.findUserByToken(token);
  expect(userFound).toBeTruthy();
});

test('Test: Send a token of an user that isnt logged', async () => {
  try {
    await repo.logout(userForTest);
    await user.findUserByToken(token);
  }
  catch(error:any) {
    const invalidToken = 'Você não está logado';
    expect(error.message).toBe(invalidToken);
  }
});

test('Test: Send an old token of an user', async () => {
  try {
    await repo.login(userForTest);
    await user.findUserByToken(token);
  }
  catch(error:any) {
    const invalidToken = 'Token inválido';
    expect(error.message).toBe(invalidToken);
  }
});

test('Test: Doesnt send token', async () => {
  try {
    await user.findUserByToken('');
  }
  catch(error:any) {
    const emptyToken = 'Token não foi preenchido';
    expect(error.message).toBe(emptyToken);
  }
});

test('Test: Send invalid token', async () => {
  try {
    await user.findUserByToken('asdasd');
  }
  catch(error:any) {
    const invalidToken = 'Token inválido';
    expect(error.message).toBe(invalidToken);
  }
});

test('Test: Send token with an email that doesnt exist', async () => {
  try {
    await repo.deleteByEmail(email);
    await user.findUserByToken(token);
  }
  catch(error:any) {
    const invalidToken = 'Token inválido';
    expect(error.message).toBe(invalidToken);
  }
});