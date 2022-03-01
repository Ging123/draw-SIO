import { Socket } from "socket.io";
import xss from "xss";
import { io } from "../../../socket";

async function onSendGuess(socket:Socket, io:io, guess:string) {
  if(socket.data.alreadyEarnScore) return;
  
  guess = xss(guess);
  const player = socket.data.username;
  const roomId = socket.data.roomId;
  const guessData = { guess:guess, username:player };
  const guessIsRight = socket.data.answer === guess;

  if(guessIsRight) {
    socket.data.alreadyEarnScore = true;
    const score = socket.data.score += 10;
    return io.sockets.in(player).emit("guess_is_right", score);
  } 

  socket.broadcast.to(roomId).emit("player_send_a_guess", guessData);
}

export default onSendGuess;