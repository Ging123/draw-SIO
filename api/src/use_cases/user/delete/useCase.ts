import Base from "../base";

class UserDeleteUseCase extends Base {

  public async delete(user:any) {
    this.deleteFromCache(user._id);
    await this.user.deleteByEmail(user.email);
  }
}

export default UserDeleteUseCase;