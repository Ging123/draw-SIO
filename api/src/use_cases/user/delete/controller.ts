import express from 'express'; 
import authUser from '../../../middlewares/auth';
import { verifyIfIsAnInternalException } from '../../../util/exception';
import UserDeleteUseCase from './useCase';

const route = express.Router(); 
const user = new UserDeleteUseCase();

route.delete('/', authUser, async (req:any, res) => {
  try {
    await user.delete(req.user);
    res.status(204).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
}); 

module.exports = route; 