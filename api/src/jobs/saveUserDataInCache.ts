import Cache from "../externals/cache";
import Queue from "../externals/queue";

const queue = new Queue('saveUserDataInCache');
const cache = new Cache();

async function saveUserDataInCache(data:any) {
  const user = data.data;
  const key = `user-${user._id}`;
  await cache.connect();
  await cache.set(key, user);
  await cache.quit();
}

queue.process(saveUserDataInCache);

export default queue;