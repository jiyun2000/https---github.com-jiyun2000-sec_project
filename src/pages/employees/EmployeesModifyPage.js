import { useParams } from "react-router-dom"
import EmployeesModifyComponent from "../../components/employees/EmployeesModifyComponent";

const EmployeesModifyPage = () => {
    const {empNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            
            <EmployeesModifyComponent empNo = {empNo}/>
        </div>
    )
}

export default EmployeesModifyPage;