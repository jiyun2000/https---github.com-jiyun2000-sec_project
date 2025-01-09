import { useParams } from "react-router-dom";
import EmpDeptScheduleComponent from "../../components/scheduleComponent/EmpDeptScheduleComponent";


const EmpDeptSchedulePage = () => {
    const {empNo, deptNo} = useParams();

    return(
        <EmpDeptScheduleComponent empNo={empNo} deptNo={deptNo} />
    )  
}
export default EmpDeptSchedulePage;