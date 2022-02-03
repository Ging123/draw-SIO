import BullQueue from 'bull';

class Queue {

  private queueName:string;
  private queue:BullQueue.Queue<any>;

  constructor(queueName:string) {
    this.queueName = queueName;
    this.queue =  new BullQueue(queueName, process.env.REDIS_URL!);

    this.queue.on('failed', (job, err) => {
      console.log('Job failed', this.queueName, job.data);
      console.log(err);
    });
  }

  public process(handle:any) {
    this.queue.process(handle);
  }

  public add(data:any, option:object) {
    this.queue.add(data, option);
  }
}

export default Queue;