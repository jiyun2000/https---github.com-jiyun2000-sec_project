import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getBookList, getOne } from "../../api/roomListApi";
import { useParams } from "react-router-dom";
import RoomListPageComponent from "../common/RoomListPageComponent";

const initState = {
    roomNo : 0,
    roomName : '',
    location : ''
}

const initStateBooking = {
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

const RoomListReadComponent = ({roomNo})=>{
    const [roomList, setRoomList] = useState(initState);
    const [booking, setBooking] = useState(initStateBooking);

    const {page, size, moveToRoomList, moveToList, moveToModify} = useCustomMove();

    useEffect(()=>{
        getOne(roomNo).then(res => {
            setRoomList(res);
        });
    },[page]);

    useEffect(() => {
        getBookList(roomNo,[page,size]).then(res => {
            setBooking(res);
        })
    },[page]);

    return <>
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Room No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{roomList.roomNo}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">RoomName</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{roomList.roomName}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Location</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{roomList.location}</div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={()=>moveToModify(roomNo)}>
                    Modify
                </button>

                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={moveToList}>
                    List
                </button>
            </div>
        </div>

        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className='flex flex-wrap mx-auto p-6'>
                {booking.dtoList.map((res)=>{
                    return(
                    <div 
                    key = {res.bookNo} 
                    className='flex w-full min-w-[400px] p-2 m-2 rounded shadow-md' 
                    >
                        <div className="w-1/5 p-6 text-right font-bold">BookNo</div>
                        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{res.bookNo}</div>

                        <div className="w-1/5 p-6 text-right font-bold">Date</div>
                        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{res.bookDate}</div>

                        <div className="w-1/5 p-6 text-right font-bold">Start</div>
                        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{res.start}</div>

                        <div className="w-1/5 p-6 text-right font-bold">End</div>
                        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{res.end}</div>
                    </div>)
                })}
            </div>

            <div>
                <RoomListPageComponent
                serverData={booking} 
                roomList={roomList}
                movePage={moveToRoomList}
                 />
            </div>
        </div>
    </>
}

export default RoomListReadComponent;