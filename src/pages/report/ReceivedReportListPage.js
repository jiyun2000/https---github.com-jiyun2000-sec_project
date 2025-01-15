import { useParams } from "react-router-dom";
import ReceivedReportListComponent from "../../components/report/ReceivedReportListComponent";


const ReceivedReportListPage = () => {

    const {empNo} = useParams();

    return (
        <div>
            <ReceivedReportListComponent empNo = {empNo}/>
        </div>
    )
}

export default ReceivedReportListPage;