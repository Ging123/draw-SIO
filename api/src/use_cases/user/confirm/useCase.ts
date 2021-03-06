import Jwt from "../../../externals/jwt";
import Base from "../base";

class EmailConfirmUseCase extends Base {

  public async confirmAccount(token:string) {
    const jwt = new Jwt(process.env.JWT_CONFIRM_EMAIL_SECRET!);
    const tokenData = jwt.validate(token);
    const userFound = await this.findUserByEmail(tokenData.email, 'Token inválido');
    await this.verifyIfTokensMatch(token, userFound.confirmation_code);
    const user = await this.user.confirmEmail(userFound);
    this.saveUserDataInChache(user);
    return user;
  }
} 

export default EmailConfirmUseCase;