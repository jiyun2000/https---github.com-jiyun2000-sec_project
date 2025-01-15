import EmpTodoComponent from "../../components/todoComponent/EmpTodoComponent";

const EmpTodoPage = ({empNo, selectDate}) => {


    return (
        <>
            <EmpTodoComponent empNo={empNo} selectDate={selectDate}/>
        </>
    )
}
export default EmpTodoPage;