import Base, { room } from "../base";

class AddScoreToPlayersInRoomUseCase extends Base {

  public async addScore(playerWhoEarnScore:string, roomId:string) {
    await this.cache.connect();
    const room = await this.getRoom(roomId);
    const whoIsDrawing = room.players[room.drawer].username;

    if(whoIsDrawing === playerWhoEarnScore) return room;
    this.addScoresToPlayerAndWhoIsDrawing(room, playerWhoEarnScore);

    await this.cache.set(`room-${room.id}`, room);
    await this.cache.quit();
    return room;
  }

  private addScoresToPlayerAndWhoIsDrawing(room:room, playerWhoEarnScore:string) {
    for(const player of room.players) {
      if(player.username === playerWhoEarnScore) {
        player.score += 10;
        break;
      }
    }
    this.addScoreForWhoIsDrawing(room);
  }

  private addScoreForWhoIsDrawing(room:room) {
    const playersQuantity = room.players.length;
    const scoreForWhoIsDrawingToEarn = Math.round(20 / playersQuantity); 
    const indexOfWhoIsDrawing = room.drawer;
    room.players[indexOfWhoIsDrawing].score += scoreForWhoIsDrawingToEarn;
  }
}

export default AddScoreToPlayersInRoomUseCase;