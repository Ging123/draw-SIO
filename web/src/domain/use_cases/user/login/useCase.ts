import Api from "../../../../services/api";

class LoginUseCase {

  private readonly user = new Api();

  public async login(emailOrUsername:string, password:string) {
    this.validateEmailOrUsername(emailOrUsername);
    this.validatePassword(password);
    await this.user.login(emailOrUsername, password);
  }

  private validateEmailOrUsername(emailOrUsername:string) {
    if(!emailOrUsername) throw 'Campo de email ou nome de usuário não foi preenchido';
  }

  private validatePassword(password:string) {
    if(!password) throw 'Campo de senha não foi preenchido';
    if(password.length < 7) throw 'Senha digitada errada'; 
  }
}

export default LoginUseCase;