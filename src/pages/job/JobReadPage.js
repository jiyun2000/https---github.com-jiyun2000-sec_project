import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import JobReadComponent from "../../components/job/JobReadComponent";

const JobReadPage = () => {
    const {jobNo} = useParams();

    const navigate = useNavigate();

    const [queryString] = useSearchParams();

    const page = queryString.get('page')?parseInt(queryString.get('page')):1;
    const size = queryString.get('size')?parseInt(queryString.get('size')):10;

    return <>
        <div><JobReadComponent jobNo = {jobNo}/></div>
    </>
}

export default JobReadPage;