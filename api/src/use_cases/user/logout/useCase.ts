import Base from "../base";

class UserLogoutUseCase extends Base {
  
  public async logout(user:any) {
    await this.user.logout(user);
    this.deleteFromCache(user.id);
  }
}

export default UserLogoutUseCase;