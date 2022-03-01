import Cache from "../../../externals/cache";
import CreateRoomUseCase from "../create/useCase";
import GetAFreeRoomUseCase from "./useCase";

const cache = new Cache();
const room = new GetAFreeRoomUseCase();
const ids:string[] = [];
const quantityOfRoomsCreated = 3;

beforeAll(async () => {
  await cache.connect();
});

afterAll(async () => {
  await deleteRooms();
  await cache.deleteOne('rooms');
  await cache.quit();
})

test("Test: Get a free room without have any room saved in cache", async () => {
  const freeRoom = await room.getAFreeRoom();
  expect(freeRoom).toBeUndefined();
});

test("Test: Get a free room", async () => {
  await createSomeRooms();
  const freeRoom = await room.getAFreeRoom();
  expect(freeRoom).toBeDefined();
});

async function createSomeRooms() {
  const creator = new CreateRoomUseCase();
  const players = ['a', 'b', 'c'];
  for(let i = 0; i < quantityOfRoomsCreated; i++) {
    const id = (await creator.create(players[i])).id;
    ids.push(id);
  }
}

async function deleteRooms() {
  for(let i = 0; i < quantityOfRoomsCreated; i++) {
    await cache.deleteOne(`room-${ids[i]}`);
  }
}