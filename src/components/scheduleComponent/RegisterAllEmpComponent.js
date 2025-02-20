import { Link, useNavigate } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";
import { allReg } from "../../api/scheduleAPi/empScheduleApi";
import { getCookie, removeCookie } from "../../util/cookieUtil";
import { useEffect, useState } from "react";
import mail from '../../assets/icon/mail.png';
import chat from "../../assets/icon/chat.png";
import colorChat from "../../assets/icon/colorChat.png";

const initState = {
    scheduleText:'',
    startDate:'',
    endDate:''
}

const RegisterAllEmpComponent = () => {

    const navigate = useNavigate(BoardTitleComponent);
    const [cookieEmpNo, setCookieEmpNo] = useState(getCookie("member").empNo);
    const [empData, setEmpData] = useState('');
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

    const [newEvent, setNewEvent] = useState({...initState});
    useEffect(()=>{
        console.log(newEvent); //오키
    }, [newEvent])
 
    const handleClickChangeInput = (e) => {
        newEvent[e.target.name] = e.target.value;
        console.log(newEvent[e.target.name])
        setNewEvent({...newEvent});
    }
        
    console.log("nnnnn" + JSON.stringify(newEvent));
    
   
    const handleSaveEvent = () => {
        if (!newEvent.startDate || !newEvent.endDate) {
            alert("시작 날짜와 종료 날짜를 입력해주세요.");
            return;
        }
    
        const startDateObj = new Date(newEvent.startDate);
        const endDateObj = new Date(newEvent.endDate);
    
        if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
            alert("유효하지 않은 날짜 형식입니다.");
            return;
        }
        if (endDateObj <= startDateObj) {
            alert("끝나는 시간이 시작시간보다 이릅니다.");
            return;
        }
    
        const startDateIso = startDateObj.toISOString();
        const endDateIso = endDateObj.toISOString();
    
        allReg({
            scheduleText: newEvent.scheduleText,
            startDate: startDateIso,
            endDate: endDateIso
        });
    
        alert("등록되었습니다.");
        navigate(`/main`); 
    };
    
        

          
    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    const checkRemove = () => {
        removeCookie("alert");
    }


    return (
        <>
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
                    <Link to={`/chat/empList/${cookieEmpNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                    {chatCntCook  ? 
                        <img src={colorChat} alt='colorChat' className='w-full' /> :
                        <img src={chat} alt="Chat" className="w-full" />
                    }
                    </Link>
                </div>
            </div>
            
            <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-6">일정 입력</h2>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">일정 제목</label>
                        <input type="text" className="form-control" name="scheduleText" placeholder="scheduleText" value={newEvent.scheduleText} onChange={handleClickChangeInput}/>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">시작 날짜</label>
                        <input type="datetime-local" className="form-control" name="startDate" placeholder="start" value={newEvent.startDate} onChange={handleClickChangeInput}/>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">종료 날짜</label>
                        <input type="datetime-local" className="form-control" name="endDate" placeholder="end" value={newEvent.endDate} onChange={handleClickChangeInput}/>
                    </div>

                    <button
                        type="button"
                        onClick={handleSaveEvent}
                        className="w-full bg-[#8ba7cd]  hover:bg-[#6f8cb4] text-white py-2 rounded-md "
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}
export default RegisterAllEmpComponent;