import Cache from "../../../externals/cache";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import RemovePlayerOfARoomUseCase from "./useCase";

const room = new RemovePlayerOfARoomUseCase();
const cache = new Cache();
const playerToTest = 'jack';
var roomForTest:room;

beforeAll(async () => {
  await cache.connect();
  const creator = new CreateRoomUseCase();
  roomForTest = await creator.create(playerToTest);
});

afterAll(async () => {
  await cache.deleteOne(`rooms`);
  await cache.deleteOne(`room-${roomForTest.id}`);
  await cache.quit();
});

test("Test: Remove a player from room", async () => {
  const result = await room.remove(roomForTest.id, playerToTest);
  if(result) {
    roomForTest = result;
    expect(roomForTest.players.length).toBe(0);
  }
});

test("test: Remove a player that is not in the room", async () => {
  const result = await room.remove(roomForTest.id, playerToTest);
  if(result) {
    roomForTest = result;
    expect(roomForTest.players.length).toBe(0);
  }
});