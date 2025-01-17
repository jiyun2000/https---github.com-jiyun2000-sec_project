import { useParams } from "react-router-dom"
import DeptInfoModifyComponent from "../../components/deptInfo/DeptInfoModifyComponent";

const DeptInfoModifyPage = () => {
    const {deptNo} = useParams();
    return (
        <div>
            <DeptInfoModifyComponent deptNo = {deptNo}/>
        </div>
    )
}

export default DeptInfoModifyPage;