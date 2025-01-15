import { useParams } from "react-router-dom";
import SentReportReadComponent from "../../components/report/SentReportReadComponent";

const SentReportReadPage = () => {
    const {reportNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                보고서 페이지
            </div>

            <SentReportReadComponent reportNo = {reportNo}/>
        </div>
    )
}

export default SentReportReadPage;