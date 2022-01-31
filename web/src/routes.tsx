import { Routes as Endpoints, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./UI/pages/Login/Index'));
const SignUp = lazy(() => import('./UI/pages/SignUp/Index'));
const Home = lazy(() => import('./UI/pages/Home/Index'));
const Game = lazy(() => import('./UI/pages/Game/Index'));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Endpoints>
        <Route element={<Login/>} path="/"/>
        <Route element={<SignUp/>} path="/signup"/>
        <Route element={<Home/>} path="/home"/>
        <Route element={<Game/>} path="/game"/>
      </Endpoints>
    </Suspense>
  );
}

export default Routes;