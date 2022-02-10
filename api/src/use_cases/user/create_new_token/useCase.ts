import exception from "../../../util/exception";
import Base from "../base";

class UserCreateNewTokenUseCase extends Base {

  public async createNewToken(token:string, id:string) {
    const user = await this.getUserById(id);
    await this.validateToken(token, user.token);
    const result = await this.user.login(user);
    this.saveUserDataInChache(result.user);
    return result.token;
  }

  private async getUserById(id:string) {
    const user = await this.user.findById(id);
    if(!user || user.confirmation_code) throw exception('Token inválido', 401);
    return user;
  }

  private async validateToken(textToken:string, hashToken:string) {
    const tokenSalt = process.env.TOKEN_SALT!;
    const tokensMatch = await this.bcrypt.compare(textToken, hashToken, tokenSalt);
    if(!tokensMatch) throw exception('Token inválido', 401);
  }
}

export default UserCreateNewTokenUseCase;