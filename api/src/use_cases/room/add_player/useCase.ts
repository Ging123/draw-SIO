import Base, { room } from "../base";

class AddPlayerToRoomUseCase extends Base {

  public async addPlayer(player:string, roomId:string) {
    await this.cache.connect();
    const room = await this.getRoom(roomId);
    if(!room) return await this.cache.quit();
    
    this.addPlayerToRoom(room, player);
    await this.saveRoom(room);
    await this.cache.quit();

    return room;
  }


  private addPlayerToRoom(room:room, player:string) {
    room.players.push({
      username:player, 
      score:0,
      alreadyEarnScore:false
    });
  }
}

export default AddPlayerToRoomUseCase;