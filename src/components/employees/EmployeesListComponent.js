import React, { useEffect, useState } from 'react';
import { getList } from '../../api/employeesApi';
import useCustomMove from '../../hooks/useCustomMove';
import PageComponent from '../common/PageComponent';

const initState = {
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

const EmployeesListComponent = () => {

    const [employees,setEmployees] = useState(initState);

    const { page, size, moveToRead, moveToAdd, moveToList } = useCustomMove();

    useEffect(() => {
            getList([page,size]).then(data => {
                setEmployees(data);
            });
    }, [page,size]);

    const handleClickAdd = () =>{
        moveToAdd();
    }
    
    return (<>
    <div className="flex flex-col items-center py-10 px-4">
    <h1 className='text-3xl font-semibold mb-6 border-b border-b-slate-600'>직원 목록</h1>
    <div className="flex flex-col items-center">
        <div className='flex flex-col w-[80%] items-center justify-center '>
            {employees.dtoList.map((data)=>{
                return(
                <div 
                key = {data.empNo} 
                className="bg-slate-50 p-4 rounded-xl shadow-md w-[60%] mb-2 text-center" 
                onClick = {() => moveToRead(data.empNo)}
                >
                    사원 번호 : {data.empNo} <br/> 
                    이름 : {data.firstName} {data.lastName} <br/> 
                    입사일 : {data.hireDate}  <br/> 
                    메일주소 : {data.mailAddress}  <br/> 
                    성별 : {employees.gender === 'm'?'남성':'여성'}  <br/> 
                    전화번호 : {data.phoneNum}
                </div>)
            })}
        </div>

        <PageComponent
            serverData={employees} 
            movePage={moveToList}
            />
        </div>

        <div className="flex justify-center p-4">
        <button type="button"
        className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
        onClick={handleClickAdd}>
            추가
        </button>
        </div>
        </div>
        </>
    )
}

export default EmployeesListComponent;