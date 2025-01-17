import { useParams } from "react-router-dom";
import SentReportReadComponent from "../../components/report/SentReportReadComponent";

const SentReportReadPage = () => {
    const {reportNo} = useParams();
    return (
        <div>
            <SentReportReadComponent reportNo = {reportNo}/>
        </div>
    )
}

export default SentReportReadPage;