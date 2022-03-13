import AddPlayerToRoomUseCase from "../../use_cases/room/add_player/useCase";
import GetFreeRoomUseCase from "../../use_cases/room/get_free/useCase";
import CreateRoomUseCase from "../../use_cases/room/create/useCase";
import { player, room } from "../../use_cases/room/base";
import { io, socket } from "../../../socket";
import Cache from "../../externals/cache";
import StartNewRoundInARoomUseCase from "../../use_cases/room/start_new_round/useCase";
import DeleteRoomUseCase from "../../use_cases/room/delete/useCase";
import { allPlayersEarnScore, getWhoIsDrawingData } from "../util";

class JoinRoomEvent {

  private socket:socket;
  private io:io;
  private player:string;
  
  constructor(socket:socket, io:io) {
    this.socket = socket;
    this.io = io;
    this.player = socket.data.username;
  }


  public async onJoin() {
    let freeRoom = await this.getFreeRoom();
    if(freeRoom) await this.joinPlayerToRoom(freeRoom);
    else await this.createRoom();
  }


  private async getFreeRoom() {
    const room = new GetFreeRoomUseCase();
    const freeRoom = await room.getFreeRoom();
    return freeRoom;
  }


  //METHODS TO JOIN A PLAYER IN A ROOM
  private async joinPlayerToRoom(freeRoom:room) {
    const room = new AddPlayerToRoomUseCase();
    await room.addPlayer(this.player, freeRoom.id);
    await this.joinSocketToRoom(freeRoom.id);

    this.setDefaultDataToSocket(freeRoom.id);
    this.emitThatNewPlayerHasJoin(freeRoom.id);
    this.emitPlayersInTheRoom(freeRoom);
  }


  private emitThatNewPlayerHasJoin(roomId:string) {
    const message = `${this.player} entrou no jogo`;
    const data = { message:message, player:this.player }
    this.socket.broadcast.to(roomId).emit('new_player_joined', data);
  }


  private emitPlayersInTheRoom(room:room) {
    const players = room.players.filter((player) => {
      return this.playerFromPlayersInRoom(player);
    });
    const whoIsDrawing = getWhoIsDrawingData(room)!.data;

    const data = {
      clientUsername:this.player,
      players:players,
      whoIsDrawing:whoIsDrawing.username,
      timeThatRoundStart:room.roundStartTime
    }

    this.io.sockets.in(this.player).emit("you_has_join_a_room", data); 
  }
  

  private playerFromPlayersInRoom(player:player) {
    const validPlayer = player.username !== this.player;
    return validPlayer;
  }


  //METHODS TO CREATE A NEW ROOM
  private async createRoom() {
    const room = new CreateRoomUseCase();
    const createdRoom = await room.create(this.player);
    await this.joinSocketToRoom(createdRoom.id);

    this.emitAnswerToPlayer(this.player, createdRoom.answer);
    this.setDefaultDataToSocket(createdRoom.id);
    this.emitPlayersInTheRoom(createdRoom);
    setTimeout(() => this.validateRound(createdRoom.id), 1000);
  }

  
  private emitAnswerToPlayer(player:string, answer:string) {
    const data = { answer:answer, drawer:player }
    this.io.sockets.in(player).emit("draw_time", data);
  }


  //UTIL METHODS
  private async joinSocketToRoom(roomId:string) {
    await this.socket.join(roomId);
    await this.socket.join(this.player);
  }


  private setDefaultDataToSocket(roomId:string) {
    this.socket.data.roomId = roomId;
  }


  private async validateRound(roomId:string, passedSeconds=0, cache?:Cache) {
    if(!cache) cache = await this.connectToCache();
    passedSeconds += 1;
    const roundTimeIsOver = this.verifyIfRoundTimeHasEnd(passedSeconds);
    const whoIsDrawingLeave = await this.whoIsDrawingLeave(roomId, cache);
    const allPlayersEarnScore = await this.allPlayersEarnScore(roomId, cache);

    if(roundTimeIsOver || whoIsDrawingLeave || allPlayersEarnScore) {
      passedSeconds = 0;
      const roomIsEmpty = await this.roomIsEmpty(roomId, cache);
      if(roomIsEmpty) return this.deleteRoom(roomId, cache);
      const newRoundData = await this.startANewRound(roomId, cache);
      if(!newRoundData) return;
    }

    setTimeout(() => this.validateRound(roomId, passedSeconds, cache), 1000);
  }


  private async connectToCache() {
    const cache = new Cache();
    await cache.connect();
    return cache;
  }

  
  private verifyIfRoundTimeHasEnd(passedSeconds:number) {
    const secondsToEndRound = 60;
    const roundTimeHasEnd = passedSeconds === secondsToEndRound;
    return roundTimeHasEnd;
  }


  private async whoIsDrawingLeave(roomId:string, cache:Cache) {
    const room:room = await cache.get(`room-${roomId}`);
    if(!room) return false;
    const whoIsDrawing = getWhoIsDrawingData(room);

    if(whoIsDrawing) return false;
    return true;
  }


  private async startANewRound(roomId:string, cache:Cache) {
    const round = new StartNewRoundInARoomUseCase();
    const room = await round.startNewRound(roomId);
    if(!room) return await cache.quit();
    const whoIsDrawing = getWhoIsDrawingData(room)!.data;

    this.emitThatANewRoundStart(room);
    this.emitAnswerToPlayer(whoIsDrawing.username, room.answer);
    return room;
  }


  private emitThatANewRoundStart(room:room) {
    const whoIsDrawing = getWhoIsDrawingData(room)!.data;

    const data = {
      roundStartTime: room.roundStartTime,
      whoIsDrawing: whoIsDrawing.username
    }

    this.io.sockets.in(room.id).emit('new_round_start', data);
  } 


  private async roomIsEmpty(roomId:string, cache:Cache) {
    const room:room|undefined = await cache.get(`room-${roomId}`);
    if(!room) return true;
    return room.players.length === 0;
  }


  private async deleteRoom(roomId:string, cache:Cache) {
    const room = new DeleteRoomUseCase();
    await room.delete(roomId);
    await cache.quit();
  }


  private async allPlayersEarnScore(roomId:string, cache:Cache) {
    const room = await cache.get(`room-${roomId}`);
    const playersEarnScore = allPlayersEarnScore(room);
    return playersEarnScore;
  }
}

export default JoinRoomEvent;