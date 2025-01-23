import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getBookList, getOne } from "../../api/dayOffApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getCookie } from "../../util/cookieUtil";


const initState = {
    dayOffNo : 0 ,
    dayOffDate : '',
    offHours : 0,
    empNo : 0
}

const DayOffReadComponent = ({dayOffNo})=>{
    const [dayOff, setDayOff] = useState(initState);
    let cnt = 0;
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const navigate = useNavigate();

    const {page,moveToList, moveToModify} = useCustomMove();

    useEffect(()=>{
        getOne(dayOffNo).then(res => {
            setDayOff(res);
        });
    },[cnt]);

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    return <>
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
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Day Off No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{dayOff.dayOffNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Date</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{dayOff.dayOffDate}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Off Hours</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{dayOff.offHours}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Emp No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{dayOff.empNo}</div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-[#8ba7cd]  hover:bg-[#6f8cb4]"
                onClick={()=>moveToModify(dayOffNo)}>
                    Modify
                </button>

                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-[#8ba7cd]  hover:bg-[#6f8cb4]"
                onClick={()=>moveToList({page})}>
                    List
                </button>
            </div>
        </div>
    </div>
    </>
}

export default DayOffReadComponent;