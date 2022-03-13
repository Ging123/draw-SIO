import Base from "../base";

class DeleteRoomUseCase extends Base {

  public async delete(roomId:string) {
    await this.cache.connect();
    await this.deleteIdFromListOfRoomsId(roomId);
    await this.deleteRoom(roomId);
    await this.cache.quit();
  }


  private async deleteIdFromListOfRoomsId(idToRemove:string) {
    let roomsIds = await this.getAllRooms();
    if(!roomsIds) return;
    roomsIds = roomsIds.filter((savedId) => savedId !== idToRemove);
    await this.cache.set(`rooms`, roomsIds);
  }


  private async deleteRoom(roomId:string) {
    await this.cache.deleteOne(`room-${roomId}`);
  }
}

export default DeleteRoomUseCase;