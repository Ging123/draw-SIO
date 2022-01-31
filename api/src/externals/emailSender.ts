import nodemailer from "nodemailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import exception from '../util/exception';

interface email {
  to:string;
  subject:string;
  text:string;
}

type transporter = nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

class EmailSender {

  public send(email:email) {
    const receiverProvider = this.getEmailProvider(email.to);
    const transporter = this.getTransporter(receiverProvider);
    const from = this.getSenderEmail(receiverProvider);
    const options = this.createEmailSenderOptions(email, from);
    this.sendAnEmail(transporter, options)
  }

  private getEmailProvider(email:string) {
    let provider = email.split('@')[1];
    provider = provider.replace('.com', '');
    return provider;
  }

  private getTransporter(provider:string) {
    if(provider === 'gmail') return this.gmailTransporter();
    return this.outlookTransporter();
  }

  private getSenderEmail(clientProvider:string) {
    if(clientProvider === 'gmail') return process.env.GMAIL_EMAIL!;
    return process.env.OUTLOOK_EMAIL!;
  }

  private outlookTransporter() {
    return nodemailer.createTransport({
      service:"hotmail",
      auth: {
        user:process.env.OUTLOOK_EMAIL!,
        pass:process.env.OUTLOOK_PASSWORD!
      }
    });
  }

  private gmailTransporter() {
    return nodemailer.createTransport({
      service:"gmail",
      auth: {
        user:process.env.GMAIL_EMAIL!,
        pass:process.env.GMAIL_PASSWORD!
      }
    });
  }

  private createEmailSenderOptions(email:email, senderEmail:string) {
    return {
      from: senderEmail,
      to:email.to,
      subject:email.subject,
      html:email.text
    }
  }

  private sendAnEmail(transporter:transporter, options:object) {
    transporter.sendMail(options, (err:any) => {
      if(err) throw exception(err, 500);
    });
  }
}

export default EmailSender;