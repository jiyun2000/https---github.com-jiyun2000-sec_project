import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/deptInfoApi";
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';

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

    const handleClickAdd = () => {
        addOne(deptInfo).then(()=>{
            alert("등록되었습니다.");
            moveToList();
        }
    )}

    const handleChangeDeptInfo = (evt) => {
        deptInfo[evt.target.name] = evt.target.value;
        setDeptInfo({...deptInfo});
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                    <img src={chat} alt="Chat" className="w-full" />
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
                className="text-white py-2 px-6 text-lg  bg-[#aacbd5] rounded-md hover:bg-[#9bb5bd] cursor-pointer"
                onClick={handleClickAdd}>
                    추가
                </button>
            </div>
        </div>
    </div>
    )
}

export default DeptInfoAddComponent;