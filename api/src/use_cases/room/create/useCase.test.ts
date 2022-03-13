import Cache from "../../../externals/cache";
import { room } from "../base";
import CreateRoomUseCase from "./useCase";

const room = new CreateRoomUseCase();
const cache = new Cache();
const player = 'jack';
var createdRoom:room;


beforeAll(async () => {
  await cache.connect();
});


afterAll(async () => {
  await cache.deleteOne('rooms');
  await cache.deleteOne(`room-${createdRoom.id}`);
  await cache.quit();
});


test("Test: Create room", async () => {
  createdRoom = await room.create(player);
  expect(createdRoom.answer).toBeTruthy();
  expect(createdRoom.id).toBeTruthy();
  expect(createdRoom.roundStartTime).toBeTruthy();

  expect(createdRoom.whoIsDrawing).toBe(player);
  expect(createdRoom.players[0].username).toBe(player);
  expect(createdRoom.players[0].score).toBe(0);

  expect(createdRoom.players[0].alreadyEarnScore).toBeFalsy();
});