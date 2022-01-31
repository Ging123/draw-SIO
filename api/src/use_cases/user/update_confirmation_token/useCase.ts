import exception from "../../../util/exception";
import Base from "../base";

class UserUpdateConfirmationToken extends Base { 

  public async updateToken(email:string) {
    const user = await this.getUserByEmail(email);
    const data = await this.user.updateConfirmationCode(user);
    if(process.env.MODE! === 'pro') this.sendCodeToConfirmEmail(data);
  }

  private async getUserByEmail(email:string) {
    const user = await this.user.findByEmail(email);
    if(!user) throw exception('Esse email não existe');
    if(!user.confirmation_code) throw exception('Esse email já foi confirmado');
    return user;
  }
} 

export default UserUpdateConfirmationToken;