import { useParams } from "react-router-dom";
import DayOffAddComponent from "../../components/dayOff/DayOffAddComponent"

const DayOffAddPage = () => {
    const {empNo} = useParams();

    return (
        <div>
            <DayOffAddComponent empNo = {empNo}/>
        </div>
    )
}

export default DayOffAddPage;