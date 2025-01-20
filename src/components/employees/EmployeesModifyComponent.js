import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { delOne, getOneEmp, putOne } from "../../api/employeesApi";
import { getJobList } from "../../api/jobApi";
import { getDeptList } from "../../api/deptInfoApi";
import { delOne, getOne, putOne } from "../../api/employeesApi";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';


const initState = {
    empNo : 0 ,
    firstName : '',
    lastName : '',
    hireDate : '',
    mailAddress : '',
    salary : 0,
    deptNo : 0,
    jobNo : 0,
    birthday : '',
    address : '',
    phoneNum : '',
    gender : '',
    citizenId : ''
}

const initStateJob = {
    jobNo : 0,
    jobTitle : ''
}

const initStateDeptinfo = {
    deptNo : 0,
    deptName : '',
    deptAddress : '',
    phoneNo : ''
}


const EmployeesModifyComponent = ({empNo}) => {
    const [employees, setEmployees] = useState({...initState});

    const [job,setJob] = useState([initStateJob]);
    
    const [deptInfo,setDeptInfo] = useState([initStateDeptinfo]);

    const {moveToList, moveToRead} = useCustomMove();

    useEffect(()=>{
        getOneEmp(empNo).then(data=>setEmployees(data));
    },[empNo]);

    useEffect(()=>{
        getJobList().then(res => {
            setJob(res);
        });
        getDeptList().then(res => {
            setDeptInfo(res);
        });
    },[employees]);

    const handleClickDelete = () => {

        delOne(empNo).then(()=>moveToList());
    }

    const handleClickModify = () => {
        putOne(empNo,employees).then(()=>moveToRead(empNo));
    }

    const handleChangeEmployees = (evt) => {
        
        employees[evt.target.name] = evt.target.value;
        setEmployees({...employees});
    }

    return (
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


        <div className="flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-semibold mb-6">{employees.firstName} {employees.lastName} 님 사원정보 수정</h1>
        <div className="bg-white p-4 rounded-xl shadow-md w-3/4 mb-2">
            <div className="flex justify-center mt-10 mb-4">
                <div className="w-1/5 p-6 text-right font-bold">사원번호</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.empNo}</div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">성</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="firstName"
                    type={'text'} 
                    value={employees.firstName}
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">이름</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="lastName"
                    type={'text'} 
                    value={employees.lastName}
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">메일주소</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="mailAddress"
                    type={'text'} 
                    value={employees.mailAddress}
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">연봉</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="salary"
                    type={'number'} 
                    value={employees.salary} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">부서 번호</div>
                    {/* <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="deptNo"
                    type={'number'} 
                    value={employees.deptNo} 
                    onChange={handleChangeEmployees}></input> */}
                    <select name="deptNo" value={employees.deptNo} onClick={handleChangeEmployees}>
                        <option value={100}>100(GA)</option>
                        <option value={200}>200(HR)</option>
                        <option value={300}>300(ACC)</option>

                    </select>
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">직책 번호</div>
                    
                    <select name="jobNo" value={employees.jobNo} onChange={handleChangeEmployees}>
                    <option value={100}>100(디렉터)</option>
                        <option value={200}>200(매니저)</option>
                        <option value={300}>300(시니어)</option>
                        <option value={400}>400(사원)</option>
                        <option value={500}>500(인턴)</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">생년월일</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="birthday"
                    type={'date'} 
                    value={employees.birthday} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">주소</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="address"
                    type={'text'} 
                    value={employees.address} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">전화번호</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="phoneNum"
                    type={'text'} 
                    value={employees.phoneNum} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">성별</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="gender"
                    type={'text'} 
                    value={employees.gender} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">주민등록번호</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="citizenId"
                    type={'text'} 
                    value={employees.citizenId} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={handleClickModify}>
                    수정
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={handleClickDelete}
                >
                    삭제
                </button>
            </div>
        </div>
        </div>
        </div>
    )
}

export default EmployeesModifyComponent;