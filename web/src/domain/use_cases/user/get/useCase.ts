import Api from "../../../../services/api";
import LocalStorage from "../../../../services/localstorage";
import Base from "../base";

class GetUserUseCase extends Base {

  private readonly api = new Api();
  private readonly localstorage = new LocalStorage();

  public async get() {
    const result = await this.request(async () => await this.api.getUser()); 
    const userFound = result.data;
    this.localstorage.set('id', userFound._id);
    if(userFound) return userFound;
  }
}

export default GetUserUseCase;