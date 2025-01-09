import { useEffect, useState } from "react";
import { getDeptScheduleById, putDeptSchedule } from "../../api/scheduleAPi/deptScheduleApi";

// deptSchedule modify component
const ModDeptScheduleComponent = ({deptNo, deptSchNo, empNo}) => {

    const initState = { //초기화
        getDeptScheNo : 0,
        scheduleText: '',
        startDate: '',
        endDate: ''
    }

    const [scheduleModData, setScheduleModData] = useState(initState); 

    useEffect(() => {
        if (deptNo && deptSchNo && empNo ) {
            console.log("DeptNO" + deptNo + "DeptscheNo" + deptSchNo + "empNo" + empNo);
                
            getDeptScheduleById(deptNo, empNo, deptSchNo).then((data) => { //deptSchedule 한개 가져오기
                console.log(JSON.stringify(data))
                console.log("data  " + data); 
                if (data && data.startDate && data.endDate) {
                    setScheduleModData({
                        getDeptScheNo: data.deptSchNo,
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
    }, [deptNo, deptSchNo, empNo]);

    const modifySchedule = () => { //수정
        putDeptSchedule(scheduleModData, deptNo, empNo, deptSchNo).then(response => {
            console.log("Resss" + response);
        }).catch((error) => {console.log("Errrrr" + error)})};
        
    const handleChangeEmpSchedule = (evt) => {
        console.log("scheduleText" + scheduleModData.scheduleText + "startDate"  + scheduleModData.startDate)
        scheduleModData[evt.target.name] = evt.target.value;
        setScheduleModData({...scheduleModData});
    }


    return (
        <>
            <div><input name="scheduleText" type="text" value={scheduleModData.scheduleText} onChange={handleChangeEmpSchedule} /></div>
            <div><input name="startDate" type="datetime-local" value={scheduleModData.startDate} onChange={handleChangeEmpSchedule} /></div>
            <div><input name="endDate" type="datetime-local" value={scheduleModData.endDate} onChange={handleChangeEmpSchedule} /></div>
            <button onClick={modifySchedule}>수정</button>
        
        </>
    )
}
export default ModDeptScheduleComponent;