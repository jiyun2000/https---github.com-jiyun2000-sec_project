import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getEmpList, getJob } from "../../api/jobApi";
import JobPageComponent from "../common/JobPageComponent";
import { useNavigate, useParams } from "react-router-dom";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie, removeCookie } from '../../util/cookieUtil';
import colorChat from "../../assets/icon/colorChat.png";
import ReadComponent from "../common/ReadComponent";

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
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [deptNo, setDeptNo] = useState(getCookie("member").deptNo);
    const navigate = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));


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

    const goToBoardList = () => {
        navigate(`/board/list`)
    }


    const checkRemove = () => {
        removeCookie("alert");
    }
    
    const jobDetail = [
        { label: "직책 번호", value: job.jobNo },
        { label: "직책 이름", value: job.jobTitle },
    ];
      
    return <>
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


    <h1 className="text-center m-8 text-3xl font-semibold">{job.jobTitle} 직책 안내</h1>
            <div className="flex flex-col items-center">
            <div className="shadow-xl mt-1 m-2 p-6 w-2/3 flex flex-col items-center">
                <ReadComponent serverData={jobDetail}/>
            </div>

            <div className="flex justify-center p-4 gap-4">
                {deptNo===1?<button type="button" 
                className="py-2 px-6 text-lg  bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                onClick={()=>moveToModify(jobNo)}>
                    수정
                </button>:<></>}
                

                <button type="button"
                className="py-2 px-6 text-lg  bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                onClick={moveToList}>
                    리스트
                </button>
            </div>
        </div>

        <h1 className="text-center mt-8 text-3xl">{job.jobTitle} 직책 직원 목록</h1>

            <div className="overflow-x-auto w-full p-8">
                    <table className="w-full ">
                        <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 text-center">사원 번호</th>
                                <th className="px-6 py-4 text-center">이름</th>
                                <th className="px-6 py-4 text-center">입사일</th>
                                <th className="px-6 py-4 text-center">메일주소</th>
                                <th className="px-6 py-4 text-center">성별</th>
                                <th className="px-6 py-4 text-center">전화번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.dtoList.map((data) => (
                                <tr
                                    key={data.empNo}
                                    className="bg-gray-50 cursor-pointer text-center"
                                >
                                    <td className="px-6 py-4">{data.empNo}</td>
                                    <td className="px-6 py-4">{data.firstName} {data.lastName}</td>
                                    <td className="px-6 py-4">{data.hireDate}</td>
                                    <td className="px-6 py-4">{data.mailAddress}</td>
                                    <td className="px-6 py-4">{data.gender === 'm' ? '남성' : '여성'}</td>
                                    <td className="px-6 py-4">{data.phoneNum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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