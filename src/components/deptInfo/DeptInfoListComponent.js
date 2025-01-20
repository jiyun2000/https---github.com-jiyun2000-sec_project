import React, { useEffect, useState } from 'react';
import { getDeptList } from '../../api/deptInfoApi';
import useCustomMove from '../../hooks/useCustomMove';
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';

const initState = {
    deptNo : 0,
    deptName : '',
    deptAddress : '',
    phoneNo : ''
}

const DeptInfoListComponent = () => {

    const [deptInfo,setDeptInfo] = useState([initState]);
    let cnt = 0;
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);

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
    <div>
        <div className="flex justify-between items-center w-full bg-white shadow-lg  rounded-md mb-8 px-6 py-4">
            <div className="flex items-center space-x-8">
                <div className="text-2xl font-semibold text-blue-800 select-none">
                  [공지사항]
                </div>
                <div className="w-64 text-2xl font-semibold cursor-pointer">
                    <BoardTitleComponent />
                </div>
            </div>
            <div className="flex space-x-4">
                <Link to="/mail" className="w-12 cursor-pointer">
                    <img src={mail} alt="Mail" className="w-full" />
                </Link>
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                    <img src={chat} alt="Chat" className="w-full" />
                </Link>
            </div>
        </div>

    <div className='flex justify-center items-center flex-col w-full'>
    <h1 className='text-center m-10 font-bold text-3xl'>부서 안내</h1>
    <div className="text-1xl">
            <div className='flex flex-row mt-8 justify-center text-center'>
                {deptInfo.map((res)=>{
                    return(
                    <div 
                    key = {res.deptNo} 
                    className='flex p-5 m-4 border border-[#aaaaaa] rounded-md justify-center text-2xl' 
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
        className="inline-block  p-4 m-5 text-xl w-32 text-white   bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer"
        onClick={handleClickAdd}>
            추가
        </button>
        </div>
    </div>
    </div>
    </>
    )
}

export default DeptInfoListComponent;