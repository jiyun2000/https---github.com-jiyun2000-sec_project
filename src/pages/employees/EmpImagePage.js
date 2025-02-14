import { useParams } from "react-router-dom";
import EmpImageComponent from "../../components/employees/EmpImageComponent"

const EmpImagePage = () => {
    const {empNo} = useParams();

    console.log("page empNo => " + empNo); //잘받음
    
    return(
        <>
            <EmpImageComponent empNo={empNo}/>
        </>
    )
}
export default EmpImagePage;