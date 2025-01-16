import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getEmpList, getOne } from "../../api/deptInfoApi";
import DeptInfoPageComponent from "../common/DeptInfoPageComponent";
import { useParams } from "react-router-dom";

const initState = {
    deptNo : 0,
    deptName : '',
    deptAddress : '',
    phoneNo : ''
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

const DeptInfoReadComponent = ({deptNo})=>{
    const [deptInfo, setDeptInfo] = useState(initState);
    const [employees, setEmployees] = useState(initStateEmp);

    const {page, size, moveToDeptInfoList, moveToList, moveToModify} = useCustomMove();

    useEffect(()=>{
        getOne(deptNo).then(res => {
            setDeptInfo(res);
        });
    },[page]);

    useEffect(() => {
        getEmpList(deptNo,[page,size]).then(res => {
            setEmployees(res);
        })
    },[page]);

    return <>
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Dept No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{deptInfo.deptNo}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Dept Name</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{deptInfo.deptName}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Dept Address</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{deptInfo.deptAddress}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Dept PhoneNo</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{deptInfo.phoneNo}</div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={()=>moveToModify(deptNo)}>
                    Modify
                </button>

                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={moveToList}>
                    List
                </button>
            </div>
        </div>

        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className='flex flex-wrap mx-auto p-6'>
                {employees.dtoList.map((res)=>{
                    return(
                    <div 
                    key = {res.empNo} 
                    className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                    >
                        <div className="w-1/5 p-6 text-right font-bold">EmpNo</div>
                        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{res.empNo}</div>

                        <div className="w-1/5 p-6 text-right font-bold">Name</div>
                        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{res.firstName} {res.lastName}</div>
                    </div>)
                })}
            </div>

            <div>
                <DeptInfoPageComponent
                serverData={employees} 
                deptInfo={deptInfo}
                movePage={moveToDeptInfoList}
                 />
            </div>
        </div>
    </>
}

export default DeptInfoReadComponent;