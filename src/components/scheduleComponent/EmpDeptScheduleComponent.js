import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { deleteDeptScheduleOne } from "../../api/scheduleAPi/deptScheduleApi";
import { deleteScheduleOne } from "../../api/scheduleAPi/empScheduleApi";
import { getList } from "../../api/scheduleAPi/empDeptScheduleApi";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from '../../assets/icon/mail.png';
import chat from "../../assets/icon/chat.png";
import { getOneEmp } from "../../api/employeesApi";
import { getCookie, removeCookie } from "../../util/cookieUtil";
import colorChat from "../../assets/icon/colorChat.png";

Modal.setAppElement('#root');

const EmpDeptScheduleComponent = ({ deptNo, empNo}) => {
    const [empSchNo, setEmpSchNo] = useState();
    const {deptSchNo, setDeptSchNo} = useState();
    const [events, setEvents] = useState([]);
    const [selectDate, setSelectDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectState, setSelectState] = useState([]);
    const [theDate,setTheDate] = useState('');
    const [selectDepState, setSelectDepState] = useState([]);
    const [modalForm, setModalForm] = useState(false);
    const [addRes, setAddRes] = useState(false);
    const [getEmpScheNo, setGetEmpScheNo] = useState(null);
    const [getDeptScheNo, setGetDeptScheNo] = useState(null);
    const [empSchRealNo, setEmpSchRealNo] = useState('');
    const [deptSchRealNo, setDeptSchRealNo] = useState('');
    const navigate = useNavigate();
    const [empData, setEmpData] = useState('');
    const [cookieEmpNo, setCookieEmpNo] = useState(getCookie("member").empNo);
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    
    useEffect(() => {
        getList([deptNo, empNo]).then((data) => {
            const deptSche = data.deptSchedule;
            const empSche = data.empSchedule;

            const formatEvents = [...deptSche, ...empSche].map((evt) => {
                if (!evt.startDate) return null;

                const startDate = new Date(evt.startDate);
                const endDate = evt.endDate ? new Date(evt.endDate) : startDate;

                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    return null;
                }

                startDate.setHours(startDate.getHours() + 9); //한국시간으로 (UTC)
                endDate.setHours(endDate.getHours() + 9);

                return {
                    title: evt.scheduleText,
                    start: startDate,
                    end: endDate,
                    empSchNo: evt.empSchNo,
                    deptSchNo: evt.deptSchNo,
                };
            }).filter(evt => evt !== null);
            setEvents(formatEvents);
        }).catch(error => {
            console.log(error);
        });
    }, [deptNo, empNo]);

    //해당 날짜 클릭
    const handleDateClick = (date) => {
        const dateObj = new Date(date);
        const selectedDate = dateObj.toISOString().split('T')[0];
        setSelectDate(selectedDate); 

        console.log(selectedDate); 

        getList([deptNo, empNo]).then((data) => {
            const deptSche = data.deptSchedule;
            const empSche = data.empSchedule;

            const filteredDeptSche = deptSche.filter((evt) => {
                const evtDate = new Date(evt.startDate);
                const evtDateString = evtDate.toISOString().split('T')[0]; 
                return evtDateString === selectedDate; 
            });

            const filteredEmpSche = empSche.filter((evt) => {
                const evtDate = new Date(evt.startDate);
                const evtDateString = evtDate.toISOString().split('T')[0]; 
                return evtDateString === selectedDate; 
            });

            const sortedDeptSche = filteredDeptSche.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            const sortedEmpSche = filteredEmpSche.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

            setSelectState(sortedEmpSche); 
            setSelectDepState(sortedDeptSche); 
            setModalForm(true); 
            setAddRes(filteredDeptSche.length === 0 && filteredEmpSche.length === 0); 
        }).catch((error) => {
            console.log(error);
        });
    };

    const eventClick = (info) => {
        setModalForm(true);
        setEmpSchRealNo(info.event.extendedProps.empSchNo);
        setEmpSchNo(info.event.extendedProps.empSchNo);
        console.log(empSchNo); //잘받았음
        setDeptSchRealNo(info.event.extendedProps.deptSchNo);
        //setDeptSchNo(info.event.extendedProps.deptSchNo);
        console.log(deptSchNo);
        
        setTheDate(info.event);
    };
    
    useEffect(()=>{
        console.log("dd" + JSON.stringify(theDate));
        console.log("dd2222" + empSchRealNo);
        if (empSchRealNo === undefined) {
            setSelectDepState([{theDate}]);
            setGetDeptScheNo(deptSchRealNo);
        } else if(deptSchRealNo === undefined) {
            console.log("!!!!!!!!!!!!!!!!22222222222222!");
            setSelectState([{theDate}]);
            setGetEmpScheNo(empSchRealNo);
        }
    },([theDate]));
    
    
    useEffect(()=>{
        console.log(selectState);
        
    },([selectState]));

    const closeModal = () => {
        console.log(selectState); //null
        setModalForm(false);
        window.location.reload();
    };

    const addSchedule = () => {
        const strEmpNo = empNo + '';
        const strCookieEmpNo = cookieEmpNo + '';
        console.log(strEmpNo + "~~~~~~" + strCookieEmpNo);
        if(strEmpNo === strCookieEmpNo){
            navigate(`/empSchedule/register/${empNo}`);
        }else if(empData.jobNo === 999){
            navigate(`/empSchedule/register/${empNo}`);
        }
        else{
            alert("권한이 없습니다.");
            return;
        }
        
    };

    const modSchedule = (empSchNo) => {
        const strEmpNo = empNo + '';
        const strCookieEmpNo = cookieEmpNo + '';
        console.log(strEmpNo + "~~~~~~" + strCookieEmpNo);
        if(strEmpNo === strCookieEmpNo){
            navigate(`/empSchedule/mod/${empNo}/${empSchNo}`);
        }else if(empData.jobNo === 999){
            navigate(`/empSchedule/mod/${empNo}/${empSchNo}`);
        }else{
            alert("권한이 없습니다.");
            return;
        }
    };

    const deleteSchedule = (empSchNo) => {
        const strEmpNo = empNo + '';
        const strCookieEmpNo = cookieEmpNo + '';
        console.log(strEmpNo + "~~~~~~" + strCookieEmpNo);
        if(strEmpNo === strCookieEmpNo){
            alert("삭제하시겠습니까 ?");
            deleteScheduleOne(empNo, empSchNo).then(() => {
                setEvents(events.filter(event => event.empSchNo !== getEmpScheNo));
                window.location.reload();
            }).catch((error) => {
                console.log("errrrr" + error);
            });
        }else if(empData.jobNo === 999){
            alert("삭제하시겠습니까 ?");
            deleteScheduleOne(empNo, empSchNo).then(() => {
                setEvents(events.filter(event => event.empSchNo !== getEmpScheNo));
                window.location.reload();
            }).catch((error) => {
                console.log("errrrr" + error);
            });
        }
        else{
            alert("권한이 없습니다.");
            return;
        }
    };

    const modDeptSchedule = (deptSchNo) => {
        const strEmpNo = empNo + '';
        const strCookieEmpNo = cookieEmpNo + '';
        console.log(strEmpNo + "~~~~~~" + strCookieEmpNo);
        if(strEmpNo === strCookieEmpNo){
                navigate(`/deptSchedule/mod/${deptNo}/${empNo}/${deptSchNo}`);
        }else{
            alert("권한이 없습니다.");
            return;
        }
    };

    const deleteDeptSchedule = (deptSchNo) => {
        const strEmpNo = empNo + '';
        const strCookieEmpNo = cookieEmpNo + '';
        console.log(strEmpNo + "~~~~~~" + strCookieEmpNo);
        if(strEmpNo === strCookieEmpNo){
                alert("삭제하시겠습니까 ?");
                deleteDeptScheduleOne(deptNo, deptSchNo).then(() => {
                    setEvents(events.filter(event => event.deptSchNo !== getDeptScheNo));
                    window.location.reload();
                }).catch((error) => {
                    console.log("Errrr" + error);
                });
        }else{
            alert("권한이 없습니다.");
            return;
        }
            
    };

    useEffect(()=>{
        getOneEmp(empNo).then((data)=>{
            console.log(data);
            setEmpData(data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    const addDeptSchedule = () => {
        const strEmpNo = empNo + '';
        const strCookieEmpNo = cookieEmpNo + '';
        console.log(strEmpNo + "~~~~~~" + strCookieEmpNo);
        if(strEmpNo === strCookieEmpNo){
            navigate(`/deptSchedule/register/${deptNo}/${empNo}`);
           
        }else{
            alert("권한이 없습니다.");
            return;
        }
        
    };

const checkRemove = () => {
    removeCookie("alert");
  }

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
                    <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                    {chatCntCook  ? 
                        <img src={colorChat} alt='colorChat' className='w-full' /> :
                        <img src={chat} alt="Chat" className="w-full" />
                    }
                    </Link>
                </div>
            </div>

            <div className="py-9 pl-9 pr-6">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    dateClick={(info) => handleDateClick(info.dateStr)}
                    // eventClick={eventClik}
                    events={events}
                    timeZone="Asia/Seoul"
                    businessHours={true}
                    locale="ko"
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    }}
                /> 

        <Modal
        isOpen={modalForm}
        onRequestClose={closeModal}
        contentLabel="Schedule Modal"
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 z-40"
        >
        <div className="bg-white rounded-lg shadow-lg overflow-y-scroll h-[60vh] w-4/5 md:w-1/3 lg:w-1/4 p-6 z-50">
            {(selectState && selectState.length > 0) || (selectDepState && selectDepState.length > 0) ? (
            <div className="text-center">
                <h3 className="text-3xl mb-4">일정</h3>
                {selectState && selectState.length > 0 && (
                <>
                    <h4 className="text-xl mb-2">개인 일정</h4>
                    {selectState.map((evt, index) => (
                    <div key={index}>
                        <p className="text-2xl m-4">{evt.scheduleText}</p>
                        <p>시작 시간: {evt.startDate ? new Date(evt.startDate).toLocaleString() : ' '}</p>
                        <p>끝난 시간: {evt.endDate ? new Date(evt.endDate).toLocaleString() : ' '}</p>
                        <button
                        onClick={()=>modSchedule(evt.empSchNo)}
                        type="button"
                        className="border border-blue-200 rounded-md px-4 py-2 mr-2 mb-2 mt-2 hover:bg-blue-100"
                        >
                        수정
                        </button>
                        <button
                        onClick={()=>deleteSchedule(evt.empSchNo)}
                        type="button"
                        className="border border-blue-200 rounded-md px-4 py-2 hover:bg-blue-100"
                        >
                        삭제
                        </button>
                    </div>
                    ))}
                </>
                )}

                {selectDepState && selectDepState.length > 0 && (
                <>
                    <h4 className="text-xl mb-2">부서 일정</h4>
                    {selectDepState.map((evt, index) => (
                    <div key={index}>
                        <p className="text-2xl m-4">{evt.scheduleText}</p>
                        <p>시작 시간: {evt.startDate ? new Date(evt.startDate).toLocaleString() : ' '}</p>
                        <p>끝나는 시간: {evt.endDate ? new Date(evt.endDate).toLocaleString() : ' '}</p>
                        <button
                        onClick={()=>modDeptSchedule(evt.deptSchNo)}
                        type="button"
                        className="border border-blue-200 rounded-md px-4 py-2 mr-2 mb-2 mt-2 hover:bg-blue-100"
                        >
                        수정
                        </button>
                        <button
                        onClick={()=>deleteDeptSchedule(evt.deptSchNo)}
                        type="button"
                        className="border border-blue-200 rounded-md px-4 py-2 hover:bg-blue-100"
                        >
                        삭제
                        </button>
                    </div>
                    ))}
                </>
                )}

                <hr className="my-4" />
                <button
                onClick={addSchedule}
                type="button"
                className="border border-blue-200 rounded-md px-4 py-2 mr-2 mb-2 hover:bg-blue-100"
                >
                개인 일정 추가
                </button>
                <button
                onClick={addDeptSchedule}
                type="button"
                className="border border-blue-200 rounded-md px-4 py-2 mr-2 mb-2 hover:bg-blue-100"
                >
                부서 일정 추가
                </button>
                <button
                onClick={closeModal}
                type="button"
                className="border border-blue-200 rounded-md px-4 py-2 hover:bg-blue-100"
                >
                닫기
                </button>
            </div>
            ) : (
            addRes && addRes === true ? (
                <div className="flex flex-col items-center">
                <button
                    onClick={addSchedule}
                    type="button"
                    className="border border-blue-200 rounded-md px-4 py-2 w-4/5 md:w-2/5 m-4 hover:bg-blue-100"
                >
                    개인 일정 추가
                </button>
                <button
                    onClick={addDeptSchedule}
                    type="button"
                    className="border border-blue-200 rounded-md px-4 py-2 w-4/5 md:w-2/5 m-4 hover:bg-blue-100"
                >
                    부서 일정 추가
                </button>
                <button
                    onClick={closeModal}
                    type="button"
                    className="border border-blue-200 rounded-md px-4 py-2 hover:bg-blue-100"
                >
                    닫기
                </button>
                </div>
            ) : null
            )}
        </div>
        </Modal>
    </div>
    </div>
    </>
    );
};

export default EmpDeptScheduleComponent;
