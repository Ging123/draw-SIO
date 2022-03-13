import Cache from "../../../externals/cache";
import AddPlayerToRoomUseCase from "../add_player/useCase";
import { room } from "../base";
import CreateRoomUseCase from "../create/useCase";
import StartNewRoundInARoomUseCase from "./useCase";

const room = new StartNewRoundInARoomUseCase();
const cache = new Cache();
const firstPlayer = "Jack", secondPlayer = "aaaaa";
var roomForTest:room;


beforeAll(async () => {
  await cache.connect();
  const newRoom = new CreateRoomUseCase();
  roomForTest = await newRoom.create(firstPlayer);
});


afterAll(async () => {
  await cache.deleteOne("rooms");
  await cache.deleteOne(`room-${roomForTest.id}`);
  await cache.quit();
});


test("Test: Start a new round", async () => {
  const roomId = roomForTest.id;
  const newRound = await room.startNewRound(roomId);
  const oldAnswer = roomForTest.answer;

  const oldTime = roomForTest.roundStartTime;
  const answerBeDifferent = newRound?.answer !== oldAnswer;
  const timeBeDifferent = newRound?.roundStartTime !== oldTime;

  expect(answerBeDifferent).toBeTruthy();
  expect(timeBeDifferent).toBeTruthy();
});


test("Test: Pass time to draw to next player", async () => {
  const roomId = roomForTest.id;
  await addPlayer();
  const newRound = await room.startNewRound(roomId);
  expect(newRound?.whoIsDrawing).toBe(secondPlayer);
});


test("Test: pass time to draw back to first player", async () => {
  const roomId = roomForTest.id;
  const newRound = await room.startNewRound(roomId);
  expect(newRound?.whoIsDrawing).toBe(firstPlayer);
});


test("Test: Start a new round in a room that doesn't exist", async () => {
  const newRound = await room.startNewRound('');
  expect(newRound).toBeFalsy();
});


async function addPlayer() {
  const updateRoom = new AddPlayerToRoomUseCase();
  const roomId = roomForTest.id;
  const updatedRoom = await updateRoom.addPlayer(secondPlayer, roomId);
  if(updatedRoom) roomForTest = updatedRoom;
}