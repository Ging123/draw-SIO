import Cache from "../../externals/cache";

interface player {
  username:string;
  score:number;
}

export interface room {
  answer:string;
  drawer:number;
  id:string; 
  players:player[];
  roundStartTime?:number;
  roundStart:boolean;
}

class Base {
  
  protected readonly cache = new Cache();
  
  protected async getRoom(id:string) {
    const room:room = await this.cache.get(`room-${id}`);
    return room;
  }
}

export default Base;