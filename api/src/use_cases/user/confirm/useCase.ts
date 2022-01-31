import Jwt from "../../../externals/jwt";
import exception from "../../../util/exception";
import Base from "../base";

class EmailConfirmUseCase extends Base{

  public async confirmAccount(token:string) {
    const jwt = new Jwt(process.env.JWT_CONFIRM_EMAIL_SECRET!)
    const tokenData = jwt.validate(token);
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