import EmailSender from "../externals/emailSender";
import Queue from "../externals/queue";

const queue = new Queue('confirmAccountMail');

function sendConfirmationCode(data:any) {
  const user = data.data.user;
  const code = data.data.confirmationCode;
  const emailSender = new EmailSender();
  const confirmUrl = `${process.env.API_URL!}user/email/confirm/${code}`;
  emailSender.send({
    to:user.email,
    subject:'Confirm your email',
    html:`<h1>Hello, confirm your account</h1>
    <p>Click right 
    <a target="_blanket" href="${confirmUrl}">here</a> 
    to confirm your account</p>`
  });
}

queue.process(sendConfirmationCode);

export default queue;