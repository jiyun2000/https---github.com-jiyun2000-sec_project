import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/employeesApi";
import { setALOne } from "../../api/annualLeaveApi";
import { getList } from "../../api/jobApi";
import { getDeptList } from "../../api/deptInfoApi";

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

    const {moveToList} = useCustomMove();

    useEffect(()=>{
        getList().then(res => {
            setJob(res);
        });
        getDeptList().then(res => {
            setDeptInfo(res);
        });
    },[employees]);

    const handleClickAdd = () => {
        addOne(employees).then((data)=>{
            setALOne(data).then(()=>moveToList());
        });
    }
    

    const handleChangeEmployees = (evt) => {
        employees[evt.target.name] = evt.target.value;
        setEmployees({...employees});
    }

    return (
        <div className="flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl font-semibold mb-6">직원 등록</h1>
        <div className="bg-white p-4 rounded-xl shadow-md w-3/4 mb-2">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">성</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="firstName"
                    type={'text'} 
                    value={employees.firstName}
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">이름</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="lastName"
                    type={'text'} 
                    value={employees.lastName}
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">메일 주소</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="mailAddress"
                    type={'text'} 
                    value={employees.mailAddress}
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">연봉</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="salary"
                    type={'number'} 
                    value={employees.salary} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">부서 번호</div>

                    <select className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="deptNo"
                    type={'number'} 
                    value={employees.deptNo} 
                    onChange={handleChangeEmployees}>
                        <option value={0}></option>
                        {deptInfo.map((data)=>{
                            return(
                                <option value={data.deptNo}>{data.deptName}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">직책 번호</div>
                    <select className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="jobNo"
                    type={'number'} 
                    value={employees.jobNo} 
                    onChange={handleChangeEmployees}>
                        <option value={0}></option>
                        {job.map((data)=>{
                            return(
                                <option value={data.jobNo}>{data.jobTitle}</option>
                            )
                        })}
                    </select>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">생년월일</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="birthday"
                    type={'date'} 
                    value={employees.birthday} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">주소</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="address"
                    type={'text'} 
                    value={employees.address} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">전화번호</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="phoneNum"
                    type={'text'} 
                    value={employees.phoneNum} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">성별</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="gender"
                    type={'text'} 
                    value={employees.gender} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">주민등록번호</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="citizenId"
                    type={'text'} 
                    value={employees.citizenId} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">비밀번호</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="password"
                    type={'password'} 
                    value={employees.password} 
                    onChange={handleChangeEmployees}></input>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={handleClickAdd}>
                    Add
                </button>
            </div>
        </div>
        </div>
    )
}

export default EmployeesAddComponent;