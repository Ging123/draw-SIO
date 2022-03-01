import randomName from "../../../util/randomName";
import Base, { room } from "../base";

class CreateNewRoundUseCase extends Base {

  public async createNewRound(room:room) {
    room.answer = randomName();
    room.drawer = this.getNextDrawer(room);
    await this.saveNewRoundData(room);
    return room;
  }

  private getNextDrawer(room:room) {
    const length = room.players.length;
    const firstPlayer = 0, nextPlayer = room.drawer + 1;
    const isTheLastDrawer = room.drawer + 1 === length;
    
    if(isTheLastDrawer) return firstPlayer;
    return nextPlayer;
  }

  private async saveNewRoundData(room:room) {
    await this.cache.connect();
    await this.cache.set(`room-${room.id}`, room);
    await this.cache.quit();
  }
}

export default CreateNewRoundUseCase;