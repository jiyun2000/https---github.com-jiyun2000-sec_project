import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/deptInfoApi";
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import { getOneEmp } from "../../api/employeesApi";
import colorChat from "../../assets/icon/colorChat.png";

const initState = {
    deptNo : 0,
    deptName : '',
    deptAddress : '',
    phoneNo : ''
}

const DeptInfoAddComponent = () => {
    const [deptInfo, setDeptInfo] = useState({...initState});
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const {moveToList} = useCustomMove();
    const navigate = useNavigate();
    const [empData, setEmpData] = useState('');
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

    useEffect(()=>{
        getOneEmp(empNo).then((data) => {
            console.log(data);
            setEmpData(data);
        }).catch((error) => {
            console.log(error)
        })
    }, [])


    const handleClickAdd = () => {

        if(empData.jobNo === 1){
            addOne(deptInfo).then(()=>moveToList());
        }else{
            alert("권한이 없습니다.");
            return;
        }
        
    }


    
    const handleChangeDeptInfo = (evt) => {
        deptInfo[evt.target.name] = evt.target.value;
        setDeptInfo({...deptInfo});
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    const checkRemove = () => {
        removeCookie("alert");
    }
    

    return (
        <div>
            <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
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

        <div >
            <div>
                <h2 className="text-center mt-10 font-bold text-3xl">부서 등록</h2>
            </div>
        <div className="flex justify-center mt-10 m-2">
            <div className="mb-4 flex w-full flex-row items-center justify-center">
                <div className="w-[10%] p-6 font-bold">부서번호</div>
                <input className="w-[30%] p-6 rounded-md border border-slate-400 text-center" 
                    name="deptNo"
                    type={'number'} 
                    value={deptInfo.deptInfoNo}
                    onChange={handleChangeDeptInfo}
                    ></input>
                </div>
            </div>

            <div className="flex justify-center m-2">
                <div className=" mb-4 flex w-full flex-row items-center justify-center">
                    <div className="w-[10%] p-6 font-bold">부서명</div>
                    <input className="w-[30%] p-6 rounded-md border border-slate-400 text-center" 
                    name="deptName"
                    type={'text'} 
                    value={deptInfo.deptName} 
                    onChange={handleChangeDeptInfo}
                    ></input>
                </div>
            </div>

            <div className="flex justify-center m-2">
                <div className=" mb-4 flex w-full flex-row items-center justify-center">
                    <div className="w-[10%] p-6 font-bold">부서 주소</div>
                    <input className="w-[30%] p-6 rounded-md border border-slate-400 text-center" 
                    name="deptAddress"
                    type={'text'} 
                    value={deptInfo.deptAddress} 
                    onChange={handleChangeDeptInfo}></input>
                </div>
            </div>

            <div className="flex justify-center m-2">
                <div className="mb-4 flex w-full flex-row items-center justify-center">
                    <div className="w-[10%] p-6 font-bold">대표 번호</div>
                    <input className="w-[30%] p-6 rounded-md border border-slate-400 text-center" 
                    name="phoneNo"
                    type={'text'} 
                    value={deptInfo.phoneNo} 
                    onChange={handleChangeDeptInfo}
                    ></input>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                className="py-2 px-6 text-lg  bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md cursor-pointer"
                onClick={handleClickAdd}>
                    추가
                </button>
            </div>
        </div>
    </div>
    )
}

export default DeptInfoAddComponent;