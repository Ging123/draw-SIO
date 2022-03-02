import Base, { room } from "../base";

class AddPlayerToRoomUseCase extends Base {

  public async addPlayerToRoom(id:string, player:string) {
    await this.cache.connect();
    const room = await this.getRoom(id);
    if(!room) return false;

    const alreadyHasThisPlayer = this.verifyIfAlreadyHasThisPlayer(room, player);
    if(alreadyHasThisPlayer) return false;

    await this.addPlayerInTheRoom(room, player);
    await this.cache.quit();
    return true;
  }

  private verifyIfAlreadyHasThisPlayer(room:room, player:string) {
    for(const playerSaved of room.players) {
      if(playerSaved === player) return true;
    }
    return false;
  }

  private async addPlayerInTheRoom(room:room, player:string) {
    room.players.push(player);
    await this.cache.set(`room-${room.id}`, room);
  }
}

export default AddPlayerToRoomUseCase;