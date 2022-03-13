import RemovePlayerFromRoomUseCase from "../../use_cases/room/remove_player/useCase";
import { Socket } from "socket.io";

class OnDisconnectEvent {

  private socket:Socket;
  private player:string;
  private roomId:string;


  constructor(socket:Socket) {
    this.socket = socket;
    this.player = socket.data.username;
    this.roomId = socket.data.roomId;
  }


  public async onDisconnect() {
    await this.socketDisconnectFromRooms();
    await this.removePlayerFromCache();
    this.emitThatPlayerHasLeft();
  }


  private async socketDisconnectFromRooms() {
    await this.socket.leave(this.roomId);
    await this.socket.leave(this.player);
  }

  
  private async removePlayerFromCache() {
    const room = new RemovePlayerFromRoomUseCase();
    await room.removePlayer(this.player, this.roomId);
  }


  private emitThatPlayerHasLeft() {
    this.socket.broadcast.to(this.roomId).emit("player_exist", this.player);
  }
}

export default OnDisconnectEvent;