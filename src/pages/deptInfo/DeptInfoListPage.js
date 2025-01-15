import { useEffect, useState } from "react";
import DeptInfoListComponent from "../../components/deptInfo/DeptInfoListComponent";
import { getList } from "../../api/deptInfoApi";


const DeptInfoListPage = () => {
    const [deptInfoList,setDeptInfoList] = useState();
    useEffect(()=>{
        getList().then(res =>{
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