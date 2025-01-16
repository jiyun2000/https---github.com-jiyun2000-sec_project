import { useEffect, useState } from "react";
import { getEmpScheduleById, putEmpScheduleOne } from "../../api/scheduleAPi/empScheduleApi";
import { useNavigate } from "react-router-dom";

//empSchedule modify component
const ModEmpScheduleComponent = ({ empNo, empSchNo }) => {
    const navigate = useNavigate();
    const initState = {
        getEmpScheNo: 0,
        scheduleText: '',
        startDate: '',
        endDate: ''
    };

    const [scheduleModData, setScheduleModData] = useState(initState);

    useEffect(() => {
        if (empNo && empSchNo) {
            getEmpScheduleById(empNo, empSchNo).then((data) => { //일정 한개 가져오기
                if (data && data.startDate && data.endDate) {
                    setScheduleModData({
                        getEmpScheNo: data.empSchNo,
                        scheduleText: data.scheduleText,
                        startDate: new Date(data.startDate),
                        endDate: new Date(data.endDate)
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [empNo, empSchNo]);

    //수정
    const modifySchedule = () => {
        putEmpScheduleOne(scheduleModData, empNo, empSchNo).then(response => {
            console.log("response " + response);
            alert("수정되었습니다.");
            navigate(`/main`);
        }).catch((error) => {console.log(error)});
    };

    const handleChangeEmpSchedule = (evt) => {
        scheduleModData[evt.target.name] = evt.target.value;
        setScheduleModData({ ...scheduleModData });
    };

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
                            onChange={handleChangeEmpSchedule}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">시작 날짜</label>
                        <input
                            name="startDate"
                            type="datetime-local"
                            value={scheduleModData.startDate}
                            onChange={handleChangeEmpSchedule}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md "
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">종료 날짜</label>
                        <input
                            name="endDate"
                            type="datetime-local"
                            value={scheduleModData.endDate}
                            onChange={handleChangeEmpSchedule}
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
};

export default ModEmpScheduleComponent;
