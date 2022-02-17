import RoomModel from '../models/roomModel';

class RoomRepository extends RoomModel { 

  public async create(playerUsername:string) {
    const room = this.createRoom(playerUsername);
    await room.save();
    return room;
  }

  public async addNewPlayer(room:any, playerUsername:string) {
    room.players.push(playerUsername);
    await room.save();
    return room;
  }

  public async getAFreeRoom() {
    return await this.roomModel.findOne({"players.10": { $exists:false }})
  }

} 

export default RoomRepository; 