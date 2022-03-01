import Base, { room } from "../base";

class SetRoundStatusUseCase extends Base {

  public async setStatus(room:room, roundStart:boolean) {
    await this.cache.connect();
    const roomId = room.id;
    room.roundStart = roundStart;

    await this.cache.set(`room-${roomId}`, room);
    await this.cache.quit();
  }
}

export default SetRoundStatusUseCase;