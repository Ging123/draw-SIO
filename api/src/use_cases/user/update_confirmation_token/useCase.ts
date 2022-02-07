import exception from "../../../util/exception";
import Base from "../base";

class UserUpdateConfirmationToken extends Base { 

  public async updateToken(emailOrUsername:string) {
    const user = await this.getUserByEmailOrUsername(emailOrUsername);
    const data = await this.user.updateConfirmationCode(user);
    if(process.env.MODE! === 'pro') this.sendConfirmationCode(data);
  }

  private async getUserByEmailOrUsername(emailOrUsername:string) {
    const user = await this.user.findByEmailOrUsername(emailOrUsername);
    if(!user) throw exception('Esse email ou nome de usuário não existe');
    if(!user.confirmation_code) throw exception('Esse email já foi confirmado');
    return user;
  }
} 

export default UserUpdateConfirmationToken;