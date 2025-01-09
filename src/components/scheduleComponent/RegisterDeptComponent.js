import { useState, useEffect } from "react";
import { postDeptSchedule, putDeptSchedule } from "../../api/scheduleAPi/deptScheduleApi";
import { useNavigate, useParams } from "react-router-dom";

//deptSchedule register component
const RegisterDeptComponent = ({ scheduleText, startDate, endDate }) => {

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
            }).catch((error) => {
                console.error("postDeptSchedule errrror" + error);
            });
        } else {
            putDeptSchedule(deptNoSave, deptNo, empNo, deptSchNo).then((data) => {
                console.log("일정 수정 성공:", data);
            }).catch((error) => {
                console.error("일정 수정 실패:", error);
            })}};

    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">일정 입력</h5>
                        <button type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="scheduleText"
                                placeholder="일정 내용"
                                value={newEvent.scheduleText}
                                onChange={handleClickChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="startDate"
                                value={newEvent.startDate}
                                onChange={handleClickChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="endDate"
                                value={newEvent.endDate}
                                onChange={handleClickChangeInput}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-warning replySave"
                            onClick={handleSaveEvent}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterDeptComponent;

