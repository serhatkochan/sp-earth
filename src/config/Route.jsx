import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppLayout from '../layouts/appLayout';
import LoginLayout from '../layouts/loginLayout';

const PrivateRoute = () => {
  const isLogin = useSelector((state) => state.currentUser);
  return isLogin ? <AppLayout /> : <Navigate to="/login" />;
};

const NonAuthRoute = () => {
  const isLogin = useSelector((state) => state.currentUser);
  return !isLogin ? <LoginLayout /> : <Navigate to="/" />;
};
export { NonAuthRoute, PrivateRoute };
