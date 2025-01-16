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
    <div className="flex flex-col items-center">
        <div className="shadow-xl mt-10 m-2 p-4 w-2/3 flex flex-col items-center ">
            <h2 className="text-center text-3xl font-semibold">예약 상세 페이지</h2>
            <div className="flex  mt-10">
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className=" p-6 font-bold">예약번호</div>
                    <div className="p-6 rounded-r border border-solid shadow-md">{booking.bookNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="p-6 font-bold">예약 날짜/</div>
                    <div className="p-6 rounded-r border border-solid shadow-md">{booking.bookDate}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="p-6 font-bold">시작 시간</div>
                    <div className="p-6 rounded-r border border-solid shadow-md">{booking.start}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="p-6 font-bold">끝난 시간</div>
                    <div className="p-6 rounded-r border border-solid shadow-md">{booking.end}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="p-6 font-bold">방 번호</div>
                    <div className="p-6 rounded-r border border-solid shadow-md">{booking.roomNo}</div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="p-6 font-bold">사원 번호</div>
                    <div className="p-6 rounded-r border border-solid shadow-md">{booking.empNo}</div>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={()=>moveToModify(bookNo)}>
                    수정
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={moveToList}>
                    리스트
                </button>
            </div>
        </div>
        </div>
    </>
}

export default BookingReadComponent;