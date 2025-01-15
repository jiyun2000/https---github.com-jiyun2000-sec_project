import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/deptInfoApi";

const initState = {
    deptNo : 0,
    deptName : '',
    deptAddress : '',
    phoneNo : ''
}

const DeptInfoAddComponent = () => {
    const [deptInfo, setDeptInfo] = useState({...initState});

    const {moveToList} = useCustomMove();

    const handleClickAdd = () => {
        addOne(deptInfo).then(()=>moveToList());
    }

    const handleChangeDeptInfo = (evt) => {
        deptInfo[evt.target.name] = evt.target.value;
        setDeptInfo({...deptInfo});
    }

    return (
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
        <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <div className="w-1/5 p-6 font-bold">부서번호</div>
                <input className="w-4/5 p-6 rounded-md border border-blue-300" 
                    name="deptNo"
                    type={'number'} 
                    value={deptInfo.deptInfoNo}
                    onChange={handleChangeDeptInfo}
                    placeholder="GA(100) | HR(200) | ACC(300)"
                    ></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">부서명</div>
                    <input className="w-4/5 p-6 rounded-md border border-blue-300" 
                    name="deptName"
                    type={'text'} 
                    value={deptInfo.deptName} 
                    onChange={handleChangeDeptInfo}
                    placeholder="GA | HR | ACC"
                    ></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-left font-bold">부서 주소</div>
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
                    onChange={handleChangeDeptInfo}
                    ></input>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-sky-400 hover:text-white hover:bg-blue-500 cursor-pointer"
                onClick={handleClickAdd}>
                    추가하기
                </button>
            </div>
        </div>
    )
}

export default DeptInfoAddComponent;