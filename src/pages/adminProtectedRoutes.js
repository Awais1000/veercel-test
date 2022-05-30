import { Outlet, Navigate } from "react-router-dom";
import { getUser } from "../component/servises/common";

const AdminProtectedRoute = () => {
  const user = getUser();
  return user.user.user_type === 1 ? <Outlet /> : <Navigate to='/' />
};

export default AdminProtectedRoute;