import { room, player } from "../use_cases/room/base";

export function getWhoIsDrawingData(room:room) {
  let index = 0;
  for(const player of room.players) {
    const thisPlayerIsDrawing = player.username === room.whoIsDrawing;
    if(thisPlayerIsDrawing) return playerData(player, index);
    index++;
  }
}


function playerData(player:player, index:number) {
  return {
    data:player,
    index:index
  }
}


export function allPlayersEarnScore(room:room) {
  if(room.players.length === 1) return false;
  
  for(const player of room.players) {
    const playerEarnScore = playerAlreadyEarnScore(room, player);
    if(!playerEarnScore) return false;
  }
  return true;
}


function playerAlreadyEarnScore(room:room, player:player) {
  const isDrawing = player.username === room.whoIsDrawing;
  if(!isDrawing) return player.alreadyEarnScore;
  return true;
}