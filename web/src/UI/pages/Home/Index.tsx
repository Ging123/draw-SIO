import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetUserUseCase from "../../../domain/use_cases/user/get/useCase";
import LocalStorage from "../../../services/localstorage";
import PlayButton from "../../components/PlayButton/Index";
import Text from "../../components/Text/Index";
import './styles.scss';

interface user {
  _id:string;
  email:string;
  username:string;
}

const Home = () => {
  document.title = 'Bem Vindo';
  const [userData, setUserData] = useState<user>();
  const user = new GetUserUseCase();
  const navigate = useNavigate();
  const goToLoginPage = () => navigate('/');

  useEffect(() => {
    (async () => {
      try {
        const userFound = await user.get();
        setUserData(userFound);
      }
      catch(err) { 
        /*const localstorage = new LocalStorage();
        localstorage.remove('token');*/
        goToLoginPage();
      }
    })()
  }, []);

  return ( 
    <>
      { userData && 
        <div id="home-page-wrapper">
          <Text
            content={ `Bem vindo ${userData.username}` }
            fontWeight={ 600 }
            fontSize="30px"
            margin="50px"
            textAlign="center"
          />
          <PlayButton />
        </div>
      }
    </>
  );
};

export default Home;