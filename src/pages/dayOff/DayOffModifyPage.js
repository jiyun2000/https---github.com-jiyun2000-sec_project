import { useParams } from "react-router-dom"
import DayOffModifyComponent from "../../components/dayOff/DayOffModifyComponent";

const DayOffModifyPage = () => {
    const {dayOffNo} = useParams();
    return (
        <div>
            <DayOffModifyComponent dayOffNo = {dayOffNo}/>
        </div>
    )
}

export default DayOffModifyPage;