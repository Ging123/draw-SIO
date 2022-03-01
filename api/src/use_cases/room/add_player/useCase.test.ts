import Cache from "../../../externals/cache";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import AddPlayerToRoomUseCase from "./useCase";

const room = new AddPlayerToRoomUseCase();
const newRoom = new CreateRoomUseCase();
const cache = new Cache();
var roomToTest:room;

beforeAll(async () => {
  await cache.connect();
  roomToTest = await newRoom.create('aasadsad');
});

afterAll(async () => {
  await cache.deleteOne(`room-${roomToTest.id}`);
  await cache.quit();
});

test("Test: add player to room", async () => {
  const id = roomToTest.id;
  await room.addPlayerToRoom(id, 'kkkk');
  roomToTest = await cache.get(`room-${id}`);
  const quantityOfPlayers = roomToTest.players.length;
  expect(quantityOfPlayers).toBe(2);
});

test("Test: Add player to a room that doesn't exists", async () => {
  const result = await room.addPlayerToRoom('aaa', 'kasdok');
  expect(result).toBeUndefined();
});