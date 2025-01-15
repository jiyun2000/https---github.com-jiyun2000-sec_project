import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getALOne } from "../../api/annualLeaveApi";
import { useParams } from "react-router-dom";

const initState = {
    annualId : 0 ,
    empNo : 0,
    antecedent : 0,
    hours : 0
}

const AnnualLeaveReadComponent = ({empNo})=>{
    const [annualLeave, setAnnualLeave] = useState(initState);
    let cnt = 0;

    const {page,moveToList, moveToModify, moveToRead} = useCustomMove();

    useEffect(()=>{
        getALOne(empNo).then(res => {
            setAnnualLeave(res);
        });
    },[cnt]);

    return <>
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Annual Id</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{annualLeave.annualId}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Emp No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{annualLeave.empNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">연차</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{annualLeave.antecedent}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">남은 시간</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{annualLeave.hours}</div>
                </div>
            </div>

            <div className="flex justify-end p-4">

                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-40 text-white bg-black"
                onClick={()=>moveToRead(empNo)}>
                    Employee
                </button>

                {/* <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={()=>moveToModify(empNo)}>
                    Modify
                </button> */}

                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={()=>moveToList({page})}>
                    List
                </button>
            </div>
        </div>
    </>
}

export default AnnualLeaveReadComponent;