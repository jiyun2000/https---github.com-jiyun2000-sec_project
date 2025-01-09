import { useParams } from "react-router-dom";
import ModEmpScheduleComponent from "../../components/scheduleComponent/ModEmpScheduleComponent";


const ModEmpSChedulePage = () => {
    const { empNo, empSchNo} = useParams();

    return (
        <>
            <ModEmpScheduleComponent  empNo={empNo} empSchNo={empSchNo}/>
        </>
    )
}
export default ModEmpSChedulePage;