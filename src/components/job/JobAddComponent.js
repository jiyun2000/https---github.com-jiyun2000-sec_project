import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/jobApi";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie } from '../../util/cookieUtil';

const initState = {
    jobNo : 0,
    jobTitle : ''
}

const JobAddComponent = () => {
    const [job, setJob] = useState({...initState});
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const navigate = useNavigate();
    

    const {moveToList} = useCustomMove();

    const handleClickAdd = () => {
        addOne(job).then(()=>{
            alert("등록되었습니다.");
            moveToList();});
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
        </div>
        </>
    )
}

export default JobAddComponent;