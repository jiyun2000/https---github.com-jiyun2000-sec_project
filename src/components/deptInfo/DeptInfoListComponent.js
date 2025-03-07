import React, { useEffect, useState } from 'react';
import { getDeptList } from '../../api/deptInfoApi';
import useCustomMove from '../../hooks/useCustomMove';
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import { getOneEmp } from '../../api/employeesApi';
import colorChat from "../../assets/icon/colorChat.png";

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
    const [cookDeptNo, setCookDeptNo] = useState(getCookie("member").deptNo);

    const { moveToRead, moveToAdd } = useCustomMove();
    const navigate = useNavigate();
    const [empData, setEmpData] = useState('');
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

    useEffect(() => {
        getDeptList().then(res => {
        //console.log(res); //서버에서 받아오는지 확인 ok
        setDeptInfo(res);
      });
    }, [cnt]);

    useEffect(()=>{
        getOneEmp(empNo).then((data) => {
            console.log(data);
            setEmpData(data);
        }).catch((error)=>{
            console.log(error);
        })
    }, []);

    const handleClickAdd = () =>{
        if(empData.jobNo === 1){
            moveToAdd();
        }else{
            alert("권한이 없습니다.");
            return;
        }
        
    }
    const goToBoardList = () => {
        navigate(`/board/list`)
      }


    const checkRemove = () => {
        removeCookie("alert");
    }

    
    return (<>
    <div>
        <div className="flex justify-between items-center w-full bg-white shadow-lg  rounded-md mb-8 px-6 py-4">
            <div className="flex items-center space-x-8">
                <div className="text-2xl font-semibold text-blue-800 select-none cursor-pointer" onClick={goToBoardList}>
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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                {chatCntCook ? 
                    <img src={colorChat} alt='colorChat' className='w-full' /> :
                    <img src={chat} alt="Chat" className="w-full" />
                }
                </Link>
            </div>
        </div>

        <div className="container mx-auto p-6">
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">부서 안내</h1>

            <div className="flex flex-col items-center gap-6 mt-8">
                {deptInfo.length===1?<div
                    className='flex w-80 p-2 m-6 text-2xl rounded items-center justify-center font-light' 
                >
                    부서를 추가해주세요.
                </div>:<></>}
                {deptInfo.map((res) => {
                    return res.deptNo===1?<></>:(
                        <div
                            key={res.deptNo}
                            className="flex flex-col p-6 bg-white rounded-lg shadow-lg hover:shadow-xl cursor-pointer w-[350px] mx-auto"
                            onClick={() => moveToRead(res.deptNo)}>
                            <div className="text-xl font-semibold text-blue-700">
                                부서명: {res.deptName}
                            </div>
                            <div className="text-gray-600 mt-2">
                                부서 주소: {res.deptAddress}
                            </div>
                            <div className="text-gray-600 mt-2">
                                대표 번호: {res.phoneNo}
                            </div>
                        </div>
                            )
                })}
            </div>

            {cookDeptNo===1?<div className="flex justify-center p-6">
                <button type="button"
                    className="inline-block px-6 py-3 text-xl font-medium bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md "
                    onClick={handleClickAdd}>
                    추가
                </button>
        </div>:<></>}
    </div>
    </div>
    </>
    )
}

export default DeptInfoListComponent;