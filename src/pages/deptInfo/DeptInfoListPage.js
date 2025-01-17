import { useEffect, useState } from "react";
import DeptInfoListComponent from "../../components/deptInfo/DeptInfoListComponent";
import { getDeptList } from "../../api/deptInfoApi";


const DeptInfoListPage = () => {
    const [deptInfoList,setDeptInfoList] = useState();
    useEffect(()=>{
        getDeptList().then(res =>{
            setDeptInfoList(res);
        })
    },[]);

    return (
        <div>
            <DeptInfoListComponent deptInfo = {deptInfoList}/>
        </div>
    )
}

export default DeptInfoListPage;