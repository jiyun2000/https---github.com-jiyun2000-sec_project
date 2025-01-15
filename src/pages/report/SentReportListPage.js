import { useParams } from "react-router-dom";
import SentReportListComponent from "../../components/report/SentReportListComponent";


const SentReportListPage = () => {

    const {empNo} = useParams();

    return (
        <div>
            <SentReportListComponent empNo = {empNo}/>
        </div>
    )
}

export default SentReportListPage;