import Cache from "../../../externals/cache";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import GetFreeRoomUseCase from "./useCase";

const room = new GetFreeRoomUseCase();
const cache = new Cache();
var roomForTest:room;


beforeAll(async () => {
  await cache.connect();
});


afterAll(async () => {
  await cache.deleteOne('rooms');
  await cache.deleteOne(`room-${roomForTest.id}`);
  await cache.quit();
});


test("Test: Search a free room without any room exist", async () => {
  const roomFind = await room.getFreeRoom();
  expect(roomFind).toBeFalsy();
});


test("Test: Get a free room", async () => {
  const newRoom = new CreateRoomUseCase();
  roomForTest = await newRoom.create('billy');
  const roomFind = await room.getFreeRoom();

  if(!roomFind) return;
  expect(roomFind.players.length).toBeLessThan(10);
});