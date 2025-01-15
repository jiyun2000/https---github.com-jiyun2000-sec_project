import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import DeptInfoReadComponent from "../../components/deptInfo/DeptInfoReadComponent";

const DeptInfoReadPage = () => {
    const {deptNo} = useParams();

    const navigate = useNavigate();

    const [queryString] = useSearchParams();

    const page = queryString.get('page')?parseInt(queryString.get('page')):1;
    const size = queryString.get('size')?parseInt(queryString.get('size')):10;

    return <>
        <div><DeptInfoReadComponent deptNo = {deptNo}/></div>
    </>
}

export default DeptInfoReadPage;