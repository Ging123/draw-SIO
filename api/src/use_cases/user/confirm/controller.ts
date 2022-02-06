import express from 'express'; 
import { xssParams } from '../../../middlewares/xss';
import { verifyIfIsAnInternalException } from '../../../util/exception';
import EmailConfirmUseCase from './useCase';

const route = express.Router(); 
const email = new EmailConfirmUseCase(); 

route.get('/email/confirm/:token', xssParams, async (req, res) => {
  try {
    const token = req.params.token;
    await email.confirmAccount(token);
    res.status(204).send();
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
}); 

module.exports = route; 