import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CommuteListComponent from "../../components/employees/CommuteListComponent";

const CommuteListPage = () => {
    const {empNo} = useParams();

    const navigate = useNavigate();

    const [queryString] = useSearchParams();

    const page = queryString.get('page')?parseInt(queryString.get('page')):1;
    const size = queryString.get('size')?parseInt(queryString.get('size')):10;

    return <>
        <div><CommuteListComponent empNo = {empNo}/></div>
    </>
}

export default CommuteListPage;