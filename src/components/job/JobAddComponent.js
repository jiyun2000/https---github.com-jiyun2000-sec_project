import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/jobApi";

const initState = {
    jobNo : 0,
    jobTitle : ''
}

const JobAddComponent = () => {
    const [job, setJob] = useState({...initState});

    const {moveToList} = useCustomMove();

    const handleClickAdd = () => {
        addOne(job).then(()=>moveToList());
    }

    const handleChangeJob = (evt) => {
        job[evt.target.name] = evt.target.value;
        setJob({...job});
    }

    return (
        <>
        <h1 className="text-center mt-8 text-3xl">직책 추가하기</h1>
        <div className="border border-blue-300 rounded-md mt-8 m-2 p-4 ">
            <div className="flex justify-center mt-10  flex-col items-center" >
                <div className="w-1/5 p-6 font-bold text-center">직책 번호</div>
                <input className="w-2/4 p-6 rounded-md border border-blue-300 m-3" 
                    name="jobNo"
                    type={'number'} 
                    value={job.jobNo}
                    onChange={handleChangeJob}></input>
            </div>

            <div className="flex justify-center  mt-10  flex-col">
            <div className="flex justify-center mt-10  flex-col items-center" >
                    <div className="w-1/5 p-6 font-bold text-center">직책명</div>
                    <input className="w-2/4 p-6 rounded-md border  border-blue-300 m-3" 
                    name="jobTitle"
                    type={'text'} 
                    value={job.jobTitle} 
                    onChange={handleChangeJob}></input>
                </div>
            </div>

            <div className="flex justify-end p-4 ">
                <button type="button"
                className="rounded p-4 m-2 text-xl w-28 h-18 text-white bg-blue-300"
                onClick={handleClickAdd}>
                    추가
                </button>
            </div>
        </div>
        </>
    )
}

export default JobAddComponent;