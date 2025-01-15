import { useParams } from "react-router-dom";
import ReceivedReportReadComponent from "../../components/report/ReceivedReportReadComponent";

const ReceivedReportReadPage = () => {
    const {reportNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                보고서 페이지
            </div>

            <ReceivedReportReadComponent reportNo = {reportNo}/>
        </div>
    )
}

export default ReceivedReportReadPage;