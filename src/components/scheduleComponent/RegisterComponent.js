import { useState } from "react";
import { postEmpScheule } from "../../api/scheduleAPi/empScheduleApi";
import { Link, useNavigate } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from '../../assets/icon/mail.png';
import chat from "../../assets/icon/chat.png";

//empSchedule register component.
const RegisterComponent = ({scheduleText,startDate, endDate, empNo}) => {

    const navigate = useNavigate();

    const [newEvent, setNewEvent] = useState({
        scheduleText:scheduleText,
        start:startDate,
        end:endDate
    });
     
    const handleClickChangeInput = (e) => {
        console.log(empNo);
        newEvent[e.target.name] = e.target.value;
        setNewEvent({...newEvent});
    }
        
    const handleSaveEvent = () => {
        console.log("!!!!!" + empNo);
        const empNoSave = {...newEvent, empNo :empNo};
        postEmpScheule(empNoSave, empNo).then((data) => {
            console.log(empNo);
            console.log("ttttttttttt"  +  scheduleText);
            alert("등록되었습니다.");
            navigate(`/main`);
        console.log(data);}).catch((error) => {
            console.log("errrrrrrr" + error);
        });
    };
          
    const goToBoardList = () => {
        navigate(`/board/list`)
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
                    <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                        <img src={chat} alt="Chat" className="w-full" />
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
export default RegisterComponent;