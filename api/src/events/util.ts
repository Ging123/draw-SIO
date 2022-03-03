import { Socket } from "socket.io";
import { io } from "../../socket";
import Cache from "../externals/cache";
import { room } from "../use_cases/room/base";
import SetRoundStatusUseCase from "../use_cases/room/set_round_status/useCase";

const  cache = new Cache();

export async function getRoom(id:string) {
  await cache.connect();
  const room = await cache.get(`room-${id}`);
  await cache.quit();
  return room;
}

export async function startCountTime(io:io, roomData:room) {
  if(roomData.roundStart) return;
  const oneMinute = 60000;
  const round = new SetRoundStatusUseCase();

  roomData = await round.setStatus(roomData, true);
  io.sockets.in(roomData.id).emit('round_start', roomData.roundStartTime);

  setTimeout(async () => {
    await round.setStatus(roomData, false);
    io.sockets.in(roomData.id).emit('round_end');
  }, oneMinute);
}