import { io } from "socket.io-client";

class Io {

  public connect(url:string, authToken:string) {
    return io(url, {
      transports: ['websocket', 'polling', 'flashsocket'],
      auth:{ "token":authToken } 
    });
  }
}

export default Io;