import mongoose from 'mongoose';
const Schema = mongoose.Schema;

class RoomModel { 
  
  private readonly roomSchema = new Schema({
    players: {
      type:Array
    }
  },
  {
    timestamps:true
  });

  protected readonly roomModel = mongoose.models.room || mongoose.model('room', this.roomSchema);

  protected createRoom(playerUsername:string) {
    return new this.roomModel({
      players:[playerUsername]
    });
  }
} 

export default RoomModel; 