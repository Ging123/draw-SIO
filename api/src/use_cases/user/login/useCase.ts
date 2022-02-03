import exception from "../../../util/exception";
import Base from "../base";

class UserLoginUseCase extends Base { 

  public async login(emailOrUsername:string, password:string) {
    const userFound = await this.getUserByEmailOrUsername(emailOrUsername);
    await this.verifyIfPasswordMatch(password, userFound.password);
    this.verifyIfUserHasAConfirmedAccount(userFound);
    const result = await this.user.login(userFound);
    this.saveUserDataInChache(result.user);
    return { token:result.token };
  }

  private async getUserByEmailOrUsername(emailOrUsername:string) {
    const user = await this.user.findByEmailOrUsername(emailOrUsername);
    if(!user) throw exception('Email ou nome de usuário não existe');
    return user;
  }

  private async verifyIfPasswordMatch(password:string, hashedPassword:string) {
    const salt = process.env.PASSWORD_SALT!;
    const passwordMatch = await this.bcrypt.compare(password, hashedPassword, salt);
    if(!passwordMatch) throw exception('Senha digitada errada'); 
  }

  private verifyIfUserHasAConfirmedAccount(user:any) {
    if(user.confirmation_code) throw exception('Seu email ainda não foi confirmado', 403);
  }
} 

export default UserLoginUseCase;