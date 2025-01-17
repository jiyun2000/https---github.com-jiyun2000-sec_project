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
    <div className='m-5'>
            <div className='flex flex-col p-6 items-center '>
                <h2 className='py-2 text-3xl'>직책 안내</h2>
                {job.map((res)=>{
                    return(
                    <div 
                    key = {res.jobNo} 
                    className='flex w-80  p-2 m-2 rounded shadow-md border border-blue-300 items-center justify-center font-light' 
                    onClick = {() => moveToJobRead(res.jobNo)}
                    >
                        {res.jobTitle}
                    </div>)
                })}
            </div>
        </div>

        <div className="flex p-4 justify-center">
        <button type="button"
        className="rounded p-4 m-2 text-xl w-28 h-18 text-white bg-blue-300"
        onClick={handleClickAdd}>
            추가
        </button>
        </div>
        </>
    )
}

export default JobListComponent;