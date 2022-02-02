import Api from "../../../../services/api";
import LocalStorage from "../../../../services/localstorage";
import GetNewTokenForUser from "../get_new_token/useCase";

class GetUserUseCase {

  private readonly api = new Api();
  private readonly localstorage = new LocalStorage();
  private readonly user = new GetNewTokenForUser();

  public async get() {
    let tries = 0;
    while(tries < 2) {
      const token = this.getToken();
      const result = await this.api.getUser(token);
      const userFound = result.data;
      if(userFound) return userFound;
      await this.handleError(result);
      tries++;
    }
    throw 'erro no token';
  }

  private getToken():string {
    const token = this.localstorage.get('token');
    if(!token) throw 'Usuário não está logado';
    return token;
  }

  private async handleError(error:string) {
    if(error !== 'Token expirou ou token inválido') throw error;
    await this.user.getNewToken();
  }
}

export default GetUserUseCase;