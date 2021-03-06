import exception from "../../../util/exception";
import Base from "../base";

class UserFindByTokenUseCase extends Base {

  public async findUserByToken(token:string) {
    const dataOfToken = this.jwt.validate(token);
    const user = await this.getUserById(dataOfToken._id);
    this.verifyIfUserHasConfirmedAccount(user);
    this.verifyIfUserIsLogged(user);
    await this.validateToken(token, user.token);
    return user;
  }

  private verifyIfUserHasConfirmedAccount(user:any) {
    const userDontConfirmHisEmail = user.confirmation_code;
    if(userDontConfirmHisEmail) throw exception('Seu email ainda não foi confirmado', 401);
  }

  private verifyIfUserIsLogged(user:any) {
    if(!user.token) throw exception('Você não está logado', 401);
  }

  private async validateToken(textToken:string, hashToken:string) {
    const tokenSalt = process.env.TOKEN_SALT!;
    const tokensMatch = await this.bcrypt.compare(textToken, hashToken, tokenSalt);
    if(!tokensMatch) throw exception('Token inválido', 401);
  }

  private async getUserById(id:string) {
    let user:any;
    user = await this.getUserInCache(id);
    if(user) return user;
    user = await this.getUserInDatabase(id);
    return user;
  }

  private async getUserInCache(id:string) {
    await this.cache.connect();
    const user = await this.cache.get(`user-${id}`);
    const userInCacheIsNotConfirmed = !user || user.confirmation_code;
    await this.cache.quit();
    if(userInCacheIsNotConfirmed) return;
    return user;
  }

  private async getUserInDatabase(id:string) {
    const user = await this.user.findById(id);
    if(!user) throw exception('Token inválido');
    this.saveUserDataInChache(user);
    return user;
  }
}

export default UserFindByTokenUseCase;