import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/schedulePage/LoginPage";
import DdtPage  from "../pages/schedulePage/DdtPage";
import RegisterPage  from "../pages/schedulePage/RegisterPage";
import EmpDeptSchedulePage  from "../pages/schedulePage/EmpDeptSchedulePage";
import TodayListPage  from "../pages/schedulePage/TodayListPage";
import ModEmpSChedulePage  from "../pages/schedulePage/ModEmpSchedulePage";
import RegisterDeptPage  from "../pages/schedulePage/RegisterDeptPage";
import ModDeptSchedulePage  from "../pages/schedulePage/ModDeptSchedulePage";
import EmpTodoPage from "../pages/todoPage/EmpTodoPage";
import DeptTodoPage from "../pages/todoPage/DeptTodoPage";
import StompComponent from "../components/chatComponent/StompComponent";
import ChatEmpListPage from "../pages/chatPage/ChatEmpListPage";
import StompPage from "../pages/chatPage/StompPage";




const root = createBrowserRouter([
    {
        path :'',
        element:<LoginPage />
    },
    {
        path :'ddt',
        element:<DdtPage />
    },
    {   // employees schedule 등록하기 
        path :'empSchedule/register/:empNo',
        element:<RegisterPage />
    },
    {   // employsees & department schedule 모두 불러오기  
        path :'empDeptSchedule/read/:deptNo/:empNo',
        element:<EmpDeptSchedulePage />
    },
    {   // eploysees & departments schedule 에 해당 날짜에 리스트만 불러오기
        path :'empDeptSchedule/list/:deptNo/:empNo/:selectDate',
        element:<TodayListPage />
    },
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
    }

    
])
export default root;