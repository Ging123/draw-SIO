import express from 'express'; 
import { xssBody } from '../../../middlewares/xss';
import { verifyIfIsAnInternalException } from '../../../util/exception';
import UserUpdateConfirmationToken from './useCase'; 

const route = express.Router(); 
const user = new UserUpdateConfirmationToken(); 

route.put('/email/confirm', xssBody, async (req, res) => {
  try {
    await user.updateToken(req.body.email);
    res.status(200).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
}); 

module.exports = route; 