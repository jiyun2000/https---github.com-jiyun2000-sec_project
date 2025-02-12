import React, { useEffect, useState } from 'react';
import { getJobList } from '../../api/jobApi';
import useCustomMove from '../../hooks/useCustomMove';
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import { getOneEmp } from '../../api/employeesApi';
import colorChat from "../../assets/icon/colorChat.png";

const initState = {
    jobNo : 0,
    jobTitle : ''
}

const JobListComponent = () => {
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [deptNo, setDeptNo] = useState(getCookie("member").deptNo);
    const [job,setJob] = useState([initState]);
    let cnt = 0;
    const navigate = useNavigate();
    const { moveToJobRead, moveToAdd } = useCustomMove();
    const [empData, setEmpData] = useState('');
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

    useEffect(() => {
      getJobList().then(res => {
        //console.log(res); 서버에서 받아오는지 확인 ok
        setJob(res);
      });
    }, [cnt]);

    useEffect(()=>{
        getOneEmp(empNo).then((data) => {
            setEmpData(data);
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    const handleClickAdd = () =>{
        if(empData.jobNo === 1){
            moveToAdd();
        }else{
            alert("권한이 없습니다.");
            return;
        }
        
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    const checkRemove = () => {
        removeCookie("alert");
      }
    
    return (<>
    <div>
        <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
            <div className="flex items-center space-x-8">
                <div className="text-2xl font-semibold text-blue-800 select-none cursor-pointer" onClick={goToBoardList}>
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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                {chatCntCook  ? 
                    <img src={colorChat} alt='colorChat' className='w-full' /> :
                    <img src={chat} alt="Chat" className="w-full" />
                }
                </Link>
            </div>
        </div>
    <div className='m-5'>
            <div className='flex flex-col p-6 items-center  '>
                <h2 className='m-4 text-3xl font-semibold'>직책 안내</h2>
                {job.map((res)=>{
                   return res.jobNo===1?<></>:(
                    <div 
                    key = {res.jobNo} 
                    className='flex w-80 p-2 m-6 text-2xl rounded shadow-md border border-[#a9b8d0] items-center justify-center font-light cursor-pointer' 
                    onClick = {() => moveToJobRead(res.jobNo)}
                    >
                        {res.jobTitle}
                    </div>)
                })}
            </div>
        </div>

        {deptNo===1?<div className="flex p-4 justify-center">
        <button type="button"
        className=" p-4 m-2 text-xl w-28 h-18 bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md cursor-pointer"
        onClick={handleClickAdd}>
            추가
        </button>
        </div>:<></>}
    </div>
    </>
    )
}

export default JobListComponent;