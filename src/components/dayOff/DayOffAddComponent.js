import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/dayOffApi";

const initState = {
    dayOffNo : 0 ,
    dayOffDate : '',
    offHours : 0,
    empNo : 0
}

const DayOffAddComponent = () => {
    const [dayOff, setDayOff] = useState({...initState});

    const {moveToList} = useCustomMove();

    const handleClickAdd = () => {
        addOne(dayOff).then(()=>moveToList());
    }

    const handleChangeDayOff = (evt) => {
        dayOff[evt.target.name] = evt.target.value;
        setDayOff({...dayOff});
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DayOffDate</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="dayOffDate"
                    type={'date'} 
                    value={dayOff.dayOffDate}
                    onChange={handleChangeDayOff}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">OffHours</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="offHours"
                    type={'number'} 
                    value={dayOff.offHours} 
                    onChange={handleChangeDayOff}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">EmpNo</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="empNo"
                    type={'number'} 
                    value={dayOff.empNo} 
                    onChange={handleChangeDayOff}></input>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={handleClickAdd}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default DayOffAddComponent;