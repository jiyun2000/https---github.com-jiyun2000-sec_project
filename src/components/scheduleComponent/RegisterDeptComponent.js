import { useState, useEffect } from "react";
import { postDeptSchedule, putDeptSchedule } from "../../api/scheduleAPi/deptScheduleApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from '../../assets/icon/mail.png';
import chat from "../../assets/icon/chat.png";
import { getOneEmp } from "../../api/employeesApi";
import { getCookie, removeCookie } from "../../util/cookieUtil";
import colorChat from "../../assets/icon/colorChat.png";
//deptSchedule register component
const RegisterDeptComponent = ({ scheduleText, startDate, endDate }) => {
    const navigate = useNavigate();
    const [empData, setEmpData] = useState('');
    const { deptNo, empNo, deptSchNo } = useParams();
    const [newEvent, setNewEvent] = useState({
        scheduleText: scheduleText ,
        startDate: startDate, 
        endDate: endDate,  
    });
     const [cookieEmpNo, setCookieEmpNo] = useState(getCookie("member").empNo);
     const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    const handleClickChangeInput = (e) => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value
        });
    };

    useEffect(()=>{
        getOneEmp(empNo).then((data)=>{
            console.log(data);
            setEmpData(data);
        }).catch((error)=>{
            console.log(error)
        })
    },[]);

    const handleSaveEvent = () => {
        const startDateObj = new Date(newEvent.startDate).toISOString;
        const endDateObj = new Date(newEvent.endDate).toISOString;
        console.log(startDateObj)
        console.log("dddddsad");
        

        if(newEvent.endDate<=newEvent.startDate){
            alert("끝나는 시간이 시작시간보다 이릅니다.")
            return;
        }


        console.log("newEvent" + newEvent); 
        const deptNoSave = { 
            ...newEvent, 
            empNo, 
            deptNo
        };

        const strEmpNo = empNo + '';
        const strCookieEmpNo = cookieEmpNo + '';
        console.log(strEmpNo + "~~~~~~" + strCookieEmpNo);
        if(strEmpNo === strCookieEmpNo){
                    if (!deptSchNo) { //일정이 없다면
                        postDeptSchedule(deptNoSave, empNo, deptNo).then((data) => { //register
                            console.log(JSON.stringify(data));
                            alert("등록되었습니다.");
                            navigate(`/main`);
                        }).catch((error) => {
                            console.log("postDeptSchedule errrror" + error);
                        });
                    } else {
                        putDeptSchedule(deptNoSave, deptNo, empNo, deptSchNo).then((data) => {
                            console.log("일정 수정 성공:", data);
                        }).catch((error) => {
                            console.log("일정 수정 실패:", error);
                        })}
                }else{
                    alert("권한이 없습니다.");
                    return;
                }
            
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
                    <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                    {chatCntCook  ? 
                        <img src={colorChat} alt='colorChat' className='w-full' /> :
                        <img src={chat} alt="Chat" className="w-full" />
                    }
                    </Link>
                </div>
            </div>

            <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-6">[DEPT] 일정 입력</h2>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">일정 제목</label>
                        <input
                                type="text"
                                className="form-control"
                                name="scheduleText"
                                placeholder="일정 내용"
                                value={newEvent.scheduleText}
                                onChange={handleClickChangeInput}
                            />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">시작 날짜</label>
                        <input
                                type="datetime-local"
                                className="form-control"
                                name="startDate"
                                value={newEvent.startDate}
                                onChange={handleClickChangeInput}
                            />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">종료 날짜</label>
                        <input
                                type="datetime-local"
                                className="form-control"
                                name="endDate"
                                value={newEvent.endDate}
                                onChange={handleClickChangeInput}
                            />
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
    );
};

export default RegisterDeptComponent;
