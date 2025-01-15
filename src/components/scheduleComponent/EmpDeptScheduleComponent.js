import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { deleteDeptScheduleOne } from "../../api/scheduleAPi/deptScheduleApi";
import { deleteScheduleOne } from "../../api/scheduleAPi/empScheduleApi";
import { getList } from "../../api/scheduleAPi/empDeptScheduleApi";

const EmpDeptScheduleComponent = ({ deptNo, empNo, empSchNo, deptSchNo }) => {
    const [events, setEvents] = useState([]); //전체 일정 넣어 둘 배열.
    const [selectDate, setSelectDate] = useState(new Date().toISOString().split('T')[0]); 
    const [selectState, setSelectState] = useState([]);//선택 개인 일정
    const [selectDepState, setSelectDepState] = useState([]);
    const [modalForm, setModalForm] = useState(false);
    const [addRes, setAddRes] = useState(false); //추가 일정?
    const [getEmpScheNo, setGetEmpScheNo] = useState(null); //empScheNo 을 자꾸 못받길래,,, 저장시켜놓는 그런 ....
    const [getDeptScheNo, setGetDeptScheNo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getList([deptNo, empNo]).then((data) => { //전체 리스트 불러옴.
            const deptSche = data.deptSchedule;
            const empSche = data.empSchedule;

            const formatEvents = [...deptSche, ...empSche].map((evt) => {
                if (!evt.startDate) return null;

                const startDate = new Date(evt.startDate);
                const endDate = evt.endDate ? new Date(evt.endDate) : startDate;
                
                return {
                    title: evt.scheduleText,
                    start: startDate,
                    end: endDate,
                    empSchNo: evt.empSchNo,
                    deptSchNo: evt.deptSchNo,
                };
            }).filter(evt => evt !== null); //null 값 제외
            setEvents(formatEvents);
        });
    }, [deptNo, empNo]);

    const handleDateClick = (date) => { //해당 날짜를 클릭하였을 때. 
        //해당 날짜 관련 일정 필터링
        const dateObj = new Date(date);
        setSelectDate(dateObj.toISOString().split('T')[0]); 
        //selectDate를 못받길래....
        //toISOString() => date 를 문자열ㄹ 바꿔주는거 / 
        //날짜와 시간은 'T'로 구분  따라서 날짜만 가져온거.

        //events에서 날짜와 맞는지 필터링.
        const filteredEvents = events.filter(evt => {
            return (
                (evt.start.getDate() === dateObj.getDate() &&
                evt.start.getMonth() === dateObj.getMonth() &&
                evt.start.getFullYear() === dateObj.getFullYear())
            );
        });

        //리스트 보여줄때, startDate 기준으로 정렬시킨거임.
        const sortedEvents = filteredEvents.sort((a, b) => a.start - b.start);

        if (sortedEvents.length > 0) { 
            setSelectState(sortedEvents);
            setModalForm(true);
            setAddRes(false); 
        } else {
            setAddRes(true);
        }
    };

    // 일정 클릭 시 세부 일정 표시
    const eventClick = (info) => {
        setModalForm(true);
        const empSchNo = info.event.extendedProps.empSchNo;
        //empSchNo를 못받아.... 
        //event객체에 임의로 추가한 속성들은 모두 extendedProps를 통해 접근해야만 접근이 가능하다고 함;;
        const deptSchNo = info.event.extendedProps.deptSchNo;
        
        if (empSchNo === undefined) { //부서일정 클릭했을 경우
            setSelectDepState([info.event]);
            setGetDeptScheNo(deptSchNo);
        } else {
            setSelectState([info.event]);
            setGetEmpScheNo(empSchNo);
        }
    };

    // 모달 닫기
    const closeModal = () => {
        setModalForm(false);
    };

    //개인 일정 추가
    const addSchedule = () => {
        navigate(`/empSchedule/register/${empNo}`);
    };

    //개인 일정 수정
    const modSchedule = () => {
        navigate(`/empSchedule/mod/${empNo}/${getEmpScheNo}`);
    };

    //개인 일정 삭제
    const deleteSchedule = () => {
        deleteScheduleOne(empNo, getEmpScheNo).then(() => {
            setEvents(events.filter(event => event.empSchNo !== getEmpScheNo));
        }).catch((error) => {
            console.log("errrrr" + error);
        });
    };

    // 부서 일정 수정
    const modDeptSchedule = () => {
        navigate(`/deptSchedule/mod/${deptNo}/${empNo}/${getDeptScheNo}`);
    };

    // 부서 일정 삭제
    const deleteDeptSchedule = () => {
        deleteDeptScheduleOne(deptNo, getDeptScheNo).then(() => {
            setEvents(events.filter(event => event.deptSchNo !== getDeptScheNo));
        }).catch((error) => {
            console.log("Errrr" + error);
        });
    };

    //부서 일정 추가
    const addDeptSchedule = () => {
        navigate(`/deptSchedule/register/${deptNo}/${empNo}`); 
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={(info) => handleDateClick(info.dateStr)}
                eventClick={eventClick}
                events={events}
            /> 

        <Modal show={modalForm} onHide={closeModal}>
            {selectState.length > 0 ? (
                <div>
                    <h3>오늘의 일정</h3>
                    {selectState.map((evt, index) => ( // 개인 스케줄 창
                    <div key={index}>
                        <p>{evt.title}</p>
                        <p>시작 시간: {evt.start ? evt.start.toLocaleString() : ' '}</p>
                        <p>끝나는 시간: {evt.end ? evt.end.toLocaleString() : ' '}</p>
                        <button onClick={modSchedule} type="button" className="border border-sky-400 rounded-sm p-2 m-4">일정 수정하기</button>
                        <button onClick={deleteSchedule} type="button" className="border border-blue-400 rounded-sm p-2 m-4">일정 삭제하기</button>
                    </div>
                    ))}
                <button onClick={addSchedule} type="button" className="border border-blue-400 rounded-sm p-2 m-4">일정 추가하기</button>
                <button onClick={closeModal} type="button0" className="border border-sky-400 rounded-sm p-2 m-4">Close</button><br />
               
                </div>
            ) : selectDepState.length > 0 ? ( // 부서 스케줄 창
                <div className="bg-blue-50">
                    <h3>부서 일정</h3>
                    <p>{selectDepState[0].title}</p>
                    <p>시작 시간: {selectDepState[0]?.start ? selectDepState[0].start.toLocaleString() : ' '}</p>
                    <p>끝나는 시간: {selectDepState[0]?.end ? selectDepState[0].end.toLocaleString() : ' '}</p>
                    <button onClick={modDeptSchedule} type="button">부서 일정 수정하기</button><br />
                    <button onClick={deleteDeptSchedule} type="button">부서 일정 삭제하기</button><br />
                    <button onClick={closeModal} type="button">Close</button><br />
                    <button onClick={addDeptSchedule} type="button">부서 일정 추가하기</button><br />
                </div>
            ) : addRes ? ( // 일정이 없을 때 추가 버튼만 보여주기
                <div>
                    <button onClick={addSchedule} type="button">일정 추가하기</button><br />
                    <button onClick={addDeptSchedule} type="button">부서 일정 추가하기</button><br />
                </div>
            ) : null}
        </Modal>
        </>
    );
};

export default EmpDeptScheduleComponent;
