import DeptInfoAddComponent from "../../components/deptInfo/DeptInfoAddComponent"

const DeptInfoAddPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                부서 등록 페이지
            </div>

            <DeptInfoAddComponent/>
        </div>
    )
}

export default DeptInfoAddPage;