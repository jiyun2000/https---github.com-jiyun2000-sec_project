import { useEffect, useState } from "react";
import JobListComponent from "../../components/job/JobListComponent";
import { getList } from "../../api/jobApi";


const JobListPage = () => {
    const [jobList,setJobList] = useState();
    useEffect(()=>{
        getList().then(res =>{
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