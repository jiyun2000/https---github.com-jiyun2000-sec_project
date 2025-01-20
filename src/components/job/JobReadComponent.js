import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getEmpList, getJob } from "../../api/jobApi";
import JobPageComponent from "../common/JobPageComponent";
import { useParams } from "react-router-dom";

const initState = {
    jobNo : 0,
    jobTitle : ''
}

const initStateEmp = {
    dtoList : [],
    pageNumList : [],
    pageRequestDTO : null,
    prev : false,
    next : false,
    totalCount : 0,
    prevPage : 0,
    nextPage : 0,
    totalPage : 0,
    current : 0
}

const JobReadComponent = ({jobNo})=>{
    const [job, setJob] = useState(initState);
    const [employees, setEmployees] = useState(initStateEmp);

    const {page, size, moveToJobList, moveToList, moveToModify} = useCustomMove();

    useEffect(()=>{
        getJob(jobNo).then(res => {
            setJob(res);
        });
    },[page]);

    useEffect(() => {
        getEmpList(jobNo,[page,size]).then(res => {
            setEmployees(res);
        })
    },[page]);

    return <>
    <h1 className="text-center mt-8 text-3xl">{job.jobTitle} 직책 안내</h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10 flex-col">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">직책 번호 : </div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-300 ">{job.jobNo}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">직책 이름 : </div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-300 ">{job.jobTitle}</div>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-sky-400 hover:text-white hover:bg-blue-500 cursor-pointer"
                onClick={()=>moveToModify(jobNo)}>
                    수정
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-blue-400 hover:text-white hover:bg-sky-500 cursor-pointer"
                onClick={moveToList}>
                    리스트
                </button>
            </div>
        </div>

        <h1 className="text-center mt-8 text-3xl">{job.jobTitle} 직책 직원 목록</h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
            <div className='flex flex-wrap mx-auto p-6'>
                {employees.dtoList.map((res)=>{
                    return(
                    <div 
                    key = {res.empNo} 
                    className='flex w-full min-w-[400px] p-2 m-2 rounded ' 
                    >
                        <div className="w-2/5 p-6 text-right font-bold">사원번호  </div>
                        <div className="w-1/5 p-6 rounded-md border border-blue-200 ">{res.empNo}</div>

                        <div className="w-1/5 p-6 text-right font-bold">이름  </div>
                        <div className="w-4/5 p-6 rounded-md border border-blue-200">{res.firstName} {res.lastName}</div>
                    </div>)
                })}
            </div>

            <div>
                <JobPageComponent
                serverData={employees} 
                job={job}
                movePage={moveToJobList}
                 />
            </div>
        </div>
    </>
}

export default JobReadComponent;