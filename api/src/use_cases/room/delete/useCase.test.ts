import Cache from "../../../externals/cache";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import DeleteRoomUseCase from "./useCase";

const room = new DeleteRoomUseCase();
const cache = new Cache();
var roomForTest:room;

beforeAll(async () => {
  await cache.connect();
  const newRoom = new CreateRoomUseCase();
  roomForTest = await newRoom.create("billy");
});


afterAll(async () => {
  await cache.quit();
});


test("Test: Delete room that doesn't exists", async () => {
  await room.delete("sadasl");
  const rooms = await cache.get("rooms");
  expect(rooms[0]).toBe(roomForTest.id);
});


test("Test: Delete a room", async () => {
  await room.delete(roomForTest.id);
  const roomFound = await cache.get(`room-${roomForTest.id}`);
  expect(roomFound).toBeFalsy();
});