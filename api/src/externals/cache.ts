import { createClient } from 'redis';

class Cache {

  private readonly client = createClient({
    url:process.env.REDIS_URL!
  });

  public async set(key:string, value:object) {
    await this.client.connect();
    const valueInString = JSON.stringify(value);
    await this.client.set(key, valueInString);
    await this.client.quit();
  }

  public async get(key:string) {
    await this.client.connect();
    const value = await this.client.get(key);
    if(value) return JSON.parse(value);
    await this.client.quit();
  }
}

export default Cache;