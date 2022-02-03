import express from 'express';
import authUser from '../../../middlewares/auth';
import UserRepository from '../../../repositories/userRepository';
import { verifyIfIsAnInternalException } from '../../../util/exception';

const route = express.Router();
const user = new UserRepository();

route.post('/newToken', authUser, async (req:any, res) => {
  try {
    const result = await user.login(req.user);
    const token = result.token;
    res.status(201).json({ token:token })
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
})

module.exports = route;