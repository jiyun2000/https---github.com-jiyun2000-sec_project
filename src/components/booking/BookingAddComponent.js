import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/bookingApi";
import { getCookie } from "../../util/cookieUtil";
import { getList } from "../../api/roomListApi";
import { Link, useNavigate } from "react-router-dom";
import chat from "../../assets/icon/chat.png";
import mail from "../../assets/icon/mail.png";
import BoardTitleComponent from "../board/BoardTitleComponent";


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

const BookingAddComponent = () => {
    const [booking, setBooking] = useState({...initState});

    const [roomList, setRoomList] = useState([initStateRL]);
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);

    const navigate = useNavigate();

    const {moveToList} = useCustomMove();

    useEffect(()=>{
        getList().then(res=>setRoomList(res));
    },[booking]);

    const handleClickAdd = () => {
        booking["empNo"] = getCookie("member").empNo;
        addOne(booking).then(()=>{
            alert("등록되었습니다.");
            moveToList();
        });
    }

    const handleChangeBooking = (evt) => {
        booking[evt.target.name] = evt.target.value;
        setBooking({...booking});
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    return (
        <div>
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
            <div className="flex items-center space-x-8">
                <div className="text-2xl font-semibold text-blue-800 select-none cursor-pointer" onClick={goToBoardList}>
                [공지사항]
                </div>
                <div className="w-64 text-2xl font-semibold cursor-pointer">
                <BoardTitleComponent />
                </div>
            </div>
            <div className="flex space-x-4">
                <Link to="/mail" className="w-12 cursor-pointer">
                <img src={mail} alt="Mail" className="w-full" />
                </Link>
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                <img src={chat} alt="Chat" className="w-full" />
                </Link>
            </div>
        </div>

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

            <div className="flex justify-center p-4">
                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#95bce8] hover:text-white hover:bg-[#8daad8] cursor-pointer"
                onClick={handleClickAdd}>
                    추가
                </button>
            </div>
        </div>
        </div>
    </div>
    )
}

export default BookingAddComponent;