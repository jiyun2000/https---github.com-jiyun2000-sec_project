import { Navigate } from "react-router-dom";
import EmployeesReadPage from "../pages/employees/EmployeesReadPage.js";
import EmployeesModifyPage from "../pages/employees/EmployeesModifyPage.js";
import EmployeesAddPage from "../pages/employees/EmployeesAddPage.js";
import EmployeesListPage from "../pages/employees/EmployeesListPage.js";
import AnnualLeaveReadPage from "../pages/employees/AnnualLeaveReadPage.js";
import CommuteListPage from "../pages/employees/CommuteListPage.js";
import CommuteModifyPage from "../pages/employees/CommuteModifyPage.js";

const employeesRouter = () => {
    return [
        {
            path : "list",
            element : <EmployeesListPage/>
        },
        {
            path : '',
            element : <Navigate replace to={'list'}/>
        },
        {
            path : 'read/:empNo',
            element : <EmployeesReadPage/>
        },
        {
            path : 'modify/:empNo',
            element : <EmployeesModifyPage/>
        },
        {
            path : 'add',
            element : <EmployeesAddPage/>
        },
        {
            path : 'annualleave/:empNo',
            element : <AnnualLeaveReadPage/>
        },
        {
            path : 'commute/:empNo',
            element : <CommuteListPage/>
        },
        {
            path : 'commute/modify/:commNo',
            element : <CommuteModifyPage/>
        }
    ]
}

export default employeesRouter;