import { Navigate } from "react-router-dom";
import ReceivedReportListPage from "../pages/report/ReceivedReportListPage";
import ReportAddPage from "../pages/report/ReportAddPage";
import SentReportListPage from "../pages/report/SentReportListPage";
import SentReportReadPage from "../pages/report/SentReportReadPage";
import ReceivedReportReadPage from "../pages/report/ReceivedReportReadPage";


const reportRouter = () => {
    return [
        {
            path : "list/received/:empNo",
            element : <ReceivedReportListPage/>
        },
        {
            path : '',
            element : <Navigate replace to={'../list/received/:empNo'}/>
        },
        {
            path : 'add/:empNo',
            element : <ReportAddPage/>
        },
        {
            path : "list/sent/:empNo",
            element : <SentReportListPage/>
        },
        {
            path : 'read/sent/:reportNo',
            element : <SentReportReadPage/>
        },
        {
            path : 'read/received/:reportNo',
            element : <ReceivedReportReadPage/>
        },
        // {
        //     path : 'modify/:empNo',
        //     element : <EmployeesModifyPage/>
        // },
        // {
        //     path : 'annualleave/:empNo',
        //     element : <AnnualLeaveReadPage/>
        // },
        // {
        //     path : 'commute/:empNo',
        //     element : <CommuteListPage/>
        // },
        // {
        //     path : 'commute/modify/:commNo',
        //     element : <CommuteModifyPage/>
        // }
    ]
}

export default reportRouter;