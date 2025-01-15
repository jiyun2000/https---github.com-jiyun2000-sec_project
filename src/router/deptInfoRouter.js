import { Navigate } from "react-router-dom";
import DeptInfoListPage from "../pages/deptInfo/DeptInfoListPage.js"
import DeptInfoReadPage from "../pages/deptInfo/DeptInfoReadPage.js";
import DeptInfoModifyPage from "../pages/deptInfo/DeptInfoModifyPage.js";
import DeptInfoAddPage from "../pages/deptInfo/DeptInfoAddPage.js";

const deptInfoRouter = () => {
    return [
        {
            path : "list",
            element : <DeptInfoListPage/>
        },
        {
            path : '',
            element : <Navigate replace to={'list'}/>
        },
        {
            path : 'read/:deptNo',
            element : <DeptInfoReadPage/>
        },
        {
            path : 'modify/:deptNo',
            element : <DeptInfoModifyPage/>
        },
        {
            path : 'add',
            element : <DeptInfoAddPage/>
        }
    ]
}

export default deptInfoRouter;