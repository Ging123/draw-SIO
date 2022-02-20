import RemoveAnUserFromRoomUseCase from "../../use_cases/room/remove_an_user/useCase";
import Cache from "../../externals/cache";
import { socket } from "../../../socket";

async function disconectFromRoom(socket:socket, roomId:string) {
  await removeUserFromRoomCache(roomId);
  const room = await removeUserFromRoom(socket, roomId);
  if(!room) return;
  const roomDontHavePlayers = room.players.length === 0;
  if(roomDontHavePlayers) return;
  sendMessageThatPlayerLeft(socket, roomId);
}

async function removeUserFromRoom(socket:socket, roomId:string) {
  const room = new RemoveAnUserFromRoomUseCase(); 
  const usernameOfWhoExist = socket.data.username;
  return await room.removeAnUser(usernameOfWhoExist, roomId);
}

function sendMessageThatPlayerLeft(socket:socket, roomId:string) {
  const usernameOfWhoExist = socket.data.username;
  const playerExistMessage = `${usernameOfWhoExist} saiu da sala`;
  socket.broadcast.to(roomId).emit("player_exist", playerExistMessage);
}

async function removeUserFromRoomCache(roomId:string) {
  const cache = new Cache();
  await cache.connect();
  const roomData = await cache.get(`${roomId}-room`);
  if(!roomData) return;
  roomData.quantityOfPlayers = -1;
  if(roomData.quantityOfPlayers < 0) return await cache.deleteOne(`${roomId}-room`);
  await cache.set(`${roomId}-room`, roomData);
  await cache.quit();
}

export default disconectFromRoom;