import { useEffect, useState } from "react";
import { getDeptTodo } from "../../api/todoApi/deptTodoApi";
import { useNavigate } from "react-router-dom";
import { deleteDeptScheduleOne } from "../../api/scheduleAPi/deptScheduleApi";
import { postDeptSchedule } from "../../api/scheduleAPi/deptScheduleApi"; // 추가된 import

const formatSelectDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) { //날짜 유효 검사
        console.error("dateString" + dateString);
        return null;
    }
    return date.toISOString().split('T')[0]; //yyyy-mm-dd
};

const DeptTodoComponent = ({ empNo, deptNo, selectDate: initialSelectDate }) => {
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

        getDeptTodo(empNo, deptNo, formattedDate).then((data) => { //deptTodoList 가져오기
            if (data.deptSchedule && data.deptSchedule.length > 0) {
                setEvents(data.deptSchedule);
            } else {
                setEvents([]);
            }
        }).catch((error) => {
            console.error("getDeptTodo Error: " + error);
        });
    }, [empNo, deptNo, selectDate]);

    //부서 일정 수정
    const modDeptSchedule = (deptSchNo) => {
        navigate(`/deptSchedule/mod/${deptNo}/${empNo}/${deptSchNo}`);
    };

    //부서 일정 삭제
    const deleteDeptSchedule = (deptSchNo) => {
        deleteDeptScheduleOne(deptNo, deptSchNo).then(() => {
            setEvents(events.filter(event => event.deptSchNo !== deptSchNo));
        }).catch((error) => {
            console.error("deleteDeptScheduleOne Errrrror " + error);
        });
    };

    //부서 일정 추가
    const addSchedule = () => {
        navigate(`/deptSchedule/register/${deptNo}/${empNo}`); 
    };
    

    return (
        <>
            <h2>[DEPT] Todo List</h2><br />
            {events && events.length > 0 ? (
                events.map((evt) => (
                    <div key={evt.deptSchNo}>
                        <p>{evt.scheduleText}</p>
                        <p>시작 시간: {new Date(evt.startDate).toLocaleString()}</p>
                        <p>끝나는 시간: {new Date(evt.endDate).toLocaleString()}</p>
                        <button onClick={() => modDeptSchedule(evt.deptSchNo)} type="button">부서 일정 수정하기</button><br />
                        <button onClick={() => deleteDeptSchedule(evt.deptSchNo)} type="button">부서 일정 삭제하기</button><br />
                        -----------------------------------------<br/>
                    </div>
                ))
            ) : (
                "일정X" 
            )}
            <br />
            <button onClick={addSchedule}>일정 추가하기</button>
        </>
    );
};

export default DeptTodoComponent;
