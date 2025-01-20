
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
import RegisterPage from "../pages/schedulePage/RegisterPage";
import EmpDeptSchedulePage from "../pages/schedulePage/EmpDeptSchedulePage";
import TodayListPage from "../pages/schedulePage/TodayListPage";
import ModEmpSChedulePage from "../pages/schedulePage/ModEmpSchedulePage";
import RegisterDeptPage from "../pages/schedulePage/RegisterDeptPage";
import ModDeptSchedulePage from "../pages/schedulePage/ModDeptSchedulePage";
import EmpTodoPage from "../pages/todoPage/EmpTodoPage";
import DeptTodoPage from "../pages/todoPage/DeptTodoPage";
import ChatEmpListPage from "../pages/chatPage/ChatEmpListPage";
import StompPage from "../pages/chatPage/StompPage";
import ChatListPage from "../pages/chatPage/ChatListPage";
import Layout from "../layouts/Layout";
import boardRouter from "./boardRouter";
import MenuPage from "../pages/menu/MenuPage";
import MenuAddPage from "../pages/menu/MenuAddPage";
import MenuListPage from "../pages/menu/MenuListPage";
import MenuReadPage from "../pages/menu/MenuReadPage";
import MenuModPage from "../pages/menu/MenuModpage";
import BirthEmpPage from "../pages/BirthEmpPage";
import AnnualLeaveCountPage from "../pages/employees/AnnualLeaveCountPage";

const root = createBrowserRouter([
    {
        path: '',
        element: <LoginPage />,
    },
    {
        path:'',
        element:<Layout />,
        children: [
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
                },
                {   // employees schedule 등록하기 
                    path :'empSchedule/register/:empNo',
                    element:<RegisterPage />
                },
                {   // employsees & department schedule 모두 불러오기  
                    path :'empDeptSchedule/read/:deptNo/:empNo',
                    element:<EmpDeptSchedulePage />
                },
                // {   // eploysees & departments schedule 에 해당 날짜에 리스트만 불러오기
                //     path :'empDeptSchedule/list/:deptNo/:empNo/:selectDate',
                //     element:<TodayListPage />
                // },
                {   // employees schedule 해당 일정 수정하기
                    path :'empSchedule/mod/:empNo/:empSchNo',
                    element:<ModEmpSChedulePage />
                },
                {   // department schedule 등록하기 (팀장만 가능)
                    path : 'deptSchedule/register/:deptNo/:empNo',
                    element: <RegisterDeptPage />
                },
                {   // department schedule 수정하기 (팀장만 가능)
                    path : 'deptSchedule/mod/:deptNo/:empNo/:deptSchNo',
                    element: <ModDeptSchedulePage />
                },
                {   // Employees Todo List Page
                    path : 'empTodo/read/:empNo/:selectDate',
                    element: <EmpTodoPage />
                },
                {   // Department Todo List Page
                    path : 'deptTodo/read/:empNo/:deptNo/:selectDate',
                    element: <DeptTodoPage />
                },
                {   // Department Todo List Page
                    path : 'chat/empList/:empNo',
                    element: <ChatEmpListPage />
                },
                {
                    path : 'chat/:senderEmpNo/:receiverEmpNo',
                    element : <StompPage />
                },
                {
                    path : 'chat/chatList/:senderEmpNo',
                    element: <ChatListPage />
                },
                {
                    path: 'board',
                    children: boardRouter(),
                },
                {
                    path : 'menu/read/:menuDate',
                    element : <MenuPage />
                },
                {
                    path : 'menu/add',
                    element : <MenuAddPage />
                },
                {
                    path : 'menu/list',
                    element : <MenuListPage />
                },
                {
                    path : 'menu/readMenu/:menuNo',
                    element : <MenuReadPage />
                },
                {
                    path : 'menu/:menuNo',
                    element : <MenuModPage />
                },
                {
                    path : 'employees/birth',
                    element : <BirthEmpPage />
                },
                {
                    path : 'employees/annualleave/count/:empNo',
                    element : <AnnualLeaveCountPage />
                }
            ]
        }
])

export default root;