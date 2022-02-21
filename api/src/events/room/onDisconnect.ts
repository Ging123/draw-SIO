import RemoveAnUserFromRoomUseCase from "../../use_cases/room/remove_an_user/useCase";
import Cache from "../../externals/cache";
import { Socket } from "socket.io";
import RoomRepository from "../../repositories/roomRepository";

const cache = new Cache();

async function onDisconnect(socket:Socket) {
  await cache.connect();
  const roomId:string = await removePlayerFromCache(socket);
  const room = await removePlayerFromDb(socket, roomId);
  await deleteRoomIfDoesntHavePlayers(room);
  await emitPlayerLeft(socket, roomId);
  await cache.quit();
}

async function removePlayerFromCache(socket:Socket) {
  const player = socket.data.username;
  const playerData = await cache.get(`player-${player}`);
  await cache.deleteOne(`player-${player}`);
  return playerData.roomId;
}

async function removePlayerFromDb(socket:Socket, roomId:string) {
  const room = new RemoveAnUserFromRoomUseCase();
  const playerToRemove = socket.data.username;
  return await room.removeAnUser(playerToRemove, roomId);
}

async function deleteRoomIfDoesntHavePlayers(roomData:any) {
  const room = new RoomRepository();
  const roomDontHavePlayers = roomData.players.length < 1;
  const roomId = roomData._id;
  if(roomDontHavePlayers) await room.deleteById(roomId);
}

async function emitPlayerLeft(socket:Socket, roomId:string) {
  const player = socket.data.username;
  const playerLeftTheGame = `${player} saiu da sala`;
  await socket.leave(roomId);
  socket.broadcast.to(roomId).emit("player_exist", playerLeftTheGame);
}

export default onDisconnect;