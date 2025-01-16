import { useParams } from "react-router-dom"
import JobModifyComponent from "../../components/job/JobModifyComponent";

const JobModifyPage = () => {
    const {jobNo} = useParams();
    return (
        <div>
            <JobModifyComponent jobNo = {jobNo}/>
        </div>
    )
}

export default JobModifyPage;