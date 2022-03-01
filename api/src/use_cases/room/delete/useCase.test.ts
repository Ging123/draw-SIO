import Cache from "../../../externals/cache";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import DeleteRoomUseCase from "./useCase";

const cache = new Cache();
var roomForTest:room;

beforeAll(async () => {
  await cache.connect();
  const room = new CreateRoomUseCase();
  roomForTest = await room.create('sei lá')
});

afterAll(async () => {
  await cache.quit();
});

test("Test: delete a room", async () => {
  const room = new DeleteRoomUseCase();
  await room.delete(roomForTest.id);
  const roomFound = await cache.get(`room-${roomForTest.id}`);

  const rooms = await cache.get('rooms');
  expect(roomFound).toBeUndefined();
  expect(rooms).toBeUndefined();
});