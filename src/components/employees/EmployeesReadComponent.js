import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import {  getOneEmp } from "../../api/employeesApi";
import { getOne } from "../../api/employeesApi";
import { Link } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import { getCookie } from "../../util/cookieUtil";
import {deptOne} from "../../api/deptInfoApi";
import { jobOne } from "../../api/jobApi";


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
   

    useEffect(() => {
        getOne(empNo).then(res => {
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


    return (
        <>
        <div>
            <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
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
                        <div className="m-3 border-b-2 border-[#ebecee] p-2" >전화번호 : {employees.phoneNum}</div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">성별 : {employees.gender === 'm' ? '남성' : '여성'} </div>
                        <div className="m-3 border-b-2 border-[#ebecee] p-2">주빈등록번호 : {employees.citizenId}</div>
                    </div>

                    <div className="flex justify-center mt-6 space-x-4">
                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 text-white bg-[#95bce8] hover:bg-[#8daad8] cursor-pointer"
                            onClick={() => moveToReportReceived(empNo)}>
                            리포트
                        </button>

                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 text-white bg-[#95bce8] hover:bg-[#8daad8] cursor-pointer"
                            onClick={() => moveToCommuteList({ empNo })}>
                            출퇴근
                        </button>

                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 text-white bg-[#95bce8] hover:bg-[#8daad8] cursor-pointer"
                            onClick={() => moveToAnnualLeave({ empNo })}>
                            연차
                        </button>

                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 text-white bg-[#95bce8] hover:bg-[#8daad8] cursor-pointer"
                            onClick={() => moveToModify(empNo)}>
                            수정
                        </button>

                        <button type="button"
                            className="inline-block rounded p-4 text-xl w-32 text-white bg-[#95bce8] hover:bg-[#8daad8] cursor-pointer"
                            onClick={() => moveToList({ page })}>
                            리스트
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default EmployeesReadComponent;
