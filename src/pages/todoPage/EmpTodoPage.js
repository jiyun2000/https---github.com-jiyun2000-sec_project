import { useParams } from "react-router-dom";
import EmpTodoComponent from "../../components/todoComponent/EmpTodoComponent";

const EmpTodoPage = () => {
    const {empNo, selectDate} = useParams();

    return (
        <>
            <EmpTodoComponent empNo={empNo} selectDate={selectDate}/>
        </>
    )
}
export default EmpTodoPage;