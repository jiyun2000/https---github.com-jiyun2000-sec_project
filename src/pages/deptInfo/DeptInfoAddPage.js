import DeptInfoAddComponent from "../../components/deptInfo/DeptInfoAddComponent"

const DeptInfoAddPage = () => {
    return (
        <div className="p-4 w-full bg-white ">
            <div className="text-3xl font-extrabold flex flex-col items-center pt-3">
                부서 등록하기
            </div>

            <DeptInfoAddComponent/>
        </div>
    )
}

export default DeptInfoAddPage;