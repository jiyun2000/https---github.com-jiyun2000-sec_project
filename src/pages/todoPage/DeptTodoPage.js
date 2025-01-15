import DeptTodoComponent from "../../components/todoComponent/DeptTodoComponent"

const DeptTodoPage = ({empNo, deptNo, selectDate}) => {

    return (
        <>
            <DeptTodoComponent empNo={empNo} deptNo={deptNo} selectDate={selectDate}/>
        </>
    )
}
export default DeptTodoPage;