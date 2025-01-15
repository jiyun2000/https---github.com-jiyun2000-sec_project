import { Navigate } from "react-router-dom";
import JobListPage from "../pages/job/JobListPage.js"
import JobReadPage from "../pages/job/JobReadPage.js";
import JobModifyPage from "../pages/job/JobModifyPage.js";
import JobAddPage from "../pages/job/JobAddPage.js";

const jobRouter = () => {
    return [
        {
            path : "list",
            element : <JobListPage/>
        },
        {
            path : '',
            element : <Navigate replace to={'list'}/>
        },
        {
            path : 'read/:jobNo',
            element : <JobReadPage/>
        },
        {
            path : 'modify/:jobNo',
            element : <JobModifyPage/>
        },
        {
            path : 'add',
            element : <JobAddPage/>
        }
    ]
}

export default jobRouter;