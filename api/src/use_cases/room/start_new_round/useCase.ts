import randomName from "../../../util/randomName";
import Base, { player, room } from "../base";

class StartNewRoundInARoomUseCase extends Base {

  public async startNewRound(roomId:string) {
    await this.cache.connect();
    const room = await this.getRoom(roomId);
    if(!room) return;
    
    this.setNewDataForNewRound(room);
    await this.saveRoom(room);
    await this.cache.quit();

    return room;
  }


  private setNewDataForNewRound(room:room) {
    const currentTime = new Date().getTime();
    room.answer = this.getNewAnswer(room.answer);
    room.players = room.players.map(this.allowPlayersToGuess);
    room.roundStartTime = currentTime;
    room.whoIsDrawing = this.getNextPersonWhoWillDraw(room);
  }

  
  private getNewAnswer(oldAnswer:string) {
    const hasNotADifferentAnswer = true;
    let newAnswer = '';

    while(hasNotADifferentAnswer) {
      newAnswer = randomName();
      if(newAnswer !== oldAnswer) break;
    }

    return newAnswer;
  }


  private allowPlayersToGuess(player:player) {
    player.alreadyEarnScore = false;
    return player;
  }

  
  private getNextPersonWhoWillDraw(room:room) {
    const whoIsDrawing = this.getWhoIsDrawingData(room);
    if(!whoIsDrawing) return room.nextToDraw;
    return this.getNextPlayerInTheQueueToDraw(whoIsDrawing, room);
  }


  private getNextPlayerInTheQueueToDraw(whoIsDrawing:any, room:room) {
    const quantityOfPlayers = room.players.length;
    const isTheLastInTheList = whoIsDrawing.index + 1 === quantityOfPlayers;
    const nextPlayerInTheList = room.players[whoIsDrawing.index + 1];

    const firstPlayerInTheList = room.players[0].username;
    if(isTheLastInTheList) return firstPlayerInTheList;
    return nextPlayerInTheList.username;
  }
}

export default StartNewRoundInARoomUseCase;