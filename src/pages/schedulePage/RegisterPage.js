import { useParams } from "react-router-dom";
import RegisterComponent from "../../components/scheduleComponent/RegisterComponent";


const RegisterPage = () => {
        const {empNo} = useParams();
        return (
            <RegisterComponent empNo={empNo}/>
        )
}
export default RegisterPage;