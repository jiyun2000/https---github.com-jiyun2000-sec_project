import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getOneCommute, putOne } from "../../api/commuteApi";

const initState = {
    commNo : 0 ,
    checkDate : '',
    checkInTime : '',
    checkOutTime : '',
    empNo : 0
}

const CommuteModifyComponent = ({commNo}) => {
    const [commute, setCommute] = useState({...initState});

    const {moveToCommuteList} = useCustomMove();

    useEffect(()=>{
        getOneCommute(commNo).then(data=>{
            setCommute(data);
        });
    },[commNo]);

    const handleClickModify = () => {
        putOne(commute.empNo,commute).then(()=>{
            moveToCommuteList(commute);
        }
        );
    }

    const handleChangeCommute = (evt) => {
        
        commute[evt.target.name] = evt.target.value;
        setCommute({...commute});
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10 mb-4">
                <div className="w-1/5 p-6 text-right font-bold">CommuteNo</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{commute.commNo}</div>
            </div>

            <div className="flex justify-center mb-4">
                <div className="w-1/5 p-6 text-right font-bold">EmpNo</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{commute.empNo}</div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Date</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="checkDate"
                    type={'date'} 
                    value={commute.checkDate}
                    onChange={handleChangeCommute}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Check In</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="checkInTime"
                    type={'time'} 
                    value={commute.checkInTime}
                    onChange={handleChangeCommute}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Check Out</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="checkOutTime"
                    type={'time'} 
                    value={commute.checkOutTime}
                    onChange={handleChangeCommute}></input>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={handleClickModify}>
                    Modify
                </button>
            </div>
        </div>
    )
}

export default CommuteModifyComponent;