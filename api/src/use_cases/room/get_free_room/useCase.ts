import Base from "../base";

class GetAFreeRoomUseCase extends Base {
  
  public async getAFreeRoom() {
    const rooms = await this.getAllRooms();
    if(!rooms) return await this.cache.quit();
    if(rooms.length === 0) return await this.cache.quit();
    const freeRoom = await this.selectAFreeRoom(rooms);
    await this.cache.quit();
    return freeRoom;
  }

  private async getAllRooms() {
    await this.cache.connect();
    const rooms = await this.cache.get(`rooms`);
    return rooms;
  }

  private async selectAFreeRoom(rooms:string[]) {
    for(const id of rooms) {
      const room = await this.getRoom(id);
      
      if(room) {
        const roomHaveFreeSpace = room.players.length < 10;
        if(roomHaveFreeSpace) return room;
      }
    }
  }
}

export default GetAFreeRoomUseCase;