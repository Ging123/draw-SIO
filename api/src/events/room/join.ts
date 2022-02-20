import RoomRepository from "../../repositories/roomRepository";
import Cache from "../../externals/cache";
import { io, socket } from "../../../socket";
import DateUtil from "../../util/date";
import randomName from "../../util/randomName";
import { Socket } from "socket.io";

const room = new RoomRepository();
const cache = new Cache();

async function joinARoom(socket:socket, io:io) {
  const foundRoom = await room.getAFreeRoom();
  if(foundRoom) return await connectPlayerToRoom(socket, foundRoom, io);
  return await createNewRoom(socket, io);
}

async function connectPlayerToRoom(socket:socket, roomToConnect:any, io:io) {
  const user = socket.data;
  await room.addNewPlayer(roomToConnect, user.username);
  return await joinRoomInSocket(socket, roomToConnect._id, io);
}

async function createNewRoom(socket:socket, io:io) {
  const user = socket.data;
  const createdRoom = await room.create(user.username);
  return await joinRoomInSocket(socket, createdRoom._id, io);
}

async function joinRoomInSocket(socket:socket, roomId:any, io:io) {
  roomId = roomId.toString();
  const user = socket.data;
  const playerJoinMessage = `${user.username} entrou no jogo`;
  await socket.join(roomId);
  socket.broadcast.to(roomId).emit("new_player_joined", playerJoinMessage);
  await saveUserInCacheOfRoom(socket, roomId, io);
  return roomId;
}

async function saveUserInCacheOfRoom(socket:Socket, roomId:string, io:io) {
  await cache.connect();
  const roomData = await cache.get(`${roomId}-room`);
  if(roomData) await updateRoomCache(roomId, roomData);
  else await createRoomCache(roomId, socket, io);
  await cache.quit();
}

async function updateRoomCache(roomId:string, roomData:any) {
  roomData.quantityOfPlayers += 1;
  await cache.set(`${roomId}-room`, roomData);
}

async function createRoomCache(roomId:string, socket:Socket, io:io) {
  const date = new DateUtil();
  const answer = randomName();
  await socket.join(socket.data.username);
  const roomData = {
    indexOfWhoWillDraw:0,
    timeThatRoundStart:date.getCurrentTime(),
    answer:answer,
    quantityOfPlayers:1
  }
  await cache.set(`${roomId}-room`, roomData);
  io.sockets.in(socket.data.username).emit("draw_time", answer); 
}

export default joinARoom;