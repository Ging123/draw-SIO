import { Socket } from "socket.io";
import { io } from "../../../socket";
import { room } from "../../use_cases/room/base";
import CreateNewRoundUseCase from "../../use_cases/room/create_new_round/useCase";
import { getRoom, startCountTime } from "../util";

async function onRoundEnd(socket:Socket, io:io) {
  const roomId = socket.data.roomId;
  const roomData = await getRoom(roomId);
  const roundIsNotOver = !roomData.roundStart;
  
  if(roundIsNotOver) return;
  const round = new CreateNewRoundUseCase();
  const roundData = await round.createNewRound(roomData);

  socket.data.answer = roundData.answer;
  emitNextRound(socket, roomData);
  emitAnswerIfPlayerMustDraw(socket, io, roundData);

  await startCountTime(io, roomData);
}

function emitNextRound(socket:Socket, room:room) {
  const roomId = socket.data.roomId;
  const drawer = room.players[room.drawer].username;
  socket.to(roomId).emit('new_round_start', { drawer:drawer });
}

function emitAnswerIfPlayerMustDraw(socket:Socket, io:io, room:room) {
  const player = socket.data.username;
  const drawer = room.players[room.drawer].username;
  const playerMustDraw = drawer === player;
  if(playerMustDraw) io.sockets.in(room.id).emit('draw_time', room.answer);
}

export default onRoundEnd;