import UserRepository from "../../repositories/userRepository";
import Cache from "../../externals/cache";
import Jwt from "../../externals/jwt";
import Bcrypt from "../../externals/bcrypt";
import EmailSender from "../../externals/emailSender";

class Base {

  protected readonly user = new UserRepository();
  protected readonly jwt = new Jwt(process.env.JWT_SECRET!);
  protected readonly cache = new Cache();
  protected readonly bcrypt = new Bcrypt();
  protected readonly emailSender = new EmailSender();
  
  protected async saveUserInCache(user:any) {
    const key = `user-${user._id}`;
    await this.cache.set(key, user);
  }

  protected async deleteFromCache(id:string) {
    await this.cache.connect();
    await this.cache.deleteOne(`user-${id}`);
    await this.cache.quit();
  }

  protected sendCodeToConfirmEmail(data:any) {
    const code = data.confirmationCode;
    const confirmUrl = `${process.env.API_URL!}user/email/confirm/${code}`;
    this.emailSender.send({
      to:data.user.email,
      subject:'Confirm your email',
      text:`<h1>Hello, confirm your account</h1>
      <p>Click right 
      <a target="_blanket" href="${confirmUrl}">here</a> 
      to confirm your account</p>`
    });
  }
}

export default Base;