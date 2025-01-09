import { useState } from "react";
import { postEmpScheule } from "../../api/scheduleAPi/empScheduleApi";

//empSchedule register component.
const RegisterComponent = ({scheduleText,startDate, endDate, empNo}) => {

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
            <div class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{startDate} 일정 입력</h5>
                          
                            <button type="button" class="btn-close"></button>
                             
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <input type="text" class="form-control" name="scheduleText" placeholder="scheduleText" value={newEvent.scheduleText} onChange={handleClickChangeInput}/>
                            </div>
        
                            <div class="form-group">
                                <input type="datetime-local" class="form-control" name="startDate" placeholder="start" value={newEvent.startDate} onChange={handleClickChangeInput}/>
                            </div>
        
                            <div class="form-group">
                                <input type="datetime-local" class="form-control" name="endDate" placeholder="end" value={newEvent.endDate} onChange={handleClickChangeInput}/>
                            </div>
        
                            <input type="hidden" name="empSchNo" />
                        </div>
                            
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning replySave" onClick={handleSaveEvent}>Save</button>
                        </div>
                    </div>
                </div>
            </div>     
        </>
    )
}
export default RegisterComponent;