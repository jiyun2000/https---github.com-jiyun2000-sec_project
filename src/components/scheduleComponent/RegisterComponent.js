import { useState } from "react";
import { postEmpScheule } from "../../api/scheduleAPi/empScheduleApi";
import { useNavigate } from "react-router-dom";

//empSchedule register component.
const RegisterComponent = ({scheduleText,startDate, endDate, empNo}) => {

    const navigate = useNavigate();

    const [newEvent, setNewEvent] = useState({
        scheduleText:scheduleText,
        start:startDate,
        end:endDate
    });
     
    const handleClickChangeInput = (e) => {
        console.log(empNo);
        newEvent[e.target.name] = e.target.value;
        setNewEvent({...newEvent});
    }
        
    const handleSaveEvent = () => {
        console.log("!!!!!" + empNo);
        const empNoSave = {...newEvent, empNo :empNo};
        postEmpScheule(empNoSave, empNo).then((data) => {
            console.log(empNo);
            console.log("ttttttttttt"  +  scheduleText);
        console.log("저장 ??????" + data);}).catch((error) => {
            console.log("errrrrrrr" + error);
        });
    };
            
    
    return (
        <>

            <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-center mb-6">일정 입력</h2>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">일정 제목</label>
                        <input type="text" className="form-control" name="scheduleText" placeholder="scheduleText" value={newEvent.scheduleText} onChange={handleClickChangeInput}/>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">시작 날짜</label>
                        <input type="datetime-local" className="form-control" name="startDate" placeholder="start" value={newEvent.startDate} onChange={handleClickChangeInput}/>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">종료 날짜</label>
                        <input type="datetime-local" className="form-control" name="endDate" placeholder="end" value={newEvent.endDate} onChange={handleClickChangeInput}/>
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
    )
}
export default RegisterComponent;