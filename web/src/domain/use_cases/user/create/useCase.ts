import Validator from 'simple-validator-node';

import Api from "../../../../services/api";

class CreateAccountUseCase {

  private readonly api = new Api();
  private readonly validator = new Validator();

  public async create(email:string, username:string, password:string) {
    this.validate(email, username, password);
    await this.api.createUser(email, username, password);
  }

  private validate(email:string, username:string, password:string) {
    this.validateEmail(email);
    this.validateUsername(username);
    this.validatePassword(password);
  }

  private validateEmail(email:string) {
    if(this.validator.isEmpty(email)) throw 'Campo de email não foi preenchido';
    if(!this.validator.isEmail(email)) throw 'Email inválido';
    this.validateEmailService(email);
  }

  private validateUsername(username:string) {
    if(this.validator.isEmpty(username)) throw 'Campo de nome de usuário não foi preenchido';
    if(!this.validator.hasNoEspecialChar(username)) throw 'Nome de usuário não pode ter caracteries especiais';
  }

  private validatePassword(password:string) {
    if(this.validator.isEmpty(password)) throw 'Campo de senha não foi preenchido';
    if(this.validator.isShorterThanMinLength(password, 7)) throw 'Senha deve ter no mínimo 7 caracteries';
  }

  private validateEmailService(email:string) {
    const service = this.getEmailService(email);
    const validServices = ['gmail', 'outlook', 'hotmail'];
    for(const validService of validServices) {
      if(service === validService) return;
    }
    throw 'Só aceitamos emails dos serviços outlook, gmail ou hotmail';
  }

  private getEmailService(email:string) {
    const emailParts = email.split('@');
    const service = emailParts[1].split('.')[0];
    return service;
  }
}

export default CreateAccountUseCase;