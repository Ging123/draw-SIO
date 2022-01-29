import jwt from 'jsonwebtoken';
import exception from '../util/exception';

class Jwt {

  private secretKeyOfToken:string;
  private expireIn:string;
  
  constructor(secretKeyOfToken:string, expireIn='60m') {
    this.secretKeyOfToken = secretKeyOfToken;
    this.expireIn = expireIn;
  }

  public create(data:object) {
    const expireTime = { expiresIn:this.expireIn };
    const token = jwt.sign(data, this.secretKeyOfToken, expireTime);
    return token;
  }

  public validate(token:string) {
    let tokenData:any;
    if(!token) throw exception('Token não foi preenchido');
    jwt.verify(token, this.secretKeyOfToken, (err:any, data:any) => {
      if(err) throw exception('Token inválido', 401);
      tokenData = data;
    });
    return tokenData;
  }
}

export default Jwt;