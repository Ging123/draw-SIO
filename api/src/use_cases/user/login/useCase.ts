import Bcrypt from "../../../externals/bcrypt";
import UserRepository from "../../../repositories/userRepository";
import exception from "../../../util/exception";

class UserLoginUseCase { 

  private readonly user = new UserRepository();
  private readonly bcrypt = new Bcrypt();

  public async login(emailOrUsername:string, password:string) {
    const userFound = await this.getUserByEmailOrUsername(emailOrUsername);
    await this.verifyIfPasswordMatch(password, userFound.password);
    this.verifyIfUserAlreadyIsLogged(userFound);
    const token = await this.user.login(userFound);
    return { token:token };
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

  private verifyIfUserAlreadyIsLogged(user:any) {
    if(user.token) throw exception('Você já está logado');
  }
} 

export default UserLoginUseCase;