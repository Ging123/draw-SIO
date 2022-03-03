import Cache from "../../externals/cache";

export interface room {
  answer:string;
  drawer:number;
  id:string; 
  players:string[];
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