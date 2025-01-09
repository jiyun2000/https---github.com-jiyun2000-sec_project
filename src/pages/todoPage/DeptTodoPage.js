import DeptTodoComponent from "../../components/todoComponent/DeptTodoComponent"
import { useParams } from "react-router-dom"

const DeptTodoPage = () => {
    const {empNo, deptNo, selectDate} = useParams();

    return (
        <>
            <DeptTodoComponent empNo={empNo} deptNo={deptNo} selectDate={selectDate}/>
        </>
    )
}
export default DeptTodoPage;