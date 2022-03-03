import { v4 as uuidv4 } from 'uuid';
import randomName from '../../../util/randomName';
import Base from '../base';

class CreateRoomUseCase extends Base {

  public async create(creator:string) {
    await this.cache.connect();
    const id = await this.createAnId();
    const room = await this.createRoom(id, creator);

    await this.saveRoomId(id);
    await this.cache.quit();
    return room;
  }

  private async createAnId() {
    let id = '';
    const idIsNotUnique = true;

    while(idIsNotUnique) {
      id = uuidv4();
      const idIsUnique = await this.verifyIfIdIsUnique(id);
      if(idIsUnique) break;
    }

    return id;
  }

  private async verifyIfIdIsUnique(id:string) {
    const thisIdExists = await this.cache.get(`room-${id}`);
    if(thisIdExists) return false;
    return true;
  }

  private async createRoom(id:string, creator:string) {
    const roomData = { 
      answer:randomName(),
      drawer:0,
      id:id, 
      players:[ { username:creator, score:0 } ],
      roundStart:false
    }
    await this.cache.set(`room-${id}`, roomData);
    return roomData;
  }

  private async saveRoomId(id:string) {
    const roomIds:string[] = await this.getRoomIds();
    roomIds.push(id);
    await this.cache.set('rooms', roomIds);
  }

  private async getRoomIds() {
    const roomIds = await this.cache.get('rooms');
    if(roomIds) return roomIds;
    return []; 
  }
}

export default CreateRoomUseCase;