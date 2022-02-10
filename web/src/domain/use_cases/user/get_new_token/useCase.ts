import Api from "../../../../services/api";
import LocalStorage from "../../../../services/localstorage";

class GetNewTokenForUser {

  private readonly api = new Api();
  private readonly localstorage = new LocalStorage();

  public async getNewToken() {
    const token = this.localstorage.get('token');
    const id = this.localstorage.get('id');
    if(!token || !id) throw 'Usuário não está logado';
    const res = await this.api.getNewToken(token, id);
    const newToken = res.data.token;
    this.localstorage.set('token', newToken);
  }
}

export default GetNewTokenForUser;