import UserFindByTokenUseCase from "../use_cases/user/find_user_by_token/useCase";
import { verifyIfIsAnInternalException } from "../util/exception";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io";

type socket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

async function joinMatch(data:any, socket:socket) {
  try {
    const user = new UserFindByTokenUseCase();
    const userFound = await user.findUserByToken(data.token);
    
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    const tokenExpired = 'Token expirou ou token inválido';
    if(error.message === tokenExpired) return socket.emit('token_expired', true);
    socket.emit('error', error.message);
  }
}

export default joinMatch;