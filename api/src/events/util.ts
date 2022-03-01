import { Socket } from "socket.io";
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

export function startCountTime(socket:Socket, roomData:room) {
  if(roomData.roundStart) return;
  const oneMinute = 60000;
  const round = new SetRoundStatusUseCase();
  round.setStatus(roomData, true);

  setTimeout(() => {
    round.setStatus(roomData, false);
    socket.to(roomData.id).emit('round_end');
  }, oneMinute);
}