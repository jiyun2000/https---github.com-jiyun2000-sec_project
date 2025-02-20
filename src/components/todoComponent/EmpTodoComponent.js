import { useEffect, useState } from "react";
import { getEmpTodo } from "../../api/todoApi/empTodoApi";
import { useNavigate } from "react-router-dom";
import { deleteScheduleOne } from "../../api/scheduleAPi/empScheduleApi";
import { getCookie } from "../../util/cookieUtil";
import { getOneEmp } from "../../api/employeesApi";

const formatSelectDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) { //날짜 유효 검사
        console.log("dateString" + dateString);
        return null;
    }
    return date.toISOString().split('T')[0]; //yyyy-mm-dd
};

const EmpTodoComponent = ({ empNo, selectDate: initialSelectDate }) => {
    console.log(empNo);
    
    const [events, setEvents] = useState([]);
    const [selectDate, setSelectDate] = useState(initialSelectDate || new Date().toISOString().split('T')[0]);
    const navigate = useNavigate();
    const [cookieEmpNo, setCookieEmpNo] = useState(getCookie("member").empNo);
    const [empData, setEmpData] = useState('');

    useEffect(() => {
        setSelectDate(initialSelectDate || new Date().toISOString().split('T')[0]);
    }, [initialSelectDate]);

    useEffect(()=>{
        getOneEmp(cookieEmpNo).then((data) => {
            setCookieEmpNo(data);
        })
    }, []);

    useEffect(() => {
        const formattedDate = formatSelectDate(selectDate);
        if (!formattedDate) {
            console.log("formattedDate error");
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
            console.log("getEmpTodo Error: " + error);
        });
    }, [empNo, selectDate]);

    //개인 일정 추가
    const empTodoAdd = () => {
        navigate(`/empSchedule/register/${empNo}`);
    };

    //개인 일정 수정
    const modSchedule = (empSchNo) => {
         navigate(`/empSchedule/mod/${empNo}/${empSchNo}`);
    };

    //개인 일정 삭제
    const deleteSchedule = (empSchNo) => {
        alert("일정을 삭제하겠습니다.");
        deleteScheduleOne(empNo, empSchNo).then(() => {
            setEvents(events.filter(event => event.empSchNo !== empSchNo));
        }).catch((error) => {
            console.log("deleteScheduleErr" + error);
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
            <div className="text-center h-[35vh] overflow-y-scroll p-2 rounded-md">
            {events && events.length > 0 ? (
                events.map((evt) => (
                    <div key={evt.empSchNo} >
                        <p className="text-2xl font-medium m-4">{evt.scheduleText}</p>
                        <p className="font-light">시작 시간 : {formatDate(evt.startDate)}</p>
                        <p className="font-light">끝난 시간 : {formatDate(evt.endDate)}</p>
                        <button onClick={() => modSchedule(evt.empSchNo)} type="button" className="border border-blue-200 rounded-md px-2 mr-2">수정</button>
                        <button onClick={() => deleteSchedule(evt.empSchNo)} type="button" className="border border-blue-200 rounded-md px-2">삭제</button><br />
                        ---------------------------------------------------
                        <br />
                    </div>
                ))
            ) : (
                "일정X"
            )}
            <button onClick={empTodoAdd} type="button" className="border border-blue-200 rounded-md p-2">추가</button>
            </div>
        </>
    );
};

export default EmpTodoComponent;
