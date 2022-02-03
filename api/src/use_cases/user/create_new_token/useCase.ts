import Base from "../base";

class UserCreateNewTokenUseCase extends Base {

  public async createNewToken(user:any) {
    const result = await this.user.login(user);
    this.saveUserDataInChache(result.user);
    return result.token;
  }
}

export default UserCreateNewTokenUseCase;