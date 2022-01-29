import { user } from "../../../models/userModel";
import UserRepository from "../../../repositories/userRepository";
import Validator from 'simple-validator-node';
import exception from "../../../util/exception";
import Cache from "../../../externals/cache";

class UserCreateUseCase { 

  private readonly user = new UserRepository();
  private readonly validator = new Validator();
  private readonly cache = new Cache();
  
  public async create(userData:user) {
    this.validate(userData);
    await this.verifyIfEmailAlreadyExists(userData.email);
    await this.verifyIfUsernameAlreadyExists(userData.username);
    const createdUser = await this.user.create(userData);
    await this.saveUserInCache(createdUser);
    if(process.env.MODE! === 'dev') return this.userData(createdUser);
  }

  private validate(user:user) {
    this.validateEmail(user.email);
    this.validateUsername(user.username);
    this.validatePassword(user.password);
  }

  private validateEmail(email:string) {
    if(this.validator.isEmpty(email)) throw exception('Campo de email não foi preenchido');
    if(!this.validator.isEmail(email)) throw exception('Email inválido');
    if(this.validator.isGreaterThanMaxLength(email, 100)) throw exception('Email deve ter menos de 100 caracteries');
  }

  private validateUsername(username:string) {
    if(this.validator.isEmpty(username)) throw exception('Campo de nome de usuário não foi preenchido');
    if(this.validator.isGreaterThanMaxLength(username, 30)) throw exception('Nome de usuário deve ter no máximo 30 caracteries');
    if(!this.validator.hasNoEspecialChar(username)) throw exception('Nome de usuário não pode ter caracteries especiais');
  }

  private validatePassword(password:string) {
    if(this.validator.isEmpty(password)) throw exception('Campo de senha não foi preenchido');
    if(this.validator.isGreaterThanMaxLength(password, 30)) throw exception('Senha deve ter no máximo 30 caracteries');
    if(this.validator.isShorterThanMinLength(password, 7)) throw exception('Senha deve ter no mínimo 7 caracteries');
  }

  private async verifyIfEmailAlreadyExists(email:string) {
    const emailExists = await this.user.findByEmail(email);
    if(emailExists) throw exception('Esse email já está sendo utilizado');
  }

  private async verifyIfUsernameAlreadyExists(username:string) {
    const usernameExists = await this.user.findByUsername(username);
    if(usernameExists) throw exception('Esse nome de usuário já está sendo utilizado');
  }

  private async saveUserInCache(user:any) {
    const key = `user-${user._id}`;
    await this.cache.set(key, {
      _id:user._id,
      email:user.email,
      username:user.username,
      profile_photo:user.profile_photo,
      token:user.token,
      confirmed:user.confirmed,
      confirmation_code:user.confirmation_code
    });
  }

  private userData(user:any) {
    return {
      _id:user._id,
      email:user.email,
      username:user.username
    }
  }
}

export default UserCreateUseCase;