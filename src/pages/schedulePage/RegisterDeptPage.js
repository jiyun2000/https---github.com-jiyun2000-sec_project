import { useParams } from "react-router-dom";
import RegisterDeptComponent from "../../components/scheduleComponent/RegisterDeptComponent";


const RegisterDeptPage = ({deptNo, empNo}) => {

    return(
        <RegisterDeptComponent deptNo={deptNo} empNo={empNo}/>
    )   
}
export default RegisterDeptPage;