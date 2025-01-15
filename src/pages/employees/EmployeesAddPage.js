import EmployeesAddComponent from "../../components/employees/EmployeesAddComponent"

const EmployeesAddPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                직원 등록 페이지
            </div>

            <EmployeesAddComponent/>
        </div>
    )
}

export default EmployeesAddPage;