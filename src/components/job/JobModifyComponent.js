import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { delOne, getJob, getOne, putOne } from "../../api/jobApi";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie } from '../../util/cookieUtil';
import { getOneEmp } from "../../api/employeesApi";

const initState = {
    jobNo : 0,
    jobTitle : ''
}

const JobModifyComponent = ({jobNo}) => {
    const [job, setJob] = useState({...initState});
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const {moveToList, moveToRead} = useCustomMove();
    const navigate = useNavigate();
    const [empData, setEmpData] = useState('');

    useEffect(()=>{
        getJob(jobNo).then(data=>setJob(data));
    },[jobNo]);

    useEffect(()=>{
        getOneEmp(empNo).then((data) => {
            setEmpData(data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleClickDelete = () => {
        if(empData.jobNo === 999){
            delOne(jobNo).then(()=>moveToList());
        }else{
            alert("권한이 없습니다.");
            return;
        }
        
    }

    const handleClickModify = () => {
        if(empData.jobNo === 999){
            putOne(jobNo,job).then(()=>moveToRead(jobNo));
        }else{
            alert("권한이 없습니다.");
            return;
        }
      
    }

    const handleChangeJob = (evt) => {
        job[evt.target.name] = evt.target.value;
        setJob({...job});
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    return (
        <>
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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                    <img src={chat} alt="Chat" className="w-full" />
                </Link>
            </div>
        </div>

        <h1 className="text-center mt-10 font-bold text-3xl">{job.jobTitle} 직책 수정하기</h1>
        <div className="mt-10 m-2 p-4">
            <div className="flex justify-center mt-5">
                <div className=" mb-4 flex w-full flex-row items-center justify-center">
                    <div className="w-[10%] p-6 font-bold">직책 번호</div>
                    <div className="w-[30%] p-6 rounded-md border border-slate-400 text-center ">{job.jobNo}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="mb-4 flex w-full flex-row items-center justify-center">
                    <div className="w-[10%] p-6 font-bold">직책명</div>
                    <input className="w-[30%] p-6 rounded-md border border-slate-400 text-center" 
                    name="jobTitle"
                    type={'text'} 
                    value={job.jobTitle} 
                    onChange={handleChangeJob}></input>
                </div>
            </div>

            <div className="flex justify-center p-4 gap-4 mt-8">
                <button type="button"
                className="text-white py-2 px-6 text-lg  bg-[#8ba7cd]  hover:bg-[#6f8cb4] rounded-md cursor-pointer"
                onClick={handleClickModify}>
                    수정
                </button>

                <button type="button"
                className="text-white py-2 px-6 text-lg  bg-[#8ba7cd]  hover:bg-[#6f8cb4] rounded-md cursor-pointer"
                onClick={handleClickDelete}
                >
                    삭제
                </button>
            </div>
        </div>
        </div>
        </>
    )
}

export default JobModifyComponent;