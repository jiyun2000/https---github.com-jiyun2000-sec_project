import { useEffect, useState } from "react";
import JobListComponent from "../../components/job/JobListComponent";
import { getJobList } from "../../api/jobApi";


const JobListPage = () => {
    const [jobList,setJobList] = useState();
    useEffect(()=>{
        getJobList().then(res =>{
            setJobList(res);
        })
    },[]);

    return (
        <div>
            <JobListComponent job = {jobList}/>
        </div>
    )
}

export default JobListPage;