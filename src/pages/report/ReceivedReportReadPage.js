import { useParams } from "react-router-dom";
import ReceivedReportReadComponent from "../../components/report/ReceivedReportReadComponent";

const ReceivedReportReadPage = () => {
    const {reportNo} = useParams();
    return (
        <div>
             <ReceivedReportReadComponent reportNo = {reportNo}/>
        </div>
    )
}

export default ReceivedReportReadPage;