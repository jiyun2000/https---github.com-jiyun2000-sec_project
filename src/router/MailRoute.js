import { Navigate } from 'react-router';
import MailList from '../pages/mail/MailList';
import MailDetail from '../pages/mail/MailDetail';

const MailRoute = () => {
  return [
    {
      path: '',
      element: <Navigate replace to={'list'} />,
    },
    {
      path: 'list',
      element: <MailList />,
    },
    {
      path: 'detail',
      element: <MailDetail />,
    },
  ];
};
export default MailRoute;
