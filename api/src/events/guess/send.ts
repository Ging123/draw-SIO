import { Socket } from "socket.io";
import xss from "xss";
import Cache from "../../externals/cache";

async function onSendGuess(socket:Socket, guess:string) {
  guess = xss(guess);
  const username = socket.data.username;
  const roomId = await getRoomThatPlayerIsIn(username);
  const guessData = { guess:guess, username:username };
  socket.broadcast.to(roomId).emit("player_send_a_guess", guessData);
}

async function getRoomThatPlayerIsIn(playerUsername:string) {
  const cache = new Cache();
  await cache.connect();
  const player = await cache.get(`player-${playerUsername}`);
  const roomId = player.roomId;
  await cache.quit();
  return roomId;
}

export default onSendGuess;