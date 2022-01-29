import UserRepository from "../../repositories/userRepository";
import Cache from "../../externals/cache";
import Jwt from "../../externals/jwt";
import Bcrypt from "../../externals/bcrypt";

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
}

export default Base;