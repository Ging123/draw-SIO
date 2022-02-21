import { Socket } from "socket.io";
import { io } from "../../../socket";
import Cache from "../../externals/cache";
import Jwt from "../../externals/jwt";
import RoomRepository from "../../repositories/roomRepository";
import DateUtil from "../../util/date";
import randomName from "../../util/randomName";

const cache = new Cache();

async function onRoundEnd(socket:Socket, io:io) {
  await cache.connect();
  const round = await getRoomData(socket);
  const roundTimeIsOver = verifyIfRoundTimeIsOver(round.data);
  if(!roundTimeIsOver) return;

  await saveNewRoundData(round.data, round.id);
  emitNewRound(socket, io, round);
  await cache.quit();
}

async function getRoomData(socket:Socket) {
  const playerUsername = socket.data.username;
  const player = await cache.get(`player-${playerUsername}`);
  const roomId = player.roomId;
  const roomData = await cache.get(`room-${roomId}`);
  return { data:roomData, id:roomId };
}

function verifyIfRoundTimeIsOver(roomData:any) {
  const date = new DateUtil();
  const timeThatTheRoundStart = roomData.timeThatRoundStart;
  const roundTimeIsOver = date.aMinuteHasPassed(timeThatTheRoundStart);
  return roundTimeIsOver;
}

async function saveNewRoundData(round:any, roomId:string) {
  const date = new DateUtil();
  const answer = randomName();
  const timeThatNewRoundStart = date.getCurrentTime();

  round.answer = answer;
  round.timeThatRoundStart = timeThatNewRoundStart;

  await updateWhoMustDraw(round, roomId);
}

async function updateWhoMustDraw(round:any, roomId:string) {
  const room = new RoomRepository();
  const roomData = await room.findById(roomId);
  const quantityOfPlayersInTheRoom = roomData.players.length;
  const index = round.indexOfWhoWillDraw;
  const lastPlayerInTheQueueToDraw = quantityOfPlayersInTheRoom - index;
  
  if(lastPlayerInTheQueueToDraw) round.indexOfWhoWillDraw = 0;
  else round.indexOfWhoWillDraw += 1;

  const whoWillDraw = roomData.players[round.indexOfWhoWillDraw];
  round.whoIsDrawing = whoWillDraw;
}

function emitNewRound(socket:Socket, io:io, round:any) {
  const nextPlayeroTDraw = round.whoIsDrawing;
  const answer = round.data.answer;
  const data = { answer:answer, token:createDrawToken(round.id) };

  io.sockets.in(nextPlayeroTDraw).emit("draw_time", data);
  socket.broadcast.to(round.id).emit("next_match");
}

function createDrawToken(roomId:string) {
  const data = { id:roomId };
  const expiredIn = "59s";
  const jwt = new Jwt(process.env.JWT_TO_DRAW!);
  const token = jwt.create(data, expiredIn);
  return token;
}

export default onRoundEnd;