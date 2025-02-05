import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import {  getOneEmp } from "../../api/employeesApi";
import { Link, useNavigate } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import { getCookie, removeCookie } from "../../util/cookieUtil";
import {deptOne} from "../../api/deptInfoApi";

import { getJob, jobOne } from "../../api/jobApi";

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

    const [phoneNumber,setPhoneNumber] = useState('');
    const [citizenNumber,setCitizenNumber] = useState('');
   
    useEffect(()=>{
        setCitizenNumber(employees.citizenId.substring(0,6)+'-'+employees.citizenId.substring(6,employees.citizenId.length));
        setPhoneNumber(employees.phoneNum.substring(0,3)+'-'+employees.phoneNum.substring(3,7)+'-'+employees.phoneNum.substring(7,employees.phoneNum.length));
    },[employees]);


    useEffect(() => {
        getOneEmp(empNo).then(res => {
            setEmployees(res);
        });
    }, [empNo]);

    useEffect(()=>{
        deptOne(cookieDeptNo).then((data) => {
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


            <div className="flex flex-col items-center py-10 px-4 bg-[#edf3f5] w-full h-full">
                <div className="bg-white p-6 rounded-xl shadow-xl w-3/4  border-2 border-[#c6e4ec]">
                    <h1 className="text-3xl font-semibold m-6 text-center text-[#3d3d3d]">{employees.firstName} {employees.lastName} 님</h1>
                    <div className="space-y-6 text-2xl ">
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">사원 번호 : {employees.empNo}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">이름 : {employees.firstName} {employees.lastName}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">입사일 : {employees.hireDate}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">메일주소 : {employees.mailAddress}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">연봉 : {employees.salary}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">부서번호 : {employees.deptNo} ({deptData.deptName})</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">직책번호 : {employees.jobNo}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">생년월일 : {employees.birthday}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">주소 : {employees.address}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2" >전화번호 : {phoneNumber}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">성별 : {employees.gender === 'm' ? '남성' : '여성'} </div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">주민등록번호 : {citizenNumber}</div>
                    </div>

                    <div className="flex justify-center mt-6 space-x-4">
                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                            onClick={() => goToReport(empNo)}>
                            리포트
                        </button>

                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                            onClick={moveToCommuteList}>
                            출퇴근
                        </button>

                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                            onClick={moveToAnnualLeave}>
                            연차
                        </button>

                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                            onClick={() => moveToModify(empNo)}>
                            수정
                        </button>
                        

                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                            onClick={() => moveToList({ page })}>
                            리스트

                        </button>
                    )}
                    <button 
                        className="w-[35%] py-2 bg-[#7b7b7b] text-white rounded-lg hover:bg-[#303030]"
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
