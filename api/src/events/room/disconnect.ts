import RemoveAnUserFromRoomUseCase from "../../use_cases/room/remove_an_user/useCase";
import { socket } from "../../../socket";

async function disconectFromRoom(socket:socket, roomId:string) {
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

export default disconectFromRoom;