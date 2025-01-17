import { useState, useEffect } from "react";
import { postDeptSchedule, putDeptSchedule } from "../../api/scheduleAPi/deptScheduleApi";
import { useNavigate, useParams } from "react-router-dom";

//deptSchedule register component
const RegisterDeptComponent = ({ scheduleText, startDate, endDate }) => {
    const navigate = useNavigate();
    const { deptNo, empNo, deptSchNo } = useParams();
    const [newEvent, setNewEvent] = useState({
        scheduleText: scheduleText ,
        startDate: startDate, 
        endDate: endDate,  
    });

    const handleClickChangeInput = (e) => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveEvent = () => {
        console.log("newEvent" + newEvent); 
        const deptNoSave = { 
            ...newEvent, 
            empNo, 
            deptNo
        };
    
        if (!deptSchNo) { //일정이 없다면
            postDeptSchedule(deptNoSave, empNo, deptNo).then((data) => { //register
                console.log(JSON.stringify(data));
                alert("등록되었습니다.");
                navigate(`/main`);
            }).catch((error) => {
                console.log("postDeptSchedule errrror" + error);
            });
        } else {
            putDeptSchedule(deptNoSave, deptNo, empNo, deptSchNo).then((data) => {
                console.log("일정 수정 성공:", data);
            }).catch((error) => {
                console.log("일정 수정 실패:", error);
            })}};

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-6">[DEPT] 일정 입력</h2>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">일정 제목</label>
                        <input
                                type="text"
                                className="form-control"
                                name="scheduleText"
                                placeholder="일정 내용"
                                value={newEvent.scheduleText}
                                onChange={handleClickChangeInput}
                            />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">시작 날짜</label>
                        <input
                                type="datetime-local"
                                className="form-control"
                                name="startDate"
                                value={newEvent.startDate}
                                onChange={handleClickChangeInput}
                            />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">종료 날짜</label>
                        <input
                                type="datetime-local"
                                className="form-control"
                                name="endDate"
                                value={newEvent.endDate}
                                onChange={handleClickChangeInput}
                            />
                    </div>

                    <button
                        type="button"
                        onClick={handleSaveEvent}
                        className="w-full bg-sky-300 text-white py-2 rounded-md "
                    >
                        등록
                    </button>
                </div>
            </div>
        </>
    );
};

export default RegisterDeptComponent;

