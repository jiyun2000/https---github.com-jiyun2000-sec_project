import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { delOne, getOne, putOne } from "../../api/deptInfoApi";

const initState = {
    deptNo : 0,
    deptName : '',
    deptAddress : '',
    phoneNo : ''
}
const DeptInfoModifyComponent = ({deptNo}) => {
    const [deptInfo, setDeptInfo] = useState({...initState});

    const {moveToList, moveToRead} = useCustomMove();

    useEffect(()=>{
        getOne(deptNo).then(data=>setDeptInfo(data));
    },[deptNo]);

    const handleClickDelete = () => {
        delOne(deptNo).then(()=>moveToList());
    }

    const handleClickModify = () => {
        putOne(deptNo,deptInfo).then(()=>moveToRead(deptNo));
    }

    const handleChangeDeptInfo = (evt) => {
        deptInfo[evt.target.name] = evt.target.value;
        setDeptInfo({...deptInfo});
    }

    return (
        <>
        <h1 className="text-center mt-10 font-bold text-3xl">{deptInfo.deptName} 부서 수정하기 </h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">부서 번호</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-300">{deptInfo.deptNo}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">부서 이름</div>
                    <input className="w-4/5 p-6 rounded-md border border-blue-300" 
                    name="deptName"
                    type={'text'} 
                    value={deptInfo.deptName} 
                    onChange={handleChangeDeptInfo}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">부서 주소</div>
                    <input className="w-4/5 p-6 rounded-md border border-blue-300" 
                    name="deptAddress"
                    type={'text'} 
                    value={deptInfo.deptAddress} 
                    onChange={handleChangeDeptInfo}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">대표 번호</div>
                    <input className="w-4/5 p-6 rounded-md border border-blue-300" 
                    name="phoneNo"
                    type={'text'} 
                    value={deptInfo.phoneNo} 
                    onChange={handleChangeDeptInfo}></input>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-sky-400 hover:text-white hover:bg-blue-500 cursor-pointer"
                onClick={handleClickModify}>
                    수정
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-blue-400 hover:text-white hover:bg-sky-500 cursor-pointer"
                onClick={handleClickDelete}
                >
                    삭제
                </button>
            </div>
        </div>
        </>
    )
}

export default DeptInfoModifyComponent;