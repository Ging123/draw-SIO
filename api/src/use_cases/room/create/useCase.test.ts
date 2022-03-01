import Cache from "../../../externals/cache";
import CreateRoomUseCase from "./useCase";

const room = new CreateRoomUseCase();
const cache = new Cache();
let id = '';

beforeAll(async () => {
  await cache.connect();
});

afterAll(async () => {
  await cache.deleteOne(`room-${id}`);
  await cache.deleteOne('rooms');
  await cache.quit();
});

test("Test: Create a new room", async () => {
  id = (await room.create('Jack')).id;
  expect(id).toBeTruthy();
});

test("Test: Verify if room created exists", async () => {
  const roomCreated = await cache.get(`room-${id}`);
  expect(roomCreated).toBeDefined();
});