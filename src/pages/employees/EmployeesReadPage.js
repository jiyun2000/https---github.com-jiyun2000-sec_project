import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import EmployeesReadComponent from "../../components/employees/EmployeesReadComponent";

const EmployeesReadPage = () => {
    const {empNo} = useParams();

    const navigate = useNavigate();

    const [queryString] = useSearchParams();

    const page = queryString.get('page')?parseInt(queryString.get('page')):1;
    const size = queryString.get('size')?parseInt(queryString.get('size')):10;

    return <>
        <div><EmployeesReadComponent empNo = {empNo}/></div>
    </>
}

export default EmployeesReadPage;