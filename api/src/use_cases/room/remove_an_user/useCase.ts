import Base from "../base";

class RemoveAnUserFromRoomUseCase extends Base {

  public async removeAnUser(usernameOfWhoWillBeRemoved:string, roomId:string) {
    let room = await this.room.findById(roomId);
    if(!room) return;
    if(room.players.length < 2) return await this.room.deleteById(room._id);
    room = await this.room.removeAnUser(room, usernameOfWhoWillBeRemoved);
    return room; 
  }
}

export default RemoveAnUserFromRoomUseCase;