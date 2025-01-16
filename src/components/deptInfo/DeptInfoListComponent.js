import React, { useEffect, useState } from 'react';
import { getList } from '../../api/deptInfoApi';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    deptNo : 0,
    deptName : '',
    deptAddress : '',
    phoneNo : ''
}

const DeptInfoListComponent = () => {

    const [deptInfo,setDeptInfo] = useState([initState]);
    let cnt = 0;

    const { moveToRead, moveToAdd } = useCustomMove();

    useEffect(() => {
      getList().then(res => {
        //console.log(res); //서버에서 받아오는지 확인 ok
        setDeptInfo(res);
      });
    }, [cnt]);

    const handleClickAdd = () =>{
        moveToAdd();
    }
    
    return (<>
    <div className="text-3xl">
            <div className='flex flex-wrap mx-auto p-6'>
                {deptInfo.map((res)=>{
                    return(
                    <div 
                    key = {res.deptNo} 
                    className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                    onClick = {() => moveToRead(res.deptNo)}
                    >
                        {res.deptNo} / {res.deptName} / {res.deptAddress} / {res.phoneNo}
                    </div>)
                })}
            </div>
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

export default DeptInfoListComponent;