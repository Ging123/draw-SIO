import { io } from "socket.io-client";

class Io {

  public set(url:string, authToken:string) {
    return io(url, {
      autoConnect:false,
      transports: ['websocket', 'polling', 'flashsocket'],
      auth:{ "token":authToken } 
    });
  }
}

export default Io;