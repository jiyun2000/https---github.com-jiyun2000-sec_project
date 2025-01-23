import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getOneCommute, putOne } from "../../api/commuteApi";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link, useNavigate } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie } from "../../util/cookieUtil";
import { getOneEmp } from "../../api/employeesApi";

const initState = {
    commNo : 0 ,
    checkDate : '',
    checkInTime : '',
    checkOutTime : '',
    empNo : 0
}

const CommuteModifyComponent = ({commNo}) => {
    const [commute, setCommute] = useState({...initState});
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const {moveToCommuteList} = useCustomMove();
    const [getEmpData, SetGetEmpData] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        getOneCommute(commNo).then(data=>{
            setCommute(data);
        });
    },[commNo]);

    const handleClickModify = () => {
        putOne(commute.empNo,commute).then(()=>{
            moveToCommuteList(commute);
        }
        );
    }

    const handleChangeCommute = (evt) => {
        
        commute[evt.target.name] = evt.target.value;
        setCommute({...commute});
    }

    useEffect(()=>{
        getOneEmp(empNo).then((data) => {
            SetGetEmpData(data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    return (
        <div>
            <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
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
                <Link to={`/chat/empList/${commute.empNo}?page=1`} className="w-12 cursor-pointer">
                    <img src={chat} alt="Chat" className="w-full" />
                </Link>
            </div>
        </div>


        <div className=" mt-10 m-2 p-4">
            <div>
                <h2 className="text-center text-3xl font-semibold text-[#414141]">
                    {getEmpData.firstName}{getEmpData.lastName}님 {commute.checkDate} 출퇴근 기록 수정
                </h2>
            </div>

            <div className="flex mt-10 mb-4 w-full flex-row justify-center items-center">
                <div className="w-[10%] p-6 font-bold">사원번호</div>
                <div className="w-[20%] p-6 rounded-md border border-slate-400 text-center">{commute.empNo}</div>
            </div>

            <div className="flex mt-10 mb-4 w-full flex-row justify-center items-center">
                    <div className="w-[10%] p-6 font-bold">날짜</div>
                    <input className="w-[20%] p-6 rounded-md border border-slate-400 text-center" 
                    name="checkDate"
                    type={'date'} 
                    value={commute.checkDate}
                    onChange={handleChangeCommute}></input>
            </div>

                <div className="flex mt-10 mb-4 w-full flex-row justify-center items-center">
                    <div className="w-[10%] p-6 font-bold">출근</div>
                    <input className="w-[20%] p-6 rounded-md border border-slate-400 text-center" 
                    name="checkInTime"
                    type={'time'} 
                    value={commute.checkInTime}
                    onChange={handleChangeCommute}></input>
            </div>

                <div className="flex mt-10 mb-4 w-full flex-row justify-center items-center">
                    <div className="w-[10%] p-6 font-bold">통근</div>
                    <input className="w-[20%] p-6 rounded-md border border-slate-400 text-center" 
                    name="checkOutTime"
                    type={'time'} 
                    value={commute.checkOutTime}
                    onChange={handleChangeCommute}></input>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                className="inline-block  p-4 m-2 text-xl w-32 bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] rounded-md"
                onClick={handleClickModify}>
                    수정
                </button>
            </div>
        </div>
    </div>
    )
}

export default CommuteModifyComponent;