import UserFindByTokenUseCase from '../use_cases/user/find_user_by_token/useCase';
import { verifyIfIsAnInternalException } from "../util/exception";

const user = new UserFindByTokenUseCase();

async function socketAuth(socket:any, next:(err?:any) => void) {
  try {
    const sentToken = socket.handshake.auth.token;
    const userFound = await user.findUserByToken(sentToken);
    socket.data = {
      email:userFound.email,
      username:userFound.username
    };
    next();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    const errorToSend = new Error(error.message);
    next(errorToSend);
  }
}

export default socketAuth;