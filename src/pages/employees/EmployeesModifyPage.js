import { useParams } from "react-router-dom"
import EmployeesModifyComponent from "../../components/employees/EmployeesModifyComponent";

const EmployeesModifyPage = () => {
    const {empNo} = useParams();
    return (
        <div>
            <EmployeesModifyComponent empNo = {empNo}/>
        </div>
    )
}

export default EmployeesModifyPage;