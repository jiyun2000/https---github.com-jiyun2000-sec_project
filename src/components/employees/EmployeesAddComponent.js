import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/employeesApi";
import { setALOne } from "../../api/annualLeaveApi";
import { getJobList } from "../../api/jobApi";
import { getDeptList } from "../../api/deptInfoApi";
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';

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
    gender : 'm',
    citizenId : '',
    password : ''
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

const EmployeesAddComponent = () => {
    const [employees, setEmployees] = useState({...initState});

    const [job,setJob] = useState([initStateJob]);
    
    const [deptInfo,setDeptInfo] = useState([initStateDeptinfo]);

    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const {moveToList} = useCustomMove();
    const navigate = useNavigate();

    useEffect(()=>{
        getJobList().then(res => {
            setJob(res);
        });
        getDeptList().then(res => {
            setDeptInfo(res);
        });
    },[employees]);

    const handleClickAdd = () => {
        addOne(employees).then((data)=>{
            setALOne(data).then(()=>{
                moveToList();
            });
        });
    }
    

    const handleChangeEmployees = (evt) => {
        employees[evt.target.name] = evt.target.value;
        setEmployees({...employees});
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    return (
        <div>
            <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
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


        <div className="flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-semibold mb-6">직원 등록</h1>
        <div className="bg-white p-4 mb-2 w-full">
                <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">성</div>
                    <input className="w-[25%] p-6 rounded-md border border-slate-400 text-center" 
                    name="firstName"
                    type={'text'} 
                    value={employees.firstName}
                    onChange={handleChangeEmployees}></input>

            </div>

            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">이름</div>
                    <input className="w-[25%] p-6 rounded-md border border-slate-400 text-center" 
                    name="lastName"
                    type={'text'} 
                    value={employees.lastName}
                    onChange={handleChangeEmployees}></input>
            </div>

            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">메일 주소</div>
                    <input className="w-[25%] p-6 rounded-md border border-slate-400 text-center" 
                    name="mailAddress"
                    type={'text'} 
                    value={employees.mailAddress}
                    onChange={handleChangeEmployees}></input>
            </div>

            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">연봉</div>
                    <input className="w-[25%] p-6 rounded-md border border-slate-400 text-center" 
                    name="salary"
                    type={'number'} 
                    value={employees.salary} 
                    onChange={handleChangeEmployees}></input>
            </div>

            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">부서</div>
                    <select className="w-[25%] p-6 rounded-md border border-slate-400 text-center" name="deptNo" onClick={handleChangeEmployees}>
                        <option value={0}></option>
                        {deptInfo.map((data)=>{
                            return (<option value={data.deptNo}>{data.deptName}</option>)
                        })}

                    </select>
            </div>
            
            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">직책</div>
                    <select className="w-[25%] p-6 rounded-md border border-slate-400 text-center" name="jobNo" onChange={handleChangeEmployees}>
                    <option value={0}></option>
                    {job.map((data)=>{
                           return (<option value={data.jobNo}>{data.jobTitle}</option>)
                        })}
                    </select>
            </div>

            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">생년월일</div>
                    <input className="w-[25%] p-6 rounded-md border border-slate-400 text-center" 
                    name="birthday"
                    type={'date'} 
                    value={employees.birthday} 
                    onChange={handleChangeEmployees}></input>
            </div>

            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">주소</div>
                    <input className="w-[25%] p-6 rounded-md border border-slate-400 text-center" 
                    name="address"
                    type={'text'} 
                    value={employees.address} 
                    onChange={handleChangeEmployees}></input>
            </div>

            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">전화번호</div>
                    <input className="w-[25%] p-6 rounded-md border border-slate-400 text-center" 
                    name="phoneNum"
                    type={'text'} 
                    value={employees.phoneNum} 
                    onChange={handleChangeEmployees}></input>
            </div>

            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">성별</div>
                    <select name="gender" onChange={handleChangeEmployees} className="w-[25%] p-6 rounded-md border border-slate-400 text-center">
                        <option value={"m"}>남성</option>
                        <option value={"y"}>여성</option>
                    </select>
            </div>

            
            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">주민등록번호</div>
                    <input className="w-[25%] p-6 rounded-md border border-slate-400 text-center" 
                    name="citizenId"
                    type={'text'} 
                    value={employees.citizenId} 
                    onChange={handleChangeEmployees}></input>
            </div>

            <div className="flex flex-row items-center justify-center mt-10 mb-4">
                    <div className="w-[12%] p-6 text-right font-bold">비밀번호</div>
                    <input className="w-[25%] p-6 rounded-md border border-slate-400 text-center" 
                    name="password"
                    type={'password'} 
                    value={employees.password} 
                    onChange={handleChangeEmployees}></input>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32  bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                onClick={handleClickAdd}>
                    등록
                </button>
            </div>
        </div>
        </div>
    </div>
    )
}

export default EmployeesAddComponent;