import { useEffect, useState } from "react";
import { getEmpTodo } from "../../api/todoApi/empTodoApi";
import { useNavigate } from "react-router-dom";
import { deleteScheduleOne } from "../../api/scheduleAPi/empScheduleApi";

const formatSelectDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) { //날짜 유효 검사
        console.error("dateString" + dateString);
        return null;
    }
    return date.toISOString().split('T')[0]; //yyyy-mm-dd
};

const EmpTodoComponent = ({ empNo, selectDate: initialSelectDate }) => {
    const [events, setEvents] = useState([]);
    const [selectDate, setSelectDate] = useState(initialSelectDate || new Date().toISOString().split('T')[0]);
    const navigate = useNavigate();

    useEffect(() => {
        setSelectDate(initialSelectDate || new Date().toISOString().split('T')[0]);
    }, [initialSelectDate]);

    useEffect(() => {
        const formattedDate = formatSelectDate(selectDate);
        if (!formattedDate) {
            console.error("formattedDate error");
            return;
        }

        getEmpTodo(empNo, formattedDate).then((data) => { //empTodoList 가져오기
            console.log(data);
            if (data.empSchedule && data.empSchedule.length > 0) {
                setEvents(data.empSchedule);
            } else { //일정X
                setEvents([]);
            }
        }).catch((error) => {
            console.error("getEmpTodo Error: " + error);
        });
    }, [empNo, selectDate]);

    //개인 일정 추가
    const empTodoAdd = () => {
        navigate(`/empSchedule/register/${empNo}`);
    };

    //개인인 일정 수정
    const modSchedule = (empSchNo) => {
        navigate(`/empSchedule/mod/${empNo}/${empSchNo}`);
    };

    //개인 일정 삭제
    const deleteSchedule = (empSchNo) => {
        deleteScheduleOne(empNo, empSchNo).then(() => {
            setEvents(events.filter(event => event.empSchNo !== empSchNo));
        }).catch((error) => {
            console.error("deleteScheduleErr" + error);
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "";
        }
        return date.toLocaleString();
    };

    return (
        <>
            <h2>Todo List</h2> <br />
            {events && events.length > 0 ? (
                events.map((evt) => (
                    <div key={evt.empSchNo}>
                        <p>{evt.scheduleText}</p>
                        <p>시작 시간: {formatDate(evt.startDate)}</p>
                        <p>끝나는 시간: {formatDate(evt.endDate)}</p>
                        <button onClick={() => modSchedule(evt.empSchNo)} type="button">일정 수정하기</button><br />
                        <button onClick={() => deleteSchedule(evt.empSchNo)} type="button">일정 삭제하기</button><br />
                        ---------------------------------------------------
                        <br />
                    </div>
                ))
            ) : (
                "일정X"
            )}
            <button onClick={empTodoAdd} type="button">일정 추가하기</button>
        </>
    );
};

export default EmpTodoComponent;
