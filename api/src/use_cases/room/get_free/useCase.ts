import Base from "../base";

class GetFreeRoomUseCase extends Base {

  public async getFreeRoom() {
    await this.cache.connect();
    const allRooms = await this.getAllRooms();
    if(!allRooms) return await this.cache.quit();

    const freeRoom = await this.getAFreeRoom(allRooms);
    await this.cache.quit();
    return freeRoom;
  }


  private async getAFreeRoom(rooms:string[]) {
    for(const id of rooms) {
      const room = await this.verifyIfRoomHaveSpace(id);
      if(!room) continue;
      if(room.haveSpace) return room.data;
    } 
  }
  

  private async verifyIfRoomHaveSpace(id:string) {
    const maxPlayerAllowed = 10;
    const room = await this.getRoom(id);
    if(!room) return false;
    const quantityOfPlayers = room.players.length;

    return {
      data:room,
      haveSpace: quantityOfPlayers < maxPlayerAllowed
    };
  }
}

export default GetFreeRoomUseCase;