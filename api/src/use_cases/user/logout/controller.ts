import { verifyIfIsAnInternalException } from '../../../util/exception'; 
import express from 'express'; 
import authUser from '../../../middlewares/auth';
import UserLogoutUseCase from './useCase';

const route = express.Router(); 
const user = new UserLogoutUseCase();

route.delete('/logout', authUser, async (req:any, res) => {
  try {
    await user.logout(req.user);  
    res.status(204).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
}); 

module.exports = route; 