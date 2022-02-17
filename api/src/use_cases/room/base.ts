import RoomRepository from "../../repositories/roomRepository";

class Base {
  
  protected readonly room = new RoomRepository();
  
}

export default Base;