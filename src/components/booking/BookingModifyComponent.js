import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { delOne, getOne, putOne } from "../../api/bookingApi";
import { getList } from "../../api/roomListApi";

const initState = {
    bookNo : 0 ,
    bookDate : '',
    start : '',
    end : '',
    roomNo : 0,
    empNo : 0
}

const initStateRL = {
    roomNo : 0,
    roomName : '',
    location : ''
}

const BookingModifyComponent = ({bookNo}) => {
    const [booking, setBooking] = useState({...initState});

    const [roomList, setRoomList] = useState([initStateRL]);

    const {moveToList, moveToRead} = useCustomMove();

    useEffect(()=>{
        getList().then(res=>setRoomList(res));
    },[booking]);

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
        <div className="flex justify-center w-full">
        <div className="shadow-lg w-2/3 mt-10 m-2 p-4">
            <h2 className="text-center text-3xl font-semibold">예약</h2>
            <div className="flex justify-center mt-10 ">
            <div className="w-1/5 p-6 font-bold">예약날짜</div>
                <div className="relative mb-4 flex w-full flex-wrap items-center justify-center">
                    <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="bookDate"
                    type={'date'} 
                    value={booking.bookDate}
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center mt-10 ">
            <div className="w-1/5 p-6 font-bold">시작시간</div>
                <div className="relative mb-4 flex w-full flex-wrap items-center justify-center">
                    <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="start"
                    type={'time'} 
                    value={booking.start}
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center mt-10 ">
            <div className="w-1/5 p-6 font-bold">끝난시간</div>
                <div className="relative mb-4 flex w-full flex-wrap items-center justify-center">
                    <input className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="end"
                    type={'time'} 
                    value={booking.end} 
                    onChange={handleChangeBooking}></input>
                </div>
            </div>

            <div className="flex justify-center mt-10 ">
                    <div className="w-1/5 p-6 font-bold">방번호</div>
                    
                <div className="relative mb-4 flex w-full flex-wrap items-center justify-center">
                    <select className="w-full p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="roomNo"
                    type={'number'} 
                    value={booking.roomNo} 
                    onChange={handleChangeBooking}>
                        <option value={0}></option>
                        {roomList.map((res)=>{
                            return(
                                <option value={res.roomNo}>{res.roomName}</option>
                            )
                        })}
                    </select>
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