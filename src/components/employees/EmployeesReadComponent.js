import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import {  getOneEmp } from "../../api/employeesApi";


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

const EmployeesReadComponent = ({empNo})=>{
    const [employees, setEmployees] = useState(initState);
    let cnt = 0;

    const {page, moveToReportReceived, moveToList, moveToModify, moveToCommuteList, moveToAnnualLeave} = useCustomMove();

    useEffect(()=>{
        getOneEmp(empNo).then(res => {
            setEmployees(res);
        });
    },[cnt]);

    return <>
    <div className="flex flex-col items-center py-10 px-4">
    <h1 className="text-3xl font-semibold mb-6">{employees.firstName} {employees.lastName} 님</h1>
        <div className="bg-white p-4 rounded-xl shadow-md w-3/4 mb-2">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">사원 번호</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.empNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">이름</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.firstName} {employees.lastName}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">입사일</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.hireDate}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">메일주소</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.mailAddress}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">연봉</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.salary}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">부서번호</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.deptNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">직책번호</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.jobNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">생년월일</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.birthday}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">주소</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.address}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">전화번호</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.phoneNum}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">성별</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.gender === 'm'?'남성':'여성'}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">주민등록번호</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-200">{employees.citizenId}</div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={()=>moveToReportReceived(empNo)}>
                    리포트
                </button>

                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={()=>moveToCommuteList({empNo})}>
                    출퇴근
                </button>

                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={()=>moveToAnnualLeave({empNo})}>
                    연차
                </button>

                <button type="button" 
               className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={()=>moveToModify(empNo)}>
                    수정
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={()=>moveToList({page})}>
                    리스트
                </button>
            </div>
        </div>
        </div>
    </>
}

export default EmployeesReadComponent;