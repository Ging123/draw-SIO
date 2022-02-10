import express from 'express';
import authUser from '../../../middlewares/auth';
import { verifyIfIsAnInternalException } from '../../../util/exception';
import UserCreateNewTokenUseCase from './useCase';

const route = express.Router();
const user = new UserCreateNewTokenUseCase();

route.post('/newToken', async (req, res) => {
  try {
    const { authToken, id } = req.body;
    const token = await user.createNewToken(authToken, id);
    res.status(201).json({ token:token })
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    console.log(error.message);
    res.status(error.status).json(error.message);
  }
})

module.exports = route;