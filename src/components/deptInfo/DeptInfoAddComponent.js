import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/deptInfoApi";
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

const DeptInfoAddComponent = () => {
    const [deptInfo, setDeptInfo] = useState({...initState});
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const {moveToList} = useCustomMove();

    const handleClickAdd = () => {
        addOne(deptInfo).then(()=>moveToList());
    }

    const handleChangeDeptInfo = (evt) => {
        deptInfo[evt.target.name] = evt.target.value;
        setDeptInfo({...deptInfo});
    }

    return (
        <div>
            <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
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

        <div className=" m-2 p-4">
            <div>
                <h2 className="text-3xl font-semibold text-center m-4">부서 등록</h2>
            </div>
        <div className="flex justify-center w-full m-5 text-2xl">
            <div className=" mb-4 flex w-full flex-row justify-center">
                <div className="p-6 font-bold">부서번호</div>
                <input className="p-6 rounded-md border border-slate-500" 
                    name="deptNo"
                    type={'number'} 
                    value={deptInfo.deptInfoNo}
                    onChange={handleChangeDeptInfo}
                    ></input>
                </div>
            </div>

            <div className="flex justify-center w-full m-5 text-2xl">
                <div className=" mb-4 flex w-full flex-row justify-center">
                    <div className="p-6 font-bold">부서명</div>
                    <input className="p-6 rounded-md border border-slate-500" 
                    name="deptName"
                    type={'text'} 
                    value={deptInfo.deptName} 
                    onChange={handleChangeDeptInfo}
                    ></input>
                </div>
            </div>

            <div className="flex justify-center w-full m-5 text-2xl">
                <div className=" mb-4 flex w-full flex-row justify-center">
                    <div className="p-6 text-left font-bold">부서 주소</div>
                    <input className="p-6 rounded-md border border-slate-500" 
                    name="deptAddress"
                    type={'text'} 
                    value={deptInfo.deptAddress} 
                    onChange={handleChangeDeptInfo}></input>
                </div>
            </div>

            <div className="flex justify-center w-full m-5 text-2xl">
                <div className=" mb-4 flex w-full flex-row justify-center">
                    <div className="p-6 font-bold">대표 번호</div>
                    <input className="p-6 rounded-md border border-slate-500" 
                    name="phoneNo"
                    type={'text'} 
                    value={deptInfo.phoneNo} 
                    onChange={handleChangeDeptInfo}
                    ></input>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-[#95bce8] hover:bg-[#8daad8] cursor-pointer"
                onClick={handleClickAdd}>
                    추가
                </button>
            </div>
        </div>
    </div>
    )
}

export default DeptInfoAddComponent;