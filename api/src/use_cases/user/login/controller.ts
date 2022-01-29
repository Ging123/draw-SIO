import express from 'express'; 
import { verifyIfIsAnInternalException } from '../../../util/exception';
import UserLoginUseCase from './useCase';

const route = express.Router(); 
const user = new UserLoginUseCase(); 

route.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const token = await user.login(emailOrUsername, password);
    res.status(201).json(token);
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
});

module.exports = route; 