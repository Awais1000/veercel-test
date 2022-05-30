import { Outlet, Navigate } from "react-router-dom";
import { getUser } from "../component/servises/common";

const UserProtectedRoute = () => {
  const user = getUser();
  return user ? <Outlet /> : <Navigate to='/login' />
};

export default UserProtectedRoute;