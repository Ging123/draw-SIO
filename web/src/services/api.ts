import axios from "axios";
import config from "../config";
import LocalStorage from "./localstorage";

class Api {

  private readonly url = config.apiUrl; 
  private readonly localstorage = new LocalStorage();
  
  public async login(emailOrUsername:string, password:string) {
    const url = `${this.url}user/login`;
    const data = {
      emailOrUsername:emailOrUsername,
      password:password 
    }
    const option = { withCredentials:true };
    const res = await axios.post(url, data, option)
    .catch((err) => { throw err.response.data });
    return res;
  }

  public async createUser(email:string, username:string, password:string) {
    const url = `${this.url}user/`;
    const data = {
      email:email,
      username:username,
      password:password 
    }
    const option = { withCredentials:true };
    await axios.post(url, data, option)
    .catch((err) => { throw err.response.data });
  }

  public async getUser() {
    const token = this.localstorage.get('token');
    if(!token) throw 'Usuário não está logado';
    const url = `${this.url}user/`;
    const res = await axios.get(url, {
      withCredentials:true,
      headers: { 'Authorization':token }
    })
    .catch((err) => { throw err.response.data });
    return res;
  }

  public async getNewToken(token:string, id:string) {
    const url = `${this.url}user/newToken`;
    const data = { authToken:token, id:id }
    const option = { withCredentials:true };
    const res = await axios.post(url, data, option)
    .catch((err) => { throw err.response.data });
    return res;
  }

  public async updateConfirmationToken(emailOrUsername:string) {
    const url = `${this.url}user/email/confirm`;
    const option = { withCredentials:true };
    const data = { emailOrUsername:emailOrUsername };
    await axios.put(url, data, option);
  }
}

export default Api;