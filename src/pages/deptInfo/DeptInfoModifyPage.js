import { useParams } from "react-router-dom"
import DeptInfoModifyComponent from "../../components/deptInfo/DeptInfoModifyComponent";

const DeptInfoModifyPage = () => {
    const {deptNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                DeptInfo Modify {deptNo}
            </div>
            <DeptInfoModifyComponent deptNo = {deptNo}/>
        </div>
    )
}

export default DeptInfoModifyPage;