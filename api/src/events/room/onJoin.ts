import RoomRepository from "../../repositories/roomRepository";
import Cache from "../../externals/cache";
import { io } from "../../../socket";
import DateUtil from "../../util/date";
import randomName from "../../util/randomName";
import { Socket } from "socket.io";
import Jwt from "../../externals/jwt";

const room = new RoomRepository();
const cache = new Cache();

async function onJoin(socket:Socket, io:io) {
  await cache.connect()
  let freeRoomFound = await room.getAFreeRoom();
  if(!freeRoomFound) freeRoomFound = await createARoomInDbAndCache(socket);
  else await addUserToRoomFound(freeRoomFound, socket.data.username);
  await addPlayerDataInCache(socket, freeRoomFound);
  await emitThatUserJoinToRoom(socket, io, freeRoomFound);
  await cache.quit();
}

async function createARoomInDbAndCache(socket:Socket) {
  const firstPlayer = socket.data.username;
  const createdRoom = await createRoomInDb(firstPlayer);
  await createRoomInCache(createdRoom);
  return createdRoom;
}

async function createRoomInDb(firstPlayer:string) {
  const createdRoom = await room.create(firstPlayer);
  return createdRoom;
}

async function createRoomInCache(createdRoom:any) {
  const date = new DateUtil();
  const answer = randomName();
  const roomId = createdRoom._id.toString();

  const roomStatus = {
    indexOfWhoWillDraw:0,
    whoIsDrawing:createdRoom.players[0],
    timeThatRoundStart:date.getCurrentTime(),
    answer:answer,
    quantityOfPlayers:1
  }
  await cache.set(`room-${roomId}`, roomStatus);
}

async function addUserToRoomFound(freeRoom:any, player:string) {
  await room.addNewPlayer(freeRoom, player);
  const roomId = freeRoom._id.toString();
  const roomStatus = await cache.get(`room-${roomId}`);
  roomStatus.quantityOfPlayers += 1;
  await cache.set(`room-${roomId}`, roomStatus);
}

async function emitThatUserJoinToRoom(socket:Socket, io:io, freeRoom:any) {
  const roomId = freeRoom._id.toString();
  const user = socket.data;
  const playerJoinMessage = `${user.username} entrou no jogo`;

  await socket.join(roomId);
  await socket.join(user.username);
  socket.broadcast.to(roomId).emit("new_player_joined", playerJoinMessage);

  await emitAnswerIfUserMustDraw(socket, io, freeRoom);
}

async function emitAnswerIfUserMustDraw(socket:Socket, io:io, freeRoom:any) {
  const thisUser = socket.data.username;
  const roomId = freeRoom._id.toString();
  const roomData = await cache.get(`room-${roomId}`);
  const whoMustDraw = roomData.whoIsDrawing;
  const answer = roomData.answer;
  const data = { answer:answer, token:createDrawToken(roomId) };
  
  if(thisUser !== whoMustDraw) return; 
  io.sockets.in(thisUser).emit("draw_time", data); 
}

function createDrawToken(roomId:string) {
  const data = { id:roomId };
  const expiredIn = "59s";
  const jwt = new Jwt(process.env.JWT_TO_DRAW!);
  const token = jwt.create(data, expiredIn);
  return token;
}

async function addPlayerDataInCache(socket:Socket, roomThatUserIs:any) {
  const roomId = roomThatUserIs._id.toString();
  const player = socket.data.username;
  const playerData = { roomId:roomId, points:0 };
  await cache.set(`player-${player}`, playerData);
}

export default onJoin;