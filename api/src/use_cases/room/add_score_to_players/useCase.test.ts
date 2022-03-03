import Cache from "../../../externals/cache";
import AddPlayerToRoomUseCase from "../add_player/useCase";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import AddScoreToPlayersInRoomUseCase from "./useCase";

const round = new AddScoreToPlayersInRoomUseCase();
const cache = new Cache();
const playerWhoIsDrawing = 'okasofkasofngf';
const playerName = 'kokasdoas';
var roomForTest:room;

beforeAll(async () => {
  const room = new CreateRoomUseCase();
  const createdRoom = new AddPlayerToRoomUseCase();
  roomForTest = await room.create(playerWhoIsDrawing);
  await createdRoom.addPlayerToRoom(roomForTest.id ,playerName);
  await cache.connect();
});

afterAll(async () => {
  await cache.deleteOne(`room-${roomForTest.id}`);
  await cache.deleteOne('rooms');
  await cache.quit();
});

test('Test: add points to a player who is drawing', async () => {
  roomForTest = await round.addScore(playerWhoIsDrawing, roomForTest.id);
  const scoreOfPlayerWhoIsDrawing = roomForTest.players[0].score;
  expect(scoreOfPlayerWhoIsDrawing).toBe(0);
});

test("Test: add points to a player", async () => {
  roomForTest = await round.addScore(playerName, roomForTest.id);
  const scoreOfPlayerWhoIsDrawing = roomForTest.players[0].score;
  const scoreOfNormalPlayer = roomForTest.players[1].score;
  expect(scoreOfPlayerWhoIsDrawing).toBe(10);
  expect(scoreOfNormalPlayer).toBe(10);
});