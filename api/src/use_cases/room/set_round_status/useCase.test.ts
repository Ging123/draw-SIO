import Cache from "../../../externals/cache";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import SetRoundStatusUseCase from "./useCase";

const cache = new Cache();
const round = new SetRoundStatusUseCase();
const room = new CreateRoomUseCase();
var roomForTest:room;
var roomId:string;

beforeAll(async () => {
  await cache.connect();
  roomForTest = await room.create('jsado');
  roomId = roomForTest.id;
});

afterAll(async () => {
  await cache.deleteOne(`room-${roomId}`);
  await cache.quit();
});

test("Test: Update round status to start", async () => {
  await round.setStatus(roomForTest, true);
  roomForTest = await cache.get(`room-${roomId}`);
  expect(roomForTest.roundStart).toBeTruthy();
});

test("Test: Update round status to endend", async () => {
  await round.setStatus(roomForTest, false);
  roomForTest = await cache.get(`room-${roomId}`);
  expect(roomForTest.roundStart).toBeFalsy();
});