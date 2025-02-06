import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import {  getOneEmp } from "../../api/employeesApi";
import { Link, useNavigate } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import { getCookie, removeCookie } from "../../util/cookieUtil";
import {deptOne} from "../../api/deptInfoApi";
import { getOne } from "../../api/boardApi";
import colorChat from "../../assets/icon/colorChat.png";
import m from "../../assets/icon/m.png";
import w from "../../assets/icon/w.png";

const initState = {
    empNo: 0,
    firstName: '',
    lastName: '',
    hireDate: '',
    mailAddress: '',
    salary: 0,
    deptNo: 0,
    jobNo: 0,
    birthday: '',
    address: '',
    phoneNum: '',
    gender: '',
    citizenId: ''
};

const EmployeesReadComponent = ({ empNo }) => {
    const [employees, setEmployees] = useState(initState);
    const [cookieDeptNo, setCookieDeptNo] = useState(getCookie("member").deptNo);
    const { page, moveToReportReceived, moveToList, moveToModify, moveToCommuteList, moveToAnnualLeave } = useCustomMove();
    const [deptData, setDeptData] = useState("");
    const [jobData, setJobData] = useState("");
    const [employeeNo,setEmployeeNo] = useState(getCookie("member").empNo);
    const navigate = useNavigate();
    const [empData, setEmpData] = useState('');
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

    useEffect(() => {
        getOneEmp(empNo).then(res => {
            setEmployees(res);
            console.log(res)
        });
    }, [empNo]);

    useEffect(()=>{
        deptOne(cookieDeptNo).then((data) => {
            console.log(cookieDeptNo);
            console.log(data);
            setDeptData(data);

        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    const goToReport = (empNo) => {
        navigate(`/report/list/received`)
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }
    
    useEffect(()=>{
        getOne(empNo).then((data) => {
            console.log(data);
            setEmpData(data);
        }).catch((error) => {
            console.log(error)
        })
    }, []);

      const checkRemove = () => {
        removeCookie("alert");
      }

    return (
        <>
        <div>
            <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-semibold text-blue-800 select-none  cursor-pointer" onClick={goToBoardList}>
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

            
            <div className="flex flex-col items-center justify-center w-full">
                    <div className="text-center m-6">
                        <h2 className="text-3xl mt-10 font-semibold text-gray-800 mb-4">사원 정보</h2>
                    </div>
                <div className="flex flex-row justify-center items-center w-full max-w-screen-lg">
                    <div className="flex flex-col items-center m-5 mr-10">
                    {employees.gender === 'm' ? 
                        <img src={m} alt="man" className="w-[200px] h-[200px]" /> : 
                        <img src={w} alt="woman" className="w-[200px] h-[200px]" />
                    }
                    </div>
                    
                    <div className="flex flex-col  space-y-4 items-center">
                    
                    <div className="space-y-3">
                        <div className="flex flex-row gap-5  text-xl">
                            <span className="font-semibold text-gray-700">사원 번호:</span>
                            <span className="text-gray-500">{employees.empNo}</span>
                        </div>
                        <div className="flex flex-row gap-5 text-xl">
                            <span className="font-semibold text-gray-700">이름:</span>
                            <span className="text-gray-500">{employees.firstName} {employees.lastName}</span>
                        </div>
                        <div className="flex flex-row gap-5 text-xl">
                            <span className="font-semibold text-gray-700">입사일:</span>
                            <span className="text-gray-500">{employees.hireDate}</span>
                        </div>
                        <div className="flex flex-row gap-5 text-xl">
                            <span className="font-semibold text-gray-700">메일주소:</span>
                            <span className="text-gray-500">{employees.mailAddress}</span>
                        </div>
                        <div className="flex flex-row gap-5 text-xl">
                            <span className="font-semibold text-gray-700">연봉:</span>
                            <span className="text-gray-500">{employees.salary}</span>
                        </div>
                        <div className="flex flex-row gap-5 text-xl">
                            <span className="font-semibold text-gray-700">부서:</span>
                            <span className="text-gray-500">{deptData.deptName}</span>
                        </div>
                        <div className="flex flex-row gap-5 text-xl">
                            <span className="font-semibold text-gray-700">직책번호:</span>
                            <span className="text-gray-500">{employees.jobNo}</span>
                        </div>
                        <div className="flex flex-row gap-5 text-xl">
                            <span className="font-semibold text-gray-700">성별:</span>
                            <span className="text-gray-500">{employees.gender === 'm' ? '남성' : '여성'} </span>
                        </div>
                        <div className="flex flex-row gap-5 text-xl">
                            <span className="font-semibold text-gray-700">전화번호:</span>
                            <span className="text-gray-500">{employees.phoneNum.substring(0,3)}-{employees.phoneNum.substring(3,7)}-{employees.phoneNum.substring(7,employees.phoneNum.length)}</span>
                        </div>
                        <div className="flex flex-row gap-5 text-xl">
                            <span className="font-semibold text-gray-700">주민등록번호:</span>
                            <span className="text-gray-500">{employees.citizenId.substring(0,6)}-{employees.citizenId.substring(6,13)}</span>
                        </div>
                     </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center w-[60%] gap-4 mt-10 mx-3">
                    <button 
                    className="w-[40%] py-2 bg-[#7b7b7b] text-white rounded-lg hover:bg-[#303030]"
                    onClick={() => goToReport(empNo)}
                    >
                    리포트
                    </button>
                    <button 
                    className="w-[40%] py-2 bg-[#7b7b7b] text-white rounded-lg hover:bg-[#303030]"
                    onClick={moveToCommuteList}
                    >
                    출퇴근
                    </button>
                    <button 
                    className="w-[40%] py-2 bg-[#7b7b7b] text-white rounded-lg hover:bg-[#303030]"
                    onClick={moveToAnnualLeave}
                    >
                    연차
                    </button>
                    {(employeeNo === empNo || employeeNo === 1) && (
                    <button 
                        className="w-[40%] py-2 bg-[#7b7b7b] text-white rounded-lg hover:bg-[#303030]"
                        onClick={() => moveToModify(empNo)}
                    >
                        수정
                    </button>
                    )}
                    <button 
                    className="w-[40%] py-2 bg-[#7b7b7b] text-white rounded-lg hover:bg-[#303030]"
                    onClick={() => moveToList({ page })}
                    >
                    리스트
                    </button>
                </div>
                </div>


        </div>
        </>
    );
};

export default EmployeesReadComponent;
