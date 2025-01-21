import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { deleteDeptScheduleOne } from "../../api/scheduleAPi/deptScheduleApi";
import { deleteScheduleOne } from "../../api/scheduleAPi/empScheduleApi";
import { getList } from "../../api/scheduleAPi/empDeptScheduleApi";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from '../../assets/icon/mail.png';
import chat from "../../assets/icon/chat.png";

Modal.setAppElement('#root');

const EmpDeptScheduleComponent = ({ deptNo, empNo, empSchNo, deptSchNo }) => {
    const [events, setEvents] = useState([]);
    const [selectDate, setSelectDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectState, setSelectState] = useState([]);
    const [selectDepState, setSelectDepState] = useState([]);
    const [modalForm, setModalForm] = useState(false);
    const [addRes, setAddRes] = useState(false);
    const [getEmpScheNo, setGetEmpScheNo] = useState(null);
    const [getDeptScheNo, setGetDeptScheNo] = useState(null);
    const navigate = useNavigate();

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
        const empSchNo = info.event.extendedProps.empSchNo;
        const deptSchNo = info.event.extendedProps.deptSchNo;
        
        if (empSchNo === undefined) {
            setSelectDepState([info.event]);
            setGetDeptScheNo(deptSchNo);
        } else {
            setSelectState([info.event]);
            setGetEmpScheNo(empSchNo);
        }
    };

    const closeModal = () => {
        setModalForm(false);
    };

    const addSchedule = () => {
        navigate(`/empSchedule/register/${empNo}`);
    };

    const modSchedule = () => {
        navigate(`/empSchedule/mod/${empNo}/${getEmpScheNo}`);
    };

    const deleteSchedule = () => {
        alert("삭제하시겠습니까 ?");
        deleteScheduleOne(empNo, getEmpScheNo).then(() => {
            setEvents(events.filter(event => event.empSchNo !== getEmpScheNo));
        }).catch((error) => {
            console.log("errrrr" + error);
        });
    };

    const modDeptSchedule = () => {
        navigate(`/deptSchedule/mod/${deptNo}/${empNo}/${getDeptScheNo}`);
    };

    const deleteDeptSchedule = () => {
        alert("삭제하시겠습니까 ?");
        deleteDeptScheduleOne(deptNo, getDeptScheNo).then(() => {
            setEvents(events.filter(event => event.deptSchNo !== getDeptScheNo));
        }).catch((error) => {
            console.log("Errrr" + error);
        });
    };

    const addDeptSchedule = () => {
        navigate(`/deptSchedule/register/${deptNo}/${empNo}`);
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

            <div className="py-9 pl-9 pr-6">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    dateClick={(info) => handleDateClick(info.dateStr)}
                    eventClick={eventClick}
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
        <div className="bg-white rounded-lg shadow-lg overflow-y-auto w-4/5 md:w-1/3 lg:w-1/4 p-6 z-50">
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
                        onClick={modSchedule}
                        type="button"
                        className="border border-blue-200 rounded-md px-4 py-2 mr-2 mb-2 mt-2 hover:bg-blue-100"
                        >
                        수정
                        </button>
                        <button
                        onClick={deleteSchedule}
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
                        onClick={modDeptSchedule}
                        type="button"
                        className="border border-blue-200 rounded-md px-4 py-2 mr-2 mb-2 mt-2 hover:bg-blue-100"
                        >
                        수정
                        </button>
                        <button
                        onClick={deleteDeptSchedule}
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
