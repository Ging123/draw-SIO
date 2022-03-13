import Base, { player, room } from "../base";

class RemovePlayerFromRoomUseCase extends Base {

  public async removePlayer(player:string, roomId:string) {
    await this.cache.connect();
    const room = await this.getRoom(roomId);
    if(!room) return;

    this.setNextPlayerToDrawIfNeeded(room, player);

    this.removePlayerFromRoom(player, room);
    await this.saveRoom(room);
    await this.cache.quit();

    return room;
  }


  private setNextPlayerToDrawIfNeeded(room:room, player:string) {
    const playerToLeave = this.getPlayer(room, player);
    if(!playerToLeave) return;
    const playerToLeaveData = playerToLeave.data;
    const playerIsDrawing = this.playerIsDrawing(room, playerToLeave.data);

    if(playerIsDrawing) return this.setNextPlayerToDraw(room, playerToLeave);
    const playerWillDrawNext = this.playerIsTheNextToDraw(room, playerToLeaveData);
    if(playerWillDrawNext) return this.setNextPlayerToDraw(room, playerToLeave);

    return;
  }


  private playerIsDrawing(room:room, player:player) {
    const whoIsDrawing = this.getWhoIsDrawingData(room);
    if(!whoIsDrawing) return false;
    return whoIsDrawing.data.username === player.username;
  }


  private setNextPlayerToDraw(room:room, playerToLeave:any) {
    const quantityOfPlayers = room.players.length;
    const playerToLeaveIndex = playerToLeave.index;
    const isTheLastInTheList = playerToLeaveIndex + 1 === quantityOfPlayers;

    const nextPlayerInTheList = room.players[playerToLeaveIndex + 1];
    const firstPlayerInTheList = room.players[0].username;

    if(isTheLastInTheList) return room.nextToDraw = firstPlayerInTheList;
    room.nextToDraw = nextPlayerInTheList.username;
  }


  private playerIsTheNextToDraw(room:room, player:player) {
    const nextToDraw = room.nextToDraw;
    if(!nextToDraw) return false;
    return nextToDraw === player.username;
  }


  private removePlayerFromRoom(playerToRemove:string, room:room) {
    room.players = room.players.filter((player) => {
      return player.username !== playerToRemove;
    });
  }
}

export default RemovePlayerFromRoomUseCase;