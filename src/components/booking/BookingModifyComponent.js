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
        <div className="flex flex-row justify-center">
        <div className="shadow-2xl mt-10 m-2 p-4">
            <h2 className="text-center font-semibold text-3xl">{booking.roomNo} 호 예약 수정 </h2>
            <div className="flex mt-10 justify-center">
                <div className="p-6 font-bold">예약번호</div>
                <div className="p-6 rounded-md border border-solid shadow-md">{booking.bookNo}</div>
            </div>

            <div className="flex mt-10" justify-center>
                <div className="mb-4 flex w-full justify-center">
                    <div className="p-6 font-bold">예약 날짜</div>
                    <input className="p-6 rounded-md border border-solid shadow-md" 
                    name="bookDate"
                    type={'date'} 
                    value={booking.bookDate}
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex  mt-10 justify-center">
                <div className="mb-4 flex w-full justify-center">
                    <div className="p-6 font-bold">Start</div>
                    <input className="p-6 rounded-md border border-solid shadow-md" 
                    name="start"
                    type={'time'} 
                    value={booking.start}
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="mb-4 flex w-full justify-center">
                    <div className="p-6 font-bold">End</div>
                    <input className="p-6 rounded-md border border-solid shadow-md" 
                    name="end"
                    type={'time'} 
                    value={booking.end} 
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="mb-4 flex w-full justify-center">
                    <div className="p-6 font-bold">RoomNo</div>
                    <input className="p-6 rounded-md border border-solid shadow-md" 
                    name="roomNo"
                    type={'number'} 
                    value={booking.roomNo} 
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="mb-4 flex w-full justify-center">
                    <div className="p-6 font-bold">EmpNo</div>
                    <input className="p-6 rounded-md border border-solid shadow-md" 
                    name="empNo"
                    type={'number'} 
                    value={booking.empNo} 
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex p-4 justify-center">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={handleClickModify}>
                    수정
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={handleClickDelete}
                >
                    삭제
                </button>
            </div>
        </div>
        </div>
    )
}

export default BookingModifyComponent;