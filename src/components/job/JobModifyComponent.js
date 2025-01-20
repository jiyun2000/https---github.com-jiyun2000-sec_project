import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { delOne, getJob, getOne, putOne } from "../../api/jobApi";
import { delOne, getOne, putOne } from "../../api/jobApi";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie } from '../../util/cookieUtil';

const initState = {
    jobNo : 0,
    jobTitle : ''
}

const JobModifyComponent = ({jobNo}) => {
    const [job, setJob] = useState({...initState});
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const {moveToList, moveToRead} = useCustomMove();

    useEffect(()=>{
        getJob(jobNo).then(data=>setJob(data));
    },[jobNo]);

    const handleClickDelete = () => {
        delOne(jobNo).then(()=>moveToList());
    }

    const handleClickModify = () => {
        putOne(jobNo,job).then(()=>moveToRead(jobNo));
    }

    const handleChangeJob = (evt) => {
        job[evt.target.name] = evt.target.value;
        setJob({...job});
    }

    return (
        <>
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

        <h1 className="text-center mt-8 text-3xl">{job.jobTitle} 직책 수정하기</h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="w-1/5 p-6 font-bold">직책 번호</div>
                <div className="w-4/5 p-6 rounded-md border border-blue-300 ">{job.jobNo}</div>
            </div>

            <div className="flex justify-center m-2">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">직책명</div>
                    <input className="w-4/5 p-6 rounded-md border border-blue-300 " 
                    name="jobTitle"
                    type={'text'} 
                    value={job.jobTitle} 
                    onChange={handleChangeJob}></input>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-sky-400 hover:text-white hover:bg-blue-500 cursor-pointer"
                onClick={handleClickModify}>
                    수정
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-blue-400 hover:text-white hover:bg-sky-500 cursor-pointer"
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