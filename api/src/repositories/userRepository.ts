import UserModel, { user } from '../models/userModel';
import Bcrypt from '../externals/bcrypt';
import Jwt from '../externals/jwt';

class UserRepository extends UserModel { 

  private readonly bcrypt = new Bcrypt(); 

  public async create(userData:user) {
    const hashedPassword = await this.bcrypt.hash(userData.password, process.env.PASSWORD_SALT!);
    const confirmationCode = await this.createConfirmationCode(userData.email);
    userData.password = hashedPassword;
    const user = this.createUser(userData, confirmationCode.hash);
    await user.save();
    return { 
      user:user, 
      confirmationCode:confirmationCode.text 
    };
  }

  public async updateConfirmationCode(user:any) {
    const confirmationCode = await this.createConfirmationCode(user.email);
    user.confirmation_code = confirmationCode.hash;
    await user.save();
    return { 
      user:user, 
      confirmationCode:confirmationCode.text 
    };
  }

  private async createConfirmationCode(email:string) {
    const jwt = new Jwt(process.env.JWT_CONFIRM_EMAIL_SECRET!);
    const confirmationCode = jwt.create({ email:email });
    const confirmationCodeHash = await this.bcrypt.hash(confirmationCode, process.env.TOKEN_SALT!);
    return {
      text:confirmationCode,
      hash:confirmationCodeHash
    }
  }

  public async login(user:any) {
    const token = await this.createLoginToken(user);
    user.token = token.hash;
    await user.save();
    return token.text;
  }

  private async createLoginToken(user:any) {
    const jwt = new Jwt(process.env.JWT_SECRET!);
    const token = jwt.create({
      _id:user._id,
      email:user.email,
      username:user.username
    });
    const hashToken = await this.bcrypt.hash(token, process.env.TOKEN_SALT!);
    return { text:token, hash:hashToken };
  }

  public async confirmEmail(user:any) {
    user.confirmation_code = undefined;
    await user.save();
    return user;
  }

  public async updatePassword() {
    
  }

  public async logout(user:any) {
    user.token = '';
    await user.save();
    return user;
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

  public async findById(id:string) {
    return await this.userModel.findById(id);
  }

  public async deleteByEmail(email:string) {
    return await this.userModel.findOneAndDelete({ email:email });
  }
} 

export default UserRepository; 