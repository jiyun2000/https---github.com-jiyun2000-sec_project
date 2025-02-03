import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/dayOffApi";
import { getCookie } from "../../util/cookieUtil";
import { useNavigate } from "react-router-dom";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import { getOneEmp } from "../../api/employeesApi";


const initState = {
    dayOffNo : 0 ,
    dayOffDate : '',
    offHours : 0,
    empNo : 0
}

const DayOffAddComponent = () => {
    const [dayOff, setDayOff] = useState({...initState});

    const navigate = useNavigate();
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [getEmpData, setGetEmpData] = useState("");

    const handleClickAdd = () => {
        dayOff["empNo"] = getCookie("member").empNo;
        addOne(dayOff).then(()=>{
            navigate({pathname:`../../employees/annualleave`});
        });
    }

    const handleChangeDayOff = (evt) => {
        dayOff[evt.target.name] = evt.target.value;
        setDayOff({...dayOff});
    }

    useEffect(()=>{
        getOneEmp(empNo).then((data)=>{
            console.log(data);
            setGetEmpData(data);
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
                    <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                        <img src={chat} alt="Chat" className="w-full" />
                    </Link>
                </div>
            </div>   


        <div className=" mt-10 m-2 p-4">
            <h2 className="text-center font-semibold text-3xl">{getEmpData.firstName}{getEmpData.lastName}님 휴일 신청</h2>
            <div className="flex justify-center mt-10 flex-col items-center">
                <div className=" mb-4 flex w-full flex-row justify-center">
                    <div className="w-[10%] p-6 font-bold">날짜</div>
                    <input className="w-[15%] p-6 rounded-md border border-slate-400" 
                    name="dayOffDate"
                    type={'date'} 
                    value={dayOff.dayOffDate}
                    onChange={handleChangeDayOff}></input>
                </div>
            </div>

            <div className="flex justify-center mt-10 flex-col items-center">
                <div className=" mb-4 flex w-full flex-row justify-center">
                    <div className="w-[10%] p-6 font-bold">시간</div>
                    <input className="w-[15%] p-6 rounded-md border border-slate-400" 
                    name="offHours"
                    type={'number'} 
                    value={dayOff.offHours} 
                    onChange={handleChangeDayOff}></input>
                </div>
            </div>

            <div className="flex justify-center p-4 m-8">
                <button type="button"
                className=" p-4 m-2 text-xl w-32 text-white bg-[#8ba7cd]  hover:bg-[#6f8cb4] rounded-md"
                onClick={handleClickAdd}>
                    추가
                </button>
            </div>
        </div>
    </div>
    )
}

export default DayOffAddComponent;