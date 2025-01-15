import { useParams } from "react-router-dom"
import CommuteModifyComponent from "../../components/employees/CommuteModifyComponent";

const CommuteModifyPage = () => {
    const {commNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Commute Modify {commNo}
            </div>
            <CommuteModifyComponent commNo = {commNo}/>
        </div>
    )
}

export default CommuteModifyPage;