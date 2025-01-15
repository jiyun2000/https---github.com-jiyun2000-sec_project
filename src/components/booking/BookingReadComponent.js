import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getBookList, getOne } from "../../api/bookingApi";
import { useParams } from "react-router-dom";

const initState = {
    bookNo : 0 ,
    bookDate : '',
    start : '',
    end : '',
    roomNo : 0,
    empNo : 0
}

const BookingReadComponent = ({bookNo})=>{
    const [booking, setBooking] = useState(initState);
    let cnt = 0;

    const {moveToList, moveToModify} = useCustomMove();

    useEffect(()=>{
        getOne(bookNo).then(res => {
            setBooking(res);
        });
    },[cnt]);

    return <>
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Book No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{booking.bookNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Date</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{booking.bookDate}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Start</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{booking.start}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">End</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{booking.end}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Room No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{booking.roomNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Emp No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{booking.empNo}</div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
                onClick={()=>moveToModify(bookNo)}>
                    Modify
                </button>

                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={moveToList}>
                    List
                </button>
            </div>
        </div>
    </>
}

export default BookingReadComponent;