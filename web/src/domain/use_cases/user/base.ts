import GetNewTokenForUser from "./get_new_token/useCase";

class Base {

  protected async request(request:() => any) {
    const token = new GetNewTokenForUser();
    let tries = 0;
    while(true) {
      try {
        const result = await request();
        return result;
      }
      catch(err) {
        const tokenExpired = 'Token expirou ou token inválido';
        if(err !== tokenExpired || tries === 1) throw err;
        await token.getNewToken(); 
      }
      finally {
        tries += 1;
      }
    }
  }

}

export default Base;