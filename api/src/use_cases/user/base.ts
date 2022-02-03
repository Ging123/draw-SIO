import confirmAccountQueue from '../../jobs/confirmAccountMail';
import UserRepository from "../../repositories/userRepository";
import Cache from "../../externals/cache";
import Jwt from "../../externals/jwt";
import Bcrypt from "../../externals/bcrypt";
import exception from "../../util/exception";

class Base {

  protected readonly user = new UserRepository();
  protected readonly jwt = new Jwt(process.env.JWT_SECRET!);
  protected readonly cache = new Cache();
  protected readonly bcrypt = new Bcrypt();
  
  protected async saveUserInCache(user:any) {
    const key = `user-${user._id}`;
    await this.cache.set(key, user);
  }

  protected async deleteFromCache(id:string) {
    await this.cache.connect();
    await this.cache.deleteOne(`user-${id}`);
    await this.cache.quit();
  }

  protected async findUserByEmail(email:string, error:string) {
    const user = await this.user.findByEmail(email);
    if(!user) throw exception(error);
    return user;
  }

  protected async verifyIfTokensMatch(token:string, hashedToken:string) {
    const salt = process.env.TOKEN_SALT!;
    const tokensMatch = await this.bcrypt.compare(token, hashedToken, salt);
    if(!tokensMatch) throw exception('Token inválido');
  }

  protected sendConfirmationCode(data:any) {
    confirmAccountQueue.add(data, {
      attempts:5
    })
  }
}

export default Base;