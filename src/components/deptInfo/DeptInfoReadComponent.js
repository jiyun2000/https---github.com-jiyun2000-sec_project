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
    <h1 className='text-center mt-10 font-bold text-3xl'>{deptInfo.deptName} 부서 안내 </h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">부서 번호</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-300">{deptInfo.deptNo}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">부서 이름</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-300">{deptInfo.deptName}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">부서 주소</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-300">{deptInfo.deptAddress}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">대표 번호</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-300">{deptInfo.phoneNo}</div>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={()=>moveToModify(deptNo)}>
                    수정
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={moveToList}>
                    리스트
                </button>
            </div>
        </div>

        <h1 className='text-center mt-10 font-bold text-2xl'>{deptInfo.deptName} 부서 소속 직원 목록</h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
            <div className='flex flex-wrap mx-auto p-6'>
                {employees.dtoList.map((res)=>{
                    return(
                    <div 
                    key = {res.empNo} 
                    className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                    >
                        <div className="w-1/5 p-6 font-bold">사원 번호</div>
                        <div className="w-4/5 p-6 rounded-md border border-blue-300">{res.empNo}</div>

                        <div className="w-1/5 p-6 font-bold">이름</div>
                        <div className="w-4/5 p-6 rounded-md border border-blue-300">{res.firstName} {res.lastName}</div>
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