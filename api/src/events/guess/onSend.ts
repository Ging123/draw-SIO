import { Socket } from "socket.io";
import xss from "xss";
import { io } from "../../../socket";
import { room } from "../../use_cases/room/base";
import PlayerSendGuessUseCase, { guessStatus } from "../../use_cases/room/player_send_guess/useCase";
import { getWhoIsDrawingData } from "../util";

class OnGuessEvent {

  private socket:Socket;
  private io:io;
  private roomId:string;
  private player:string;

  
  constructor(socket:Socket, io:io) {
    this.socket = socket;
    this.io = io;
    this.roomId = socket.data.roomId;
    this.player = socket.data.username;
  }


  public async onSendGuess(guess:string) {
    guess = this.sanitazeGuess(guess);
    const player = await this.validatePlayerGuess(guess);
    const answerIsRight = !player.canSendGuess && player.guessIsRight;

    if(answerIsRight) return this.emitThatPlayerEarnScore(player);
    if(!player.canSendGuess) return;
    if(!player.guessIsRight) return this.emitGuess(guess);
  }


  private sanitazeGuess(guess:string) {
    const sanitazedGuess = xss(guess);
    return sanitazedGuess;
  }


  private async validatePlayerGuess(guess:string) {
    const room = new PlayerSendGuessUseCase(this.player);
    const guessStatus = await room.sendGuess(guess, this.roomId);
    return guessStatus;
  }

  
  private emitGuess(guess:string) {
    const data = {
      guess:guess, 
      username:this.player
    }

    this.socket.broadcast.to(this.roomId).emit("player_send_a_guess", data);
  }


  private emitThatPlayerEarnScore(player:guessStatus) {
    const data = this.getDataToEmitIfPlayerHasRightGuess(player);
    this.io.sockets.in(this.roomId).emit("player_earn_score", data);
  }


  private getDataToEmitIfPlayerHasRightGuess(player:guessStatus) {
    const playerScore = this.getPlayerScore(player);
    const whoIsDrawingData = this.getWhoIsDrawingData(player.roomData!);

    return {
      player: this.player,
      score:playerScore,
      whoIsDrawing: whoIsDrawingData
    }
  }

  
  private getPlayerScore(player:guessStatus) {
    const playerIndex = player.playerIndex;
    const room = player.roomData!;
    const score = room.players[playerIndex].score;
    return score;
  }


  private getWhoIsDrawingData(room:room) {
    const whoIsDrawing = getWhoIsDrawingData(room);

    return {
      player:whoIsDrawing!.data.username,
      score:whoIsDrawing!.data.score
    }
  }
}

export default OnGuessEvent;