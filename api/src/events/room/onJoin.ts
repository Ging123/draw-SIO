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
  let thisPlayerCreateTheRoom = false;
  const player = socket.data.username;

  if(!freeRoom) {
    freeRoom = await room.create(player);
    thisPlayerCreateTheRoom = true;
  }

  else await updater.addPlayerToRoom(freeRoom.id, player);
  await emmitThatPlayerJoinIn(socket, freeRoom);
  emmitPlayersInTheRoom(socket, io, freeRoom);
  if(thisPlayerCreateTheRoom) emmitAnswer(socket, io, freeRoom);
}

async function emmitThatPlayerJoinIn(socket:Socket, freeRoom:room) {
  const player = socket.data.username;
  const playerJoinMessage = `${player} entrou no jogo`;
  const answer = freeRoom.answer;
  const roomId = freeRoom.id;

  await socket.join(roomId);
  await socket.join(player);
  const data = {
    message:playerJoinMessage,
    player:player
  }

  socket.data.score = 0;
  socket.data.answer = answer;
  socket.data.roomId = roomId;

  socket.broadcast.to(roomId).emit('new_player_joined', data);
}

function emmitPlayersInTheRoom(socket:Socket, io:io, freeRoom:room) {
  const player = socket.data.username;
  const playersInTheRoom = freeRoom.players.filter((name) => name !== player);
  const whoIsDrawing = freeRoom.players[freeRoom.drawer];

  const data = {
    clientUsername:player,
    players:playersInTheRoom,
    whoIsDrawing:whoIsDrawing
  }

  io.sockets.in(player).emit("you_has_join_a_room", data); 
}

function emmitAnswer(socket:Socket, io:io, roomData:room) {
  const player = socket.data.username;
  const answer = roomData.answer;
  const data = {
    answer:answer,
    drawer:player
  }

  socket.data.isDrawing = true;
  io.sockets.in(player).emit("draw_time", data); 
  
  startCountTime(socket, roomData);
}

export default onJoin;