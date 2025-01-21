import React, { useEffect, useState } from 'react';
import { getJobList } from '../../api/jobApi';
import useCustomMove from '../../hooks/useCustomMove';
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';

const initState = {
    jobNo : 0,
    jobTitle : ''
}

const JobListComponent = () => {
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [job,setJob] = useState([initState]);
    let cnt = 0;

    const { moveToJobRead, moveToAdd } = useCustomMove();

    useEffect(() => {
      getJobList().then(res => {
        //console.log(res); 서버에서 받아오는지 확인 ok
        setJob(res);
      });
    }, [cnt]);

    const handleClickAdd = () =>{
        moveToAdd();
    }
    
    return (<>
    <div>
        <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
            <div className="flex items-center space-x-8">
                <div className="text-2xl font-semibold text-blue-800 select-none">
                  [공지사항]
                </div>
                <div className="w-64 text-2xl font-semibold cursor-pointer">
                    <BoardTitleComponent />
                </div>
            </div>
            <div className="flex space-x-4">
                <Link to="/mail" className="w-12 cursor-pointer">
                    <img src={mail} alt="Mail" className="w-full" />
                </Link>
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                    <img src={chat} alt="Chat" className="w-full" />
                </Link>
            </div>
        </div>
    <div className='m-5'>
            <div className='flex flex-col p-6 items-center  '>
                <h2 className='m-4 text-3xl font-semibold'>직책 안내</h2>
                {job.map((res)=>{
                    res.jobNo===999?<></>:(
                    <div 
                    key = {res.jobNo} 
                    className='flex w-80 p-2 m-6 text-2xl rounded shadow-md border border-[#a9b8d0] items-center justify-center font-light' 
                    onClick = {() => moveToJobRead(res.jobNo)}
                    >
                        {res.jobTitle}
                    </div>)
                })}
            </div>
        </div>

        <div className="flex p-4 justify-center">
        <button type="button"
        className=" p-4 m-2 text-xl w-28 h-18 text-white bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd]"
        onClick={handleClickAdd}>
            추가
        </button>
        </div>
    </div>
    </>
    )
}

export default JobListComponent;