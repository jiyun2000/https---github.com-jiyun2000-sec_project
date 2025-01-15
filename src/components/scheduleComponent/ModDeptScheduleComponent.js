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
                    console.log("ddddddddd" + data);
                }
            }).catch((error) => {
                    console.log("errrrrrrr" + error);
            });
        }
    }, [deptNo, deptSchNo, empNo]);

    const modifySchedule = () => { //수정
        putDeptSchedule(scheduleModData, deptNo, empNo, deptSchNo).then(response => {
            console.log("Resss" + response);
        }).catch((error) => {console.log("Errrrr" + error)})};
        
    const handleChangeDeptSchedule = (evt) => {
        console.log("scheduleText" + scheduleModData.scheduleText + "startDate"  + scheduleModData.startDate)
        scheduleModData[evt.target.name] = evt.target.value;
        setScheduleModData({...scheduleModData});
    }

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-6">일정 수정</h2>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">일정 제목</label>
                        <input
                            name="scheduleText"
                            type="text"
                            value={scheduleModData.scheduleText}
                            onChange={handleChangeDeptSchedule}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">시작 날짜</label>
                        <input
                            name="startDate"
                            type="datetime-local"
                            value={scheduleModData.startDate}
                            onChange={handleChangeDeptSchedule}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md "
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">종료 날짜</label>
                        <input
                            name="endDate"
                            type="datetime-local"
                            value={scheduleModData.endDate}
                            onChange={handleChangeDeptSchedule}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={modifySchedule}
                        className="w-full bg-sky-300 text-white py-2 rounded-md "
                    >
                        수정
                    </button>
                </div>
            </div>
        </>
    );

}
export default ModDeptScheduleComponent;