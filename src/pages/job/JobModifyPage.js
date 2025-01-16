import { useParams } from "react-router-dom"
import JobModifyComponent from "../../components/job/JobModifyComponent";

const JobModifyPage = () => {
    const {jobNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Job Modify {jobNo}
            </div>
            <JobModifyComponent jobNo = {jobNo}/>
        </div>
    )
}

export default JobModifyPage;