import { useParams } from "react-router-dom";
import ReportAddComponent from "../../components/report/ReportAddComponent";

const ReportAddPage = () => {
    const {empNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                보고서 작성 페이지
            </div>

            <ReportAddComponent empNo = {empNo}/>
        </div>
    )
}

export default ReportAddPage;