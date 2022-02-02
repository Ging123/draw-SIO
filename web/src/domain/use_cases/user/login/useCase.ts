import Api from "../../../../services/api";
import LocalStorage from "../../../../services/localstorage";

class LoginUseCase {

  private readonly user = new Api();
  private readonly localstorage = new LocalStorage();

  public async login(emailOrUsername:string, password:string) {
    this.validateEmailOrUsername(emailOrUsername);
    this.validatePassword(password);
    const res = await this.user.login(emailOrUsername, password);
    this.localstorage.set('token', res.data.token);
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