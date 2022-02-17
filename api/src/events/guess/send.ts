import { socket } from "../../../socket";
import xss from "xss";

async function sendGuess(socket:socket, roomId:string, guess:string) {
  guess = xss(guess);
  const username = socket.data.username;
  const guessData = { guess:guess, username:username }
  socket.broadcast.to(roomId).emit("player_send_a_guess", guessData);
}

export default sendGuess;