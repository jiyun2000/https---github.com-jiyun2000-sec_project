import { useParams } from "react-router-dom"
import CommuteModifyComponent from "../../components/employees/CommuteModifyComponent";

const CommuteModifyPage = () => {
    const {commNo} = useParams();
    return (
        <div>
             <CommuteModifyComponent commNo = {commNo}/>
        </div>
    )
}

export default CommuteModifyPage;