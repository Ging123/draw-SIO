import { createClient } from 'redis';

class Cache {

  private readonly client = createClient({
    url:process.env.REDIS_URL!
  });

  public async connect() {
    await this.client.connect();
  }

  public async quit() {
    await this.client.quit();
  }

  public async set(key:string, value:object) {
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