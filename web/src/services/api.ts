import axios from "axios";

class Api {

  private readonly url = 'http://localhost:8000/'; 
  
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
}

export default Api;