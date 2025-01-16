
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import jobRouter from "./jobRouter";
import deptInfoRouter from "./deptInfoRouter";
import roomListRouter from "./roomListRouter";
import bookingRouter from "./bookingRouter";
import dayOffRouter from "./dayOffRouter";
import employeesRouter from "./employeesRouter";
import reportRouter from "./reportRouter";
import LoginPage from "../pages/login/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import MailRoute from "./MailRoute";
import MailPage from "../pages/mail/MailPage";

const root = createBrowserRouter([
    {
        path: '',
        element: <LoginPage />,
      },
      {
        path: 'main',
        element: <ProtectedRoute />,
        children: [{ path: '/main', element: <MainPage /> }],
      },
      {
        path: 'mail',
        element: <ProtectedRoute />,
        children: [{ path: '/mail', element: <MailPage />, children: MailRoute() }],
      },
    {
        path : 'job',
        children : jobRouter()
    },
    {
        path : 'deptinfo',
        children : deptInfoRouter()
    },
    {
        path : 'room',
        children : roomListRouter()
    },
    {
        path : 'booking',
        children : bookingRouter()
    },
    {
        path : 'dayoff',
        children : dayOffRouter()
    },
    {
        path : 'employees',
        children : employeesRouter()
    },
    {
        path : 'report',
        children : reportRouter()
    }
])

export default root;