import Base from "../base";

class DeleteRoomUseCase extends Base {

  public async delete(roomId:string) {
    await this.cache.connect();
    await this.cache.deleteOne(`room-${roomId}`);
    await this.deleteRoomIdInCache(roomId);
    await this.cache.quit();
  }

  private async deleteRoomIdInCache(idToRemove:string) {
    const rooms:string[] = await this.cache.get('rooms');
    const updatedRooms = rooms.filter(id => id !== idToRemove);
    if(updatedRooms.length === 0) return await this.cache.deleteOne('rooms');
    await this.cache.set('rooms', updatedRooms);
  }
}

export default DeleteRoomUseCase;