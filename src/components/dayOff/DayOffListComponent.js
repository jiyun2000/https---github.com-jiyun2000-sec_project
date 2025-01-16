import React, { useEffect, useState } from 'react';
import { getList } from '../../api/dayOffApi';
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

const DayOffListComponent = () => {

    const [dayOff,setDayOff] = useState(initState);

    const { page, size, moveToRead, moveToAdd, moveToList } = useCustomMove();

    useEffect(() => {
            getList([page,size]).then(data => {
                setDayOff(data);
            });
    }, [page,size]);

    const handleClickAdd = () =>{
        moveToAdd();
    }
    
    return (<>
    <div className="text-3xl">
        <div className='flex flex-wrap mx-auto p-6'>
            {dayOff.dtoList.map((data)=>{
                return(
                <div 
                key = {data.dayOffNo} 
                className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                onClick = {() => moveToRead(data.dayOffNo)}
                >
                    {data.dayOffNo} / {data.offHours} / {data.dayOffDate} / {data.empNo}
                </div>)
            })}
        </div>

        <PageComponent
            serverData={dayOff} 
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

export default DayOffListComponent;