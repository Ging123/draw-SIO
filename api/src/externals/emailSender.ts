import nodemailer from "nodemailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import mailConfig from "../configs/mail";
import exception from '../util/exception';

interface email {
  to:string;
  subject:string;
  html:string;
}

type transporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

class EmailSender {

  public send(email:email) {
    const transporter = this.getTransporter();
    const options = this.createEmailSenderOptions(email);
    this.sendAnEmail(transporter, options)
  }

  private getTransporter() {
    return nodemailer.createTransport(mailConfig);
  }

  private createEmailSenderOptions(email:email) {
    return {
      from: 'Draw io',
      to:email.to,
      subject:email.subject,
      html:email.html
    }
  }

  private sendAnEmail(transporter:transporter, options:object) {
    transporter.sendMail(options, (err:any) => {
      if(err) throw exception(err, 500);
    });
  }
}

export default EmailSender;