import { Socket } from "socket.io";
import xss from "xss";
import { io } from "../../../socket";
import AddScoreToPlayersInRoomUseCase from "../../use_cases/room/add_score_to_players/useCase";

async function onSendGuess(socket:Socket, io:io, guess:string) {
  if(socket.data.alreadyEarnScore) return;
  if(socket.data.isDrawing) return;
  
  guess = xss(guess);
  const player = socket.data.username;
  const roomId = socket.data.roomId;
  const guessData = { guess:guess, username:player };
  const guessIsRight = socket.data.answer === guess;
  const thisRoom = new AddScoreToPlayersInRoomUseCase(); 

  if(guessIsRight) {
    const room = await thisRoom.addScore(player, roomId);
    const whoIsDrawing = room.players[room.drawer];
    const data = {
      player:player,
      score:socket.data.score += 10,
      whoIsDrawing: whoIsDrawing
    }
    socket.data.alreadyEarnScore = true;

    return io.sockets.in(roomId).emit("player_earn_score", data);
  } 

  socket.broadcast.to(roomId).emit("player_send_a_guess", guessData);
}

export default onSendGuess;