import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getCommuteList, putCheckOut, setCheckIn } from "../../api/commuteApi";
import { useParams } from "react-router-dom";
import CommutePageComponent from "../common/CommutePageComponent";

const initState = {
    dtoList : [],
    pageNumList : [],
    pageRequestDTO : null,
    prev : false,
    next : false,
    totalCount : 0,
    prevPage : 0,
    nextPage : 0,
    totalPage : 0,
    current : 0
}

const CommuteListComponent = ({empNo})=>{
    const [commute, setCommute] = useState(initState);

    const {page,size, moveToList,moveToCommuteList,moveToRead,moveToModifyCommute} = useCustomMove();

    useEffect(() => {
        getCommuteList(empNo,[page,size]).then(res => {
            console.log(res);
            setCommute(res);
        })
    },[page]);

    const handleCheckIn = () =>{
        setCheckIn(empNo).then(()=>moveToCommuteList({empNo}))
        .catch(() => moveToRead(empNo));
    }

    const handleCheckOut = () =>{
        putCheckOut(empNo).then(()=>moveToCommuteList({empNo}))
        .catch(() => moveToRead(empNo));
    }

    return <>
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className='flex flex-wrap mx-auto p-6'>
                {commute.dtoList.map((data)=>{
                    return(
                    <div 
                    key = {data.checkDate} 
                    className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md'
                    >
                        <div className="text-2xl justify-center w-full p-2 rounded shadow-md">
                            {data.checkDate} / {data.checkInTime} / {data.checkOutTime}
                        </div>
                        <div className="flex justify-end p-4">
                            <button type="button" 
                            className="inline-block rounded p-4 m-2 text-xl w-40 text-white bg-gray-400"
                            onClick={()=>moveToModifyCommute(data.commNo)}>
                                Modify
                            </button>
                        </div>
                    </div>)
                })}
            </div>

            <CommutePageComponent
                serverData={commute} 
                empNo = {empNo}
                movePage={moveToCommuteList}
                />
            </div>

            <div className="flex justify-end p-4">

                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-40 text-white bg-gray-400"
                onClick={()=>handleCheckIn()}>
                    Check In
                </button>
                
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-40 text-black bg-gray-200"
                onClick={()=>handleCheckOut()}>
                    Check Out
                </button>

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
    </>
}

export default CommuteListComponent;