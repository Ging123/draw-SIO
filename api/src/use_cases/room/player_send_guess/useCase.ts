import Base, { room, player } from "../base";

export interface guessStatus {
  roomData?:room,
  guessIsRight:boolean,
  canSendGuess:boolean,
  playerIndex:number
}

class PlayerSendGuessUseCase extends Base {

  private player:string;


  constructor(player:string) {
    super();
    this.player = player;
  }

  
  public async sendGuess(guess:string, roomId:string) {
    await this.cache.connect();
    const room = await this.getRoom(roomId);
    if(!guess || !room) return await this.guessStatus();

    const canGuess = this.playerCanGuess(room);
    if(!canGuess) return await this.guessStatus();
    const guessIsRight = guess === room.answer;

    if(!guessIsRight) return await this.guessStatus(room, false, true);
    return await this.makePlayerAndWhoIsDrawingEarnScore(room, this.player);
  }


  //METHODS TO VERIFY IF PLAYER CAN DRAW
  private playerCanGuess(room:room) {
    const player = this.getPlayerData(room, this.player);
    const thisPlayerIsDrawing = this.verifyIfPlayerIsDrawing(room, player);
    if(player.alreadyEarnScore || thisPlayerIsDrawing) return false;
    return true;
  }


  private verifyIfPlayerIsDrawing(room:room, player:player) {
    const whoIsDrawing = this.getWhoIsDrawingData(room); 
    let thisPlayerIsDrawing = false;
    if(whoIsDrawing) {
      thisPlayerIsDrawing = whoIsDrawing.data.username === player.username;
    }
    return thisPlayerIsDrawing;
  } 


  //METHODS TO MAKE PLAYER AND WHO IS DRAWING TO EARN SCORE
  private async makePlayerAndWhoIsDrawingEarnScore(room:room, player:string) {
    this.makePlayerEarnScore(room, player);
    this.makeWhoIsDrawingEarnScore(room);
    await this.saveRoom(room);
    return await this.guessStatus(room, true);
  }


  private makePlayerEarnScore(room:room, player:string) {
    const indexOfPlayer = this.getPlayerIndex(room, player);
    room.players[indexOfPlayer].alreadyEarnScore = true;
    room.players[indexOfPlayer].score += 10;
  }


  private makeWhoIsDrawingEarnScore(room:room) {
    const whoIsDrawing = this.getWhoIsDrawingData(room);
    if(!whoIsDrawing) return;
    const whoIsDrawingIndex = whoIsDrawing.index;
    const scoreToEarn = this.calculateScoreForWhoIsDrawingToEarn(room);
    room.players[whoIsDrawingIndex].score += scoreToEarn;
  }


  private calculateScoreForWhoIsDrawingToEarn(room:room) {
    const quantityOfPlayers = room.players.length;
    const scoreToEarn = 20 / quantityOfPlayers;
    return scoreToEarn;
  }


  private async guessStatus(room?:room, guessIsRight=false, canSendGuess=false) {
    await this.cache.quit();

    return {
      roomData:room,
      guessIsRight:guessIsRight,
      canSendGuess:canSendGuess,
      playerIndex:this.getPlayerIndex(room!, this.player)
    }
  }


  //UTIL METHODS
  private getPlayerIndex(room:room, player:string) {
    if(!room) return -1;
    const quantityOfPlayers = room.players.length;

    for(let i = 0; i < quantityOfPlayers; i++) {
      const isThisPlayer = player === room.players[i].username;
      if(isThisPlayer) return i;
    }

    return -1;
  }


  private getPlayerData(room:room, player:string) {
    const playerIndex = this.getPlayerIndex(room, player);
    const data = room.players[playerIndex];
    return data;
  }
}

export default PlayerSendGuessUseCase;