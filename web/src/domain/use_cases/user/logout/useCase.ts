import Api from "../../../../services/api";
import LocalStorage from "../../../../services/localstorage";
import Base from "../base";

class LogoutUserUseCase extends Base {

  private readonly api = new Api();
  private readonly localstorage = new LocalStorage();

  public async logout() {
    await this.request(async () => await this.api.logout()); 
    this.localstorage.remove("token");
  }
}

export default LogoutUserUseCase;