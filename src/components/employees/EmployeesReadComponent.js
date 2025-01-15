import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getBookList, getOne } from "../../api/employeesApi";
import { useParams } from "react-router-dom";

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

    const {page,moveToList, moveToModify, moveToCommute, moveToAnnualLeave} = useCustomMove();

    useEffect(()=>{
        getOne(empNo).then(res => {
            setEmployees(res);
        });
    },[cnt]);

    return <>
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Emp No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.empNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">First Name</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.firstName}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Last Name</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.lastName}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Hire Date</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.hireDate}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Mail</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.mailAddress}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Salary</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.salary}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Dept No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.deptNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Job No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.jobNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Birthday</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.birthday}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Address</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.address}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Phone Number</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.phoneNum}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Gender</div>
                    {employees.gender === 'm'?<div className="w-4/5 p-6 rounded-r border border-solid shadow-md">Male</div>:<div className="w-4/5 p-6 rounded-r border border-solid shadow-md">Female</div>}
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">CitizenId</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{employees.citizenId}</div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-black"
                onClick={()=>moveToCommute(empNo)}>
                    Commute
                </button>

                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-40 text-white bg-black"
                onClick={()=>moveToAnnualLeave(empNo)}>
                    Annual Leave
                </button>

                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={()=>moveToModify(empNo)}>
                    Modify
                </button>

                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={()=>moveToList({page})}>
                    List
                </button>
            </div>
        </div>
    </>
}

export default EmployeesReadComponent;