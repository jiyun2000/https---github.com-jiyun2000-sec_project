import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { delOne, getOne, putOne } from "../../api/dayOffApi";
import { useNavigate } from "react-router-dom";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie } from "../../util/cookieUtil";

const initState = {
    dayOffNo : 0 ,
    dayOffDate : '',
    offHours : 0,
    empNo : 0
}

const DayOffModifyComponent = ({dayOffNo}) => {
    const [dayOff, setDayOff] = useState({...initState});

    const {moveToList, moveToRead} = useCustomMove();

    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const navigate = useNavigate();
    useEffect(()=>{
        getOne(dayOffNo).then(data=>setDayOff(data));
    },[dayOffNo]);

    const handleClickDelete = () => {
        dayOff['offHours'] = 0;
        setDayOff({...dayOff});
        putOne(dayOffNo,dayOff).then(()=>{
            delOne(dayOffNo).then(()=>{
                alert("삭제되었습니다.");
                moveToList();});
        });
    }

    const handleClickModify = () => {
        putOne(dayOffNo,dayOff).then(()=>{
            alert("수정정되었습니다.");
            moveToRead(dayOffNo)});
    }

    const handleChangeDayOff = (evt) => {
        
        dayOff[evt.target.name] = evt.target.value;
        setDayOff({...dayOff});
    }

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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                    <img src={chat} alt="Chat" className="w-full" />
                </Link>
            </div>
        </div>   


        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="w-1/5 p-6 text-right font-bold">DayOffNo</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{dayOff.dayOffNo}</div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DayOffDate</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="dayOffDate"
                    type={'date'} 
                    value={dayOff.dayOffDate}
                    onChange={handleChangeDayOff}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">OffHours</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="offHours"
                    type={'number'} 
                    value={dayOff.offHours} 
                    onChange={handleChangeDayOff}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">EmpNo</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="empNo"
                    type={'number'} 
                    value={dayOff.empNo} 
                    onChange={handleChangeDayOff}></input>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-[#8ba7cd]  hover:bg-[#6f8cb4]"
                onClick={handleClickModify}>
                    Modify
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-[#8ba7cd]  hover:bg-[#6f8cb4]"
                onClick={handleClickDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
    )
}

export default DayOffModifyComponent;