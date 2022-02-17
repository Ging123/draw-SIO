import RoomRepository from "../../repositories/roomRepository";
import { socket } from "../../../socket";

const room = new RoomRepository();

async function joinARoom(socket:socket) {
  const foundRoom = await room.getAFreeRoom();
  if(foundRoom) return await connectPlayerToRoom(socket, foundRoom);
  return await createNewRoom(socket);
}

async function connectPlayerToRoom(socket:socket, roomToConnect:any) {
  const user = socket.data;
  await room.addNewPlayer(roomToConnect, user.username);
  return await joinRoomInSocket(socket, roomToConnect._id);
}

async function createNewRoom(socket:socket) {
  const user = socket.data;
  const createdRoom = await room.create(user.username);
  return await joinRoomInSocket(socket, createdRoom._id);
}

async function joinRoomInSocket(socket:socket, roomId:any) {
  roomId = roomId.toString();
  const user = socket.data;
  const playerJoinMessage = `${user.username} entrou no jogo`;
  await socket.join(roomId);
  socket.broadcast.to(roomId).emit("new_player_joined", playerJoinMessage);
  return roomId;
}

export default joinARoom;