import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { deleteDeptScheduleOne } from "../../api/scheduleAPi/deptScheduleApi";
import { deleteScheduleOne } from "../../api/scheduleAPi/empScheduleApi";
import { getList } from "../../api/scheduleAPi/empDeptScheduleApi";

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
            
            console.log(deptSche); //ok
            

            const formatEvents = [...deptSche, ...empSche].map((evt) => {
                if (!evt.startDate) return null;

                const startDate = new Date(evt.startDate);
                const endDate = evt.endDate ? new Date(evt.endDate) : startDate;

                startDate.setHours(startDate.getHours() + 9);
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
        });
        
    }, [deptNo, empNo]);
    
   
    const handleDateClick = (date) => {
        // const dateObj = new Date(date);
        // setSelectDate(dateObj.toISOString().split('T')[0]);

        // console.log(selectDate); //맞음

        // const filteredEvents = events.filter(evt => {
        //     return (
        //         (evt.start.getDate() === dateObj.getDate() &&
        //         evt.start.getMonth() === dateObj.getMonth() &&
        //         evt.start.getFullYear() === dateObj.getFullYear())
        //     );
        // });

        // const sortedEvents = filteredEvents.sort((a, b) => a.start - b.start);

        // if (sortedEvents.length > 0) {
        //     setSelectState(sortedEvents.filter(evt=>evt.empSchNo));
        //     setSelectDepState(sortedEvents.filter(evt=>evt.deptSchNo));
        //     setModalForm(true);
        //     setAddRes(false);
        // } else {
        //     setAddRes(true);
        //     setModalForm(true);
        // }
        const dateObj = new Date(date);
        setSelectDate(dateObj.toISOString().split('T')[0]);

        console.log(selectDate);
    
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
        alert("삭제하시겠습니까 ? ");
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
        alert("삭제하시겠습니까 ? ");
        deleteDeptScheduleOne(deptNo, getDeptScheNo).then(() => {
            setEvents(events.filter(event => event.deptSchNo !== getDeptScheNo));
        }).catch((error) => {
            console.log("Errrr" + error);
        });
    };

    const addDeptSchedule = () => {
        navigate(`/deptSchedule/register/${deptNo}/${empNo}`);
    };



    return (
        <>
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
                    style={{ content: {
                            width: '25%',
                            height: '40%',
                            background: 'white',
                            zIndex:99999,
                            boxShadow:'2px',
                            overflowY:'auto',
                            borderRadius : '8px',
                            padding : '2rem'
                        }}}
                >
                {(selectState && selectState.length > 0) || (selectDepState && selectDepState.length > 0) ? (
                    <div className="text-center">
                        <h3 className="text-3xl mb-2">일정</h3>
                        {selectState && selectState.length > 0 && (
                        <>
                        <h4 className="text-xl">개인 일정</h4>
                        {selectState.map((evt, index) => (
                            <div key={index}>
                                <p className="text-2xl m-4">{evt.title}</p>
                                <p>시작 시간 : {evt.start ? evt.start.toLocaleString() : ' '}</p>
                                <p>끝난 시간 : {evt.end ? evt.end.toLocaleString() : ' '}</p>
                                <button onClick={modSchedule} type="button" className="border border-blue-200 rounded-md px-2 mr-2 mb-2 mt-2">수정</button>
                                <button onClick={deleteSchedule} type="button" className="border border-blue-200 rounded-md px-2">삭제</button><br />
                            </div>
                        ))}
                        </>
                        )}

                        {selectDepState && selectDepState.length > 0 && (
                        <>
                        <h4 className="text-xl">부서 일정</h4>
                        {selectDepState.map((evt, index) => (
                            <div key={index}>
                                <p className="text-2xl m-4">{evt.title}</p>
                                <p>시작 시간: {evt.start ? evt.start.toLocaleString() : ' '}</p>
                                <p>끝나는 시간: {evt.end ? evt.end.toLocaleString() : ' '}</p>
                                <button onClick={modDeptSchedule} type="button" className="border border-blue-200 rounded-md px-2 mr-2 mb-2 mt-2">수정</button>
                                <button onClick={deleteDeptSchedule} type="button" className="border border-blue-200 rounded-md px-2">삭제</button><br />
                            </div>
                        ))}
                        </>
                        )}
                    ------------------------- <br />
                <button onClick={addSchedule} type="button" className="border border-blue-200 rounded-md px-2 mr-2">개인 일정 추가</button>
                <button onClick={addDeptSchedule} type="button" className="border border-blue-200 rounded-md px-2 mr-2">부서 일정 추가</button>
                <button onClick={closeModal} type="button" className="border border-blue-200 rounded-md px-2">닫기</button>
                </div>
                ) : (
                addRes && addRes === true ? (
                    <div className="flex flex-col items-center">
                        <button onClick={addSchedule} type="button" className="border border-blue-200 rounded-md px-2 2/5 m-4">개인 일정 추가</button>
                        <button onClick={addDeptSchedule} type="button"  className="border border-blue-200 rounded-md px-2 2/5 m-4">부서 일정 추가</button>
                        <button onClick={closeModal} type="button" className="border border-blue-200 rounded-md px-2 ">닫기</button>
                    </div>
                ) : null
                )}
                </Modal>
            </div>
        </>
    );
};

export default EmpDeptScheduleComponent;
