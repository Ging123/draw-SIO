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

  public async removeAnUser(room:any, usernameToRemove:string) {
    room.players = room.players.filter((username:string) => {
      return username !== usernameToRemove
    });
    await this.roomModel.updateOne({ id:room._id, 
      $set:{ players: room.players }
    });
    return room;
  }

  public async findById(id:string) {
    return await this.roomModel.findById(id);
  }

  public async getAFreeRoom() {
    return await this.roomModel.findOne({"players.10": { $exists:false }})
  }

  public async deleteById(id:string) {
    return await this.roomModel.findByIdAndDelete(id);
  }
} 

export default RoomRepository; 