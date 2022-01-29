import { verifyIfIsAnInternalException } from '../../../util/exception';
import authUser from '../../../middlewares/auth';
import express from 'express'; 

const route = express.Router(); 

route.get('/', authUser, async (req:any, res) => {
  try {
    const userData = {
      email:req.user.email,
      username:req.user.username,
      profile_photo:req.user.profile_photo
    }
    res.status(200).json(userData);
  }
  catch(err) {
    const error = verifyIfIsAnInternalException(err);
    res.status(error.status).json(error.message);
  }
}); 

module.exports = route; 