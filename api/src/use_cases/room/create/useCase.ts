import randomName from "../../../util/randomName";
import Base, { player, room } from "../base";
import { v4 as uuidv4 } from 'uuid';

class CreateRoomUseCase extends Base {

  public async create(firstPlayer:string) {
    const player = this.playerDataToCreate(firstPlayer);
    const room = this.createRoom(player);
    await this.saveCreatedRoom(room);
    return room;
  }


  private playerDataToCreate(username:string):player {
    return {
      username:username,
      score:0,
      alreadyEarnScore:false
    }
  }


  private createRoom(player:player):room {
    const timeThatRoomWasCreated = new Date().getTime();

    return {
      answer:randomName(),
      id: uuidv4(),
      players: [ player ],
      roundStartTime: timeThatRoomWasCreated,
      whoIsDrawing: player.username,
      nextToDraw:""
    }
  }
  
  
  private async saveCreatedRoom(room:room) {
    await this.cache.connect();
    await this.saveRoom(room);
    await this.saveRoomId(room.id);
    await this.cache.quit();
  }
}

export default CreateRoomUseCase;