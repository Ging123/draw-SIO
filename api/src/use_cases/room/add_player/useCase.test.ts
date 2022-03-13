import Cache from "../../../externals/cache";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import AddPlayerToRoomUseCase from "./useCase";

const room = new AddPlayerToRoomUseCase();
const cache = new Cache();
const player = 'assfd';
var roomForTest:room;


beforeAll(async () => {
  await cache.connect();
  const newRoom = new CreateRoomUseCase();
  roomForTest = await newRoom.create(player);
});


afterAll(async () => {
  cache.deleteOne('rooms');
  cache.deleteOne(`room-${roomForTest.id}`);
  await cache.quit();
});


test("Test: Add a player to a room", async () => {
  const playerToAdd = 'asfasfas';
  const roomId = roomForTest.id;
  const updatedRoom = await room.addPlayer(playerToAdd, roomId);

  if(!updatedRoom) return;
  const players = updatedRoom.players;
  expect(players[1].username).toBe(playerToAdd);
  expect(players.length).toBe(2);
});


test("Test: Add a player to a room that doesn't exist", async () => {
  const updatedRoom = await room.addPlayer('jack', '');
  expect(updatedRoom).toBeFalsy();
});