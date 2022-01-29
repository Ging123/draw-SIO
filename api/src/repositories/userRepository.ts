import UserModel, { user } from '../models/userModel';
import Bcrypt from '../externals/bcrypt';
import Jwt from '../externals/jwt';

class UserRepository extends UserModel { 

  private readonly bcrypt = new Bcrypt();
  private readonly jwt = new Jwt(process.env.JWT_SECRET!);

  public async create(userData:user) {
    const hashedPassword = await this.bcrypt.hash(userData.password, process.env.PASSWORD_SALT!);
    userData.password = hashedPassword;
    const user = this.createUser(userData);
    await user.save();
    return user;
  }

  public async login(user:any) {
    const token = await this.createLoginToken(user);
    user.token = token.hash;
    await user.save();
    return token.text;
  }

  private async createLoginToken(user:any) {
    const token = this.jwt.create({
      _id:user._id,
      email:user.email,
      username:user.username
    });
    const hashToken = await this.bcrypt.hash(token, process.env.TOKEN_SALT!);
    return { text:token, hash:hashToken };
  }

  public async findByEmailOrUsername(emailOrUsername:string) {
    return await this.userModel.findOne({ 
      $or:[{ email: emailOrUsername }, { username:emailOrUsername }]
    });
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