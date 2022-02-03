import express from 'express';
import authUser from '../../../middlewares/auth';
import { verifyIfIsAnInternalException } from '../../../util/exception';
import UserCreateNewTokenUseCase from './useCase';

const route = express.Router();
const user = new UserCreateNewTokenUseCase();

route.post('/newToken', authUser, async (req:any, res) => {
  try {
    const token = await user.createNewToken(req.user);
    res.status(201).json({ token:token })
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
})

module.exports = route;