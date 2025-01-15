import { Navigate } from "react-router-dom";
import EmployeesReadPage from "../pages/employees/EmployeesReadPage.js";
import EmployeesModifyPage from "../pages/employees/EmployeesModifyPage.js";
import EmployeesAddPage from "../pages/employees/EmployeesAddPage.js";
import EmployeesListPage from "../pages/employees/EmployeesListPage.js";

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
        }
    ]
}

export default employeesRouter;