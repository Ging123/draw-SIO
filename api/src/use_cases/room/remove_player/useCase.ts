import Base, { room } from "../base";

class RemovePlayerOfARoomUseCase extends Base {

  public async remove(roomId:string, player:string) {
    await this.cache.connect();
    const room = await this.getRoom(roomId);
    if(!room) return;

    const updatedRoom = await this.removePlayerOfTheRoom(room, player);
    await this.cache.quit();
    return updatedRoom;
  }

  private async removePlayerOfTheRoom(room:room, playerRemove:string) {
    const oldLength = room.players.length;
    const oldPlayers = room.players;
    const currentPlayers = oldPlayers.filter((name) => name !== playerRemove);

    room.players = currentPlayers;
    const newLength = room.players.length;
    const noPlayerWasRemoved = oldLength === newLength;

    if(noPlayerWasRemoved) return room;
    await this.cache.set(`room-${room.id}`, room);
    return room;
  }
}

export default RemovePlayerOfARoomUseCase;