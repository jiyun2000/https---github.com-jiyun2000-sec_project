import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import AnnualLeaveReadComponent from "../../components/employees/AnnualLeaveReadComponent";
import AnnualLeaveModifyComponent from "../../components/employees/AnnualLeaveModifyComponent";

const AnnualLeaveModifyPage = () => {
    const {empNo} = useParams();
    
    const navigate = useNavigate();

    const [queryString] = useSearchParams();

    const page = queryString.get('page')?parseInt(queryString.get('page')):1;
    const size = queryString.get('size')?parseInt(queryString.get('size')):10;

    return <>
        <div><AnnualLeaveModifyComponent empNo = {empNo}/></div>
    </>
}

export default AnnualLeaveModifyPage;