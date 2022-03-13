import { NavigateFunction } from "react-router-dom";
import LogoutUserUseCase from "../../../domain/use_cases/user/logout/useCase";

async function logout(navigate:NavigateFunction) {
  const user = new LogoutUserUseCase();
  await user.logout();
  navigate("/");
}

export default logout;