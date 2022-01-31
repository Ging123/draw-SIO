import Bcrypt from "../../../externals/bcrypt";
import Jwt from "../../../externals/jwt";
import UserRepository from "../../../repositories/userRepository";
import exception from "../../../util/exception";

class EmailConfirmUseCase {
  
  private readonly jwt = new Jwt(process.env.JWT_CONFIRM_EMAIL_SECRET!);
  private readonly bcrypt = new Bcrypt();
  private readonly user = new UserRepository();

  public async confirmAccount(token:string) {
    const tokenData = this.jwt.validate(token);
    const userFound = await this.findUserByEmail(tokenData.email);
    await this.verifyIfTokensMatch(token, userFound.confirmation_code);
    await this.user.confirmEmail(userFound);
    return userFound;
  }

  private async findUserByEmail(email:string) {
    const user = await this.user.findByEmail(email);
    if(!user) throw exception('Token inválido');
    return user;
  }

  private async verifyIfTokensMatch(token:string, hashedToken:string) {
    const salt = process.env.TOKEN_SALT!;
    const tokensMatch = await this.bcrypt.compare(token, hashedToken, salt);
    if(!tokensMatch) throw exception('Token inválido');
  }
} 

export default EmailConfirmUseCase;