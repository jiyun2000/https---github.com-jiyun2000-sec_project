import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { delOne, getOne, putOne } from "../../api/bookingApi";

const initState = {
    bookNo : 0 ,
    bookDate : '',
    start : '',
    end : '',
    roomNo : 0,
    empNo : 0
}

const BookingModifyComponent = ({bookNo}) => {
    const [booking, setBooking] = useState({...initState});

    const {moveToList, moveToRead} = useCustomMove();

    useEffect(()=>{
        getOne(bookNo).then(data=>setBooking(data));
    },[bookNo]);

    const handleClickDelete = () => {
        delOne(bookNo).then(()=>moveToList());
    }

    const handleClickModify = () => {
        putOne(bookNo,booking).then(()=>moveToRead(bookNo));
    }

    const handleChangeBooking = (evt) => {
        
        booking[evt.target.name] = evt.target.value;
        setBooking({...booking});
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="w-1/5 p-6 text-right font-bold">BookNo</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{booking.bookNo}</div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">BookingDate</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="bookDate"
                    type={'date'} 
                    value={booking.bookDate}
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Start</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="start"
                    type={'time'} 
                    value={booking.start}
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">End</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="end"
                    type={'time'} 
                    value={booking.end} 
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">RoomNo</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="roomNo"
                    type={'number'} 
                    value={booking.roomNo} 
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">EmpNo</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="empNo"
                    type={'number'} 
                    value={booking.empNo} 
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={handleClickModify}>
                    Modify
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={handleClickDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default BookingModifyComponent;