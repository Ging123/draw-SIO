import Api from "../../../../services/api";
import LocalStorage from "../../../../services/localstorage";

class GetNewTokenForUser {

  private readonly api = new Api();
  private readonly localstorage = new LocalStorage();

  public async getNewToken() {
    const token = this.localstorage.get('token');
    if(!token) throw 'Usuário não está logado';
    const res = await this.api.getNewToken(token);
    const newToken = res.data.token;
    this.localstorage.set('token', newToken);
  }
}

export default GetNewTokenForUser;