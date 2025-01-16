import { useParams } from "react-router-dom";
import ReportAddComponent from "../../components/report/ReportAddComponent";

const ReportAddPage = () => {
    const {empNo} = useParams();
    return (
        <div>
            <ReportAddComponent empNo = {empNo}/>
        </div>
    )
}

export default ReportAddPage;