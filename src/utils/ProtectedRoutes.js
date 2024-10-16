import { Navigate, Outlet } from "react-router-dom";
import authService from '../services/authService';

const ProtectedRoutes = () => {
  const userToken = authService.getUserToken();
  return userToken ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes;