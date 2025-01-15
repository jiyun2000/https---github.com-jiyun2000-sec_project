import { useEffect, useState } from "react";
import { getTodayList } from "../../api/scheduleAPi/empDeptScheduleApi";

//yyyy-mm-dd 변환 함수
const formatSelectDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.log("dateString" + dateString);
        return null;
    }
    return date.toISOString().split('T')[0]; 
};

//유효 날짜? 
const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

//오늘 일정 리스트 
const TodayListComponent = ({ deptNo, empNo, selectDate: initialSelectDate }) => {
    const [events, setEvents] = useState([]);
    const [selectDate, setSelectDate] = useState(initialSelectDate || new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (initialSelectDate) {
            setSelectDate(initialSelectDate);
        } else {
            setSelectDate(new Date().toISOString().split('T')[0]);
        }
    }, [initialSelectDate]);


    useEffect(() => {
        console.log("selectDate: " + selectDate);

        const formattedDate = formatSelectDate(selectDate);
        if (!formattedDate) {
            console.log("formatErrorrrr");
            return;
        }
        console.log("formattedDate " + formattedDate);
    
        getTodayList(deptNo, empNo, formattedDate).then((data) => { //오늘 일정 리스트 불러오기
            console.log("data" + data);
            console.log(JSON.stringify(data));
             
            const allSchedule = [...data.deptSchedule, ...data.empSchedule]; //두개 한번에 묶기
            console.log("allSchedule" + allSchedule);
        
            const validEvents = allSchedule.filter(evt => {
                if (isValidDate(evt.startDate) && isValidDate(evt.endDate)) {
                    return true;
                } else {
                    console.log(evt.startDate, evt.endDate);
                    return false;
                }
            });
            //startdate 순 정렬
            validEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            setEvents(validEvents);
        }).catch((error) => {
            console.log("errrr:", error);
        });
    }, [deptNo, empNo, selectDate]); 

    return (
        <>
            {events && events.length > 0 ? (
                events.map((evt) => (
                    <div key={evt.empSchNo}>
                        <p>{evt.scheduleText}</p>
                        <p>시작 시간: {new Date(evt.startDate).toLocaleString()}</p>
                        <p>끝나는 시간: {new Date(evt.endDate).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                "오늘일정X"
            )}
        </>
    );
};

export default TodayListComponent;
