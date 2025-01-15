import { useParams } from "react-router-dom"
import DayOffModifyComponent from "../../components/dayOff/DayOffModifyComponent";

const DayOffModifyPage = () => {
    const {dayOffNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                DayOff Modify {dayOffNo}
            </div>
            <DayOffModifyComponent dayOffNo = {dayOffNo}/>
        </div>
    )
}

export default DayOffModifyPage;