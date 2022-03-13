import Cache from "../../externals/cache";

export interface player {
  username:string;
  score:number;
  alreadyEarnScore:boolean;
}

export interface room {
  answer:string;
  id:string;
  players:player[];
  roundStartTime:number;
  whoIsDrawing:string;
  nextToDraw:string;
}

class Base {

  protected readonly cache = new Cache();
  

  protected async getRoom(id:string):Promise<room|undefined> {
    const room = await this.cache.get(`room-${id}`);
    return room;
  }


  protected async getAllRooms():Promise<string[]|undefined> {
    const allRooms = await this.cache.get(`rooms`);
    return allRooms;
  }


  protected async saveRoom(room:room) {
    await this.cache.set(`room-${room.id}`, room);
  }

  
  protected async saveRoomId(id:string) {
    const roomsId:string[] = await this.cache.get('rooms') || [];
    roomsId.push(id);
    await this.cache.set('rooms', roomsId);
  }


  protected getWhoIsDrawingData(room:room) {
    let index = 0;
    for(const player of room.players) {
      const thisPlayerIsDrawing = player.username === room.whoIsDrawing;
      if(thisPlayerIsDrawing) return this.playerData(player, index);
      index++;
    }
  }


  protected getPlayer(room:room, playerToGet:string) {
    let index = 0;
    for(const player of room.players) {
      const thisIsThePlayerToGet = player.username === playerToGet;
      if(thisIsThePlayerToGet) return this.playerData(player, index);
      index++;
    }
  }


  private playerData(player:player, index:number) {
    return {
      data:player,
      index:index
    }
  }
}

export default Base;