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
    <div className="text-2xl">
        <div className='flex flex-wrap mx-auto p-6'>
            {employees.dtoList.map((data)=>{
                return(
                <div 
                key = {data.empNo} 
                className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                onClick = {() => moveToRead(data.empNo)}
                >
                    {data.empNo} / {data.firstName} {data.lastName} / {data.hireDate} / {data.mailAddress} / {data.gender} / {data.phoneNum}
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