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
    <h1 className='text-center mt-10 font-bold text-3xl'>전체 직원 목록</h1>
    <div>
        <div className='flex flex-wrap mx-auto p-6 items-center justify-center'> 
            {employees.dtoList.map((data)=>{
                return(
                <div 
                key = {data.empNo} 
                className='flex w-2/5 p-2 m-2 rounded-md border border-blue-300' 
                onClick = {() => moveToRead(data.empNo)}
                >
                    사원번호 : {data.empNo} <br/>
                    이름 : {data.firstName}{data.lastName} <br/>
                    입사일 : {data.hireDate} <br/>
                    메일주소 : {data.mailAddress} <br/>
                    성별 : {data.gender} <br/>
                    전화번호 : {data.phoneNum}
                </div>)
            })}
        </div>

        <PageComponent
            serverData={employees} 
            movePage={moveToList}
            />
        </div>

        <div className="flex justify-end p-4">
        <button type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        onClick={handleClickAdd}>
            add
        </button>
        </div>
        </>
    )
}

export default EmployeesListComponent;