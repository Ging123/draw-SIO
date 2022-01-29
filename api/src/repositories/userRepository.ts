import UserModel, { user } from '../models/userModel';

class UserRepository extends UserModel { 

  public async create(userData:user) {
    const user = this.createUser(userData);
    await user.save();
    return user;
  }

  public async findByEmail(email:string) {
    return await this.userModel.findOne({ email:email });
  }

  public async findByUsername(username:string) {
    return await this.userModel.findOne({ username:username });
  }

  public async deleteByEmail(email:string) {
    return await this.userModel.findOneAndDelete({ email:email });
  }
} 

export default UserRepository; 