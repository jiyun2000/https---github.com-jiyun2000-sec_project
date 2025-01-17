import React, { useEffect, useState } from 'react';
import { getDeptList } from '../../api/deptInfoApi';
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
        getDeptList().then(res => {
        //console.log(res); //서버에서 받아오는지 확인 ok
        setDeptInfo(res);
      });
    }, [cnt]);

    const handleClickAdd = () =>{
        moveToAdd();
    }
    
    return (<>
    <h1 className='text-center mt-10 font-bold text-3xl'>부서 안내</h1>
    <div className="text-1xl">
            <div className='flex flex-wrap mx-auto p-6 mt-8 justify-center text-center'>
                {deptInfo.map((res)=>{
                    return(
                    <div 
                    key = {res.deptNo} 
                    className='flex w-1/4 p-6 m-2 border border-blue-300 rounded-md justify-center ' 
                    onClick = {() => moveToRead(res.deptNo)}
                    >
                        부서명 : {res.deptName} <br /> 
                        부서 주소 : {res.deptAddress} <br /> 
                        대표 번호 : {res.phoneNo} <br /> 
                    </div>)
                })}
            </div>
        </div>

        <div className="flex justify-center p-4">
        <button type="button"
        className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
        onClick={handleClickAdd}>
            추가
        </button>
        </div>
        </>
    )
}

export default DeptInfoListComponent;