import Cache from "../../../externals/cache";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import RemovePlayerFromRoomUseCase from "./useCase";

const room = new RemovePlayerFromRoomUseCase();
const cache = new Cache();
const player = "jack";
var roomForTest:room;


beforeAll(async () => {
  await cache.connect();
  const newRoom = new CreateRoomUseCase();
  roomForTest = await newRoom.create(player);
});


afterAll(async () => {
  await cache.deleteOne("rooms");
  await cache.deleteOne(`room-${roomForTest.id}`);
  await cache.quit();
});


test("Test: Remove player from room", async () => {
  const roomId = roomForTest.id;
  const result = await room.removePlayer(player, roomId);
  const quantityOfPlayers = result?.players.length;
  expect(quantityOfPlayers).toBe(0);
});