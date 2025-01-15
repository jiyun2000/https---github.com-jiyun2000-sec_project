import { Navigate, Outlet } from 'react-router';
import { getCookie } from '../util/cookieUtil';

export const ProtectedRoute = ({ child }) => {
  const memberCookie = getCookie('member');
  if (!memberCookie) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
