import RoomRepository from '../../../repositories/roomRepository';
import RemoveAnUserFromRoomUseCase from './useCase';
import mongoose from 'mongoose';

const room = new RemoveAnUserFromRoomUseCase();
const repo = new RoomRepository();
var roomForTest:any;
const usernameForTest1 = "jack";
const usernameForTest2 = "ging";

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URL!);
  roomForTest = await repo.create(usernameForTest1);
  roomForTest = await repo.addNewPlayer(roomForTest, usernameForTest2);
});

afterAll(async () => {
  await mongoose.disconnect();
});

test('Test: remove an user from a room', async () => {
  const id = roomForTest._id.toString();
  const deleted = await room.removeAnUser(usernameForTest1, id);
  expect(deleted).toBeTruthy();
});

test('test: remove all users in a room', async () => {
  const id = roomForTest._id.toString();
  const deleted = await room.removeAnUser(usernameForTest2, id);
  expect(deleted).toBeTruthy();
});