import { useParams } from "react-router-dom";
import ModDeptScheduleComponent from "../../components/scheduleComponent/ModDeptScheduleComponent";


const ModDeptSchedulePage = () => {
    const {deptNo, deptSchNo, empNo} = useParams();
    
    return (
        <ModDeptScheduleComponent deptNo={deptNo} empNo={empNo} deptSchNo={deptSchNo} />
    )
}
export default ModDeptSchedulePage;