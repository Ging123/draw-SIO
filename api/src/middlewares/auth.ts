import UserFindByTokenUseCase from '../use_cases/user/find_user_by_token/useCase';
import { verifyIfIsAnInternalException } from "../util/exception";

const user = new UserFindByTokenUseCase();

async function authUser(req:any, res:any, next:() => void) {
  try {
    const sentToken = req.headers["Authorization"]!;
    req.user = await user.findUserByToken(sentToken);
    next();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
}

export default authUser;