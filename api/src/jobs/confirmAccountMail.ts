import EmailSender from "../externals/emailSender";
import Queue from 'bull';

const queueName = 'confirmAccountMail';

function sendConfirmationCode(data:any) {
  const emailSender = new EmailSender();
  const code = data.confirmationCode;
  const confirmUrl = `${process.env.API_URL!}user/email/confirm/${code}`;
  emailSender.send({
    to:data.user.email,
    subject:'Confirm your email',
    html:`<h1>Hello, confirm your account</h1>
    <p>Click right 
    <a target="_blanket" href="${confirmUrl}">here</a> 
    to confirm your account</p>`
  });
}

const confirmAccountQueue = new Queue(queueName, process.env.REDIS_URL!);

confirmAccountQueue.process((job) => {
  sendConfirmationCode(job.data);
  
  confirmAccountQueue.on('failed', (job, err) => {
    console.log('Job failed', queueName, job.data);
    console.log(err);
  })
});

export default confirmAccountQueue;