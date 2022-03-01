import { Socket } from "socket.io";
import RemovePlayerOfARoomUseCase from "../../use_cases/room/remove_player/useCase";
import DeleteRoomUseCase from "../../use_cases/room/delete/useCase";

async function onDisconnect(socket:Socket) {
  const player = new RemovePlayerOfARoomUseCase();
  const emptyRoom = new DeleteRoomUseCase()
  const playerName = socket.data.username;
  const roomId = socket.data.roomId;
  const room = await player.remove(roomId, playerName);

  if(!room) return;
  if(room.players.length === 0) return await emptyRoom.delete(room.id);
  await emitPlayerLeft(socket, roomId);
}

async function emitPlayerLeft(socket:Socket, roomId:string) {
  const player = socket.data.username;
  const playerLeftTheGame = `${player} saiu da sala`;
  socket.broadcast.to(roomId).emit("player_exist", playerLeftTheGame);
}

export default onDisconnect;