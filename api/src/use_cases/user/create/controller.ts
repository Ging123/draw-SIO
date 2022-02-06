import express from 'express'; 
import { xssBody } from '../../../middlewares/xss';
import { verifyIfIsAnInternalException } from '../../../util/exception';
import UserCreateUseCase from './useCase'; 

const route = express.Router(); 
const user = new UserCreateUseCase(); 

route.post('/', xssBody, async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const createdUser = await user.create({
      email:email,
      username:username,
      password:password
    });
    res.status(201).json(createdUser);
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
}); 

module.exports = route; 