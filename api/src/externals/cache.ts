import { createClient } from 'redis';

class Cache {

  private readonly client = createClient({
    url:process.env.REDIS_URL!
  });

  public async connect() {
    try {
      await this.client.connect();
    } 
    catch(err) {
      //console.log(err);
      return err;
    }
  }

  public async quit() {
    try {
      await this.client.quit();
    }
    catch(err) {
      //console.log(err);
      return;
    }
  }

  public async set(key:string, value:any) {
    const valueInString = JSON.stringify(value);
    await this.client.set(key, valueInString);
  }

  public async get(key:string) {
    const value = await this.client.get(key);
    if(value) return JSON.parse(value);
  }

  public async deleteOne(key:string) {
    await this.client.del(key);
  }

  public async deleteAll() {
    await this.client.FLUSHDB();
  }
}

export default Cache;