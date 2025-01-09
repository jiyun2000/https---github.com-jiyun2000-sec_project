import { useEffect, useState } from "react";
import { getEmpScheduleById, putEmpScheduleOne } from "../../api/scheduleAPi/empScheduleApi";

//empSchedule modify component
const ModEmpScheduleComponent = ({ empNo, empSchNo }) => {
    const initState = {//초기화
        getEmpScheNo: 0,
        scheduleText: '',
        startDate: '',
        endDate: ''
    };

    const [scheduleModData, setScheduleModData] = useState(initState);

    useEffect(() => {
        if (empNo && empSchNo) {
            console.log("empNo" + empNo + "empSchNo" + empSchNo);
            
            getEmpScheduleById(empNo, empSchNo).then((data) => { //일정 한개 가져오기
                console.log(JSON.stringify(data))
                console.log("data  " + data); 
                if (data && data.startDate && data.endDate) {
                    setScheduleModData({
                        getEmpScheNo: data.empSchNo,
                        scheduleText: data.scheduleText,
                        startDate: new Date(data.startDate),  
                        endDate: new Date(data.endDate)    
                    });
                } else {
                    console.error("ddddddddd" + data);
                }
            }).catch((error) => {
                console.error("errrrrrrr" + error);
            });
        }
    }, [empNo, empSchNo]);
    
    //수정
    const modifySchedule = () => {
        putEmpScheduleOne(scheduleModData, empNo, empSchNo).then(response => {
            console.log("ressssssssssssss" + response);
        }).catch((error) => {console.error("errrrrrrrrrrr "+ error)})};

    const handleChangeEmpSchedule = (evt) => {
        scheduleModData[evt.target.name] = evt.target.value;
        setScheduleModData({...scheduleModData});
    }


    return (
        <>
            <div>
                <div><input name="scheduleText" type="text" value={scheduleModData.scheduleText} onChange={handleChangeEmpSchedule} /></div>
                <div><input name="startDate" type="datetime-local" value={scheduleModData.startDate} onChange={handleChangeEmpSchedule} /></div>
                <div><input name="endDate" type="datetime-local" value={scheduleModData.endDate} onChange={handleChangeEmpSchedule} /></div>
                <button onClick={modifySchedule}>수정</button>
            </div>
        </>
    );
};

export default ModEmpScheduleComponent;
