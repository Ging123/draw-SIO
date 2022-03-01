import GetAFreeRoomUseCase from "../../use_cases/room/get_free_room/useCase";
import AddPlayerToRoomUseCase from "../../use_cases/room/add_player/useCase";
import CreateRoomUseCase from "../../use_cases/room/create/useCase";
import { room } from "../../use_cases/room/base";
import { io } from "../../../socket";
import { Socket } from "socket.io";
import { startCountTime } from "../util";

const roomSearcher = new GetAFreeRoomUseCase();
const room = new CreateRoomUseCase();
const updater = new AddPlayerToRoomUseCase();

async function onJoin(socket:Socket, io:io) {
  let freeRoom:any = await roomSearcher.getAFreeRoom();
  const player = socket.data.username;
  
  if(!freeRoom) freeRoom = await room.create(player);
  else await updater.addPlayerToRoom(freeRoom.id, player);

  const thisIsTheOnlyPlayerInTheRoom = freeRoom;
  await emmitThatPlayerJoinIn(socket, freeRoom.id, freeRoom);
  if(thisIsTheOnlyPlayerInTheRoom) emmitAnswer(socket, io, freeRoom);
}

async function emmitThatPlayerJoinIn(socket:Socket, roomId:string, freeRoom:room) {
  const player = socket.data.username;
  const playerJoinMessage = `${player} entrou no jogo`;
  const answer = freeRoom.answer;

  await socket.join(roomId);
  await socket.join(player);

  socket.data.score = 0;
  socket.data.answer = answer;
  socket.data.roomId = roomId;
  socket.broadcast.to(roomId).emit('new_player_joined', playerJoinMessage);
}

function emmitAnswer(socket:Socket, io:io, roomData:room) {
  const player = socket.data.username;
  const answer = roomData.answer;

  socket.data.isDrawing = true;
  io.sockets.in(player).emit("draw_time", answer); 
  
  startCountTime(socket, roomData);
}

export default onJoin;