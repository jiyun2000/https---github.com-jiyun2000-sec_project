import { Navigate } from "react-router-dom";
import DayOffReadPage from "../pages/dayOff/DayOffReadPage.js";
import DayOffModifyPage from "../pages/dayOff/DayOffModifyPage.js";
import DayOffAddPage from "../pages/dayOff/DayOffAddPage.js";
import DayOffListPage from "../pages/dayOff/DayOffListPage.js";

const dayOffRouter = () => {
    return [
        {
            path : "list",
            element : <DayOffListPage/>
        },
        {
            path : '',
            element : <Navigate replace to={'list'}/>
        },
        {
            path : 'read/:dayOffNo',
            element : <DayOffReadPage/>
        },
        {
            path : 'modify/:dayOffNo',
            element : <DayOffModifyPage/>
        },
        {
            path : 'add',
            element : <DayOffAddPage/>
        }
    ]
}

export default dayOffRouter;