import Cache from "../externals/cache";
import Queue from "../externals/queue";

const queue = new Queue('deleteUserDataInCache');
const cache = new Cache();

async function deleteUserDataFromCache(data:any) {
  const id = data.data._id;
  const key = `user-${id}`;
  await cache.connect();
  await cache.deleteOne(key);
  await cache.quit();
}

queue.process(deleteUserDataFromCache);

export default queue;