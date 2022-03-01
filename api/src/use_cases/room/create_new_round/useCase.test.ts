import Cache from "../../../externals/cache";
import AddPlayerToRoomUseCase from "../add_player/useCase";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import CreateNewRoundUseCase from "./useCase";

const round = new CreateNewRoundUseCase();
const cache = new Cache();
var roomForTest:room;

beforeAll(async () => {
  const room = new CreateRoomUseCase();
  const player = new AddPlayerToRoomUseCase();
  roomForTest = await room.create('kasdko');
  await player.addPlayerToRoom(roomForTest.id, 'kosdakg');
  await cache.connect();
});

afterAll(async () => {
  await cache.deleteOne(`room-${roomForTest.id}`);
  await cache.quit();
});

test("Test: Create a new round", async () => {
  const nextPlayer = 1;
  roomForTest = await cache.get(`room-${roomForTest.id}`);
  roomForTest = await round.createNewRound(roomForTest);
  expect(roomForTest.drawer).toBe(nextPlayer);
});

test("Test: create a new round but all players already draw", async () => {
  roomForTest = await round.createNewRound(roomForTest);
  const firstPlayer = 0;
  expect(roomForTest.drawer).toBe(firstPlayer);
});