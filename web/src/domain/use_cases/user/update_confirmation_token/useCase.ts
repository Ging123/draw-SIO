import Api from "../../../../services/api";
import LocalStorage from "../../../../services/localstorage";

class UpdateConfirmationCode {

  private readonly api = new Api();
  private readonly localstorage = new LocalStorage();

  public async update() {
    const emailOrUsername = this.localstorage.get('emailOrUsername');
    if(!emailOrUsername) throw 'usuário não logado';
    await this.api.updateConfirmationToken(emailOrUsername);
  }
}

export default UpdateConfirmationCode;