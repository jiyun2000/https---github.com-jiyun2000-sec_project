import React, { useEffect, useState } from 'react';
import { getList } from '../../api/jobApi';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    jobNo : 0,
    jobTitle : ''
}

const JobListComponent = () => {

    const [job,setJob] = useState([initState]);
    let cnt = 0;

    const { moveToJobRead, moveToAdd } = useCustomMove();

    useEffect(() => {
      getList().then(res => {
        //console.log(res); 서버에서 받아오는지 확인 ok
        setJob(res);
      });
    }, [cnt]);

    const handleClickAdd = () =>{
        moveToAdd();
    }
    
    return (<>
    <div className="text-3xl">
            <div className='flex flex-wrap mx-auto p-6'>
                {job.map((res)=>{
                    return(
                    <div 
                    key = {res.jobNo} 
                    className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                    onClick = {() => moveToJobRead(res.jobNo)}
                    >
                        {res.jobNo} 
                        {res.jobTitle}
                    </div>)
                })}
            </div>
        </div>

        <div className="flex justify-end p-4">
        <button type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        onClick={handleClickAdd}>
            add
        </button>
        </div>
        </>
    )
}

export default JobListComponent;