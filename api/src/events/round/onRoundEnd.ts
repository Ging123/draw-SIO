import { Socket } from "socket.io";
import { io } from "../../../socket";
import Cache from "../../externals/cache";
import RoomRepository from "../../repositories/roomRepository";
import DateUtil from "../../util/date";
import randomName from "../../util/randomName";

const cache = new Cache();

async function onRoundEnd(socket:Socket, roomId:string, io:io) {
  const roomData = await cache.get(`${roomId}-room`);
  const timeIsOver = verifyIfTimeIsOver(roomData);
  if(!timeIsOver) return; 
  startNewRound(socket, roomId, roomData, io);
}

function verifyIfTimeIsOver(roomData:any) {
  const date = new DateUtil();
  return date.aMinuteHasPassed(roomData.timeThatRoundStart);
}

async function startNewRound(socket:Socket, roomId:string, roomData:any, io:io) {
  setNextDrawer(roomData);
  setNextTime(roomData);
  setNextAnswer(roomData);
  await updateRoomDataInCache(roomData, roomId);
  await emitNextRound(socket, roomData, roomId, io);
}

function setNextDrawer(roomData:any) {
  const ifQueueOfPlayersEnd = roomData.indexOfWhoWillDraw + 1 > roomData.quantityOfPlayers;
  if(ifQueueOfPlayersEnd) return roomData.indexOfWhoWillDraw = 0;
  roomData.indexOfWhoWillDraw += 1;
}

function setNextTime(roomData:any) {
  const date = new DateUtil();
  roomData.timeThatRoundStart = date.getCurrentTime();
}

function setNextAnswer(roomData:any) {
  roomData.answer = randomName();
}

async function updateRoomDataInCache(roomData:any, roomId:string) {
  await cache.connect();
  await cache.set(`${roomId}-room`, roomData);
  await cache.quit();
}

async function emitNextRound(socket:Socket, roomData:any, roomId:string, io:io) {
  const room = new RoomRepository();
  const roomFound = await room.findById(roomId);

  const answer = roomData.answer;
  const indexOfWhoWillDraw = roomData.indexOfWhoWillDraw;
  const player = roomFound.players;
  const whoWillDraw = player[indexOfWhoWillDraw];

  io.sockets.in(whoWillDraw).emit("draw_time", answer);
  socket.broadcast.to(roomId).emit("next_match", roomData);
}

export default onRoundEnd;