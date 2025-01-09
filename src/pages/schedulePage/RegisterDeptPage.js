import { useParams } from "react-router-dom";
import RegisterDeptComponent from "../../components/scheduleComponent/RegisterDeptComponent";


const RegisterDeptPage = () => {
    const {deptNo, empNo} = useParams();

    return(
        <RegisterDeptComponent deptNo={deptNo} empNo={empNo}/>
    )   
}
export default RegisterDeptPage;