import Cache from "../../../externals/cache";
import AddPlayerToRoomUseCase from "../add_player/useCase";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import PlayerSendGuessUseCase from "./useCase";

const cache = new Cache();
const playerWhoIsDrawing = 'asdasd';
const playerWhoMustGuess = 'koaskfoa';
var roomForTest:room;


beforeAll(async () => {
  await cache.connect();
  const newRoom = new CreateRoomUseCase();
  const updateRoom = new AddPlayerToRoomUseCase();

  roomForTest = await newRoom.create(playerWhoIsDrawing);
  const roomId = roomForTest.id;
  const updatedRoom = await updateRoom.addPlayer(playerWhoMustGuess, roomId);
  if(updatedRoom) roomForTest = updatedRoom;
});


afterAll(async () => {
  await cache.deleteOne('rooms');
  await cache.deleteOne(`room-${roomForTest.id}`);
  await cache.quit();
});


test("Test: Send empty guess", async () => {
  const room = new PlayerSendGuessUseCase(playerWhoMustGuess);
  const guess = "";
  const result = await room.sendGuess(guess, roomForTest.id);

  expect(result.canSendGuess).toBeFalsy();
  expect(result.guessIsRight).toBeFalsy();
});


test("Test: Send correct guess", async () => {
  const room = new PlayerSendGuessUseCase(playerWhoMustGuess);
  const guess = roomForTest.answer;
  const result = await room.sendGuess(guess, roomForTest.id);

  const playerWhoGuess = result.roomData?.players[result.playerIndex];
  const whoIsDrawing = result.roomData?.players[1];

  expect(playerWhoGuess?.score).toBe(10);
  expect(whoIsDrawing!.score).toBe(10);
  expect(result.guessIsRight).toBeTruthy();
  expect(result.canSendGuess).toBeFalsy();
});


test("Test: Send guess with a player that already earn score", async () => {
  const room = new PlayerSendGuessUseCase(playerWhoMustGuess);
  const guess = "skaofksa";
  const result = await room.sendGuess(guess, roomForTest.id);
  expect(result.canSendGuess).toBeFalsy();
});


test("Test: Send guess with player that is drawing", async () => {
  const room = new PlayerSendGuessUseCase(playerWhoIsDrawing);
  const guess = "asokasfoaks";
  const result = await room.sendGuess(guess, roomForTest.id);
  expect(result.canSendGuess).toBeFalsy()
});