import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getBookList, getOne } from "../../api/bookingApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getList, getOneRoom } from "../../api/roomListApi";
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import colorChat from "../../assets/icon/colorChat.png";

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

const BookingReadComponent = ({bookNo})=>{
    const [booking, setBooking] = useState(initState);
    let cnt = 0;

    const [roomList, setRoomList] = useState(initStateRL);

    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    
    const [deptNo, setDeptNo] = useState(getCookie("member").deptNo);
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    const navigate = useNavigate();

    useEffect(()=>{
        if(booking!==initState){
            getOneRoom(booking.roomNo).then(res=>setRoomList(res));
        }
    },[booking]);

    const {moveToList, moveToModify} = useCustomMove();

    useEffect(()=>{
        getOne(bookNo).then(res => {
            setBooking(res);
        });
    },[cnt]);

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    const checkRemove = () => {
    removeCookie("alert");
    }

    return <>
    <div>
    <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
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
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                {chatCntCook ? 
                    <img src={colorChat} alt='colorChat' className='w-full' /> :
                    <img src={chat} alt="Chat" className="w-full" />
                }
                </Link>
            </div>
        </div>

    <div className="flex flex-col items-center">
        <div className="shadow-xl mt-10 m-2 p-4 w-2/3 flex flex-col items-center ">
            <h2 className="text-center text-3xl font-semibold">예약 상세 페이지</h2>
            <div className="w-full flex  mt-10">
            <div className="w-1/5 p-6 font-bold">예약번호</div>
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="w-full p-6 rounded-r border border-solid shadow-md">{booking.bookNo}</div>
                </div>
            </div>

            <div className="w-full flex justify-center mt-10">
            <div className="w-1/5 p-6 font-bold">예약 날짜</div>
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="w-full p-6 rounded-r border border-solid shadow-md">{booking.bookDate}</div>
                </div>
            </div>

            <div className="w-full flex justify-center mt-10">
            <div className="w-1/5 p-6 font-bold">시작 시간</div>
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="w-full p-6 rounded-r border border-solid shadow-md">{booking.start}</div>
                </div>
            </div>

            <div className="w-full flex justify-center mt-10">
            <div className="w-1/5 p-6 font-bold">끝난 시간</div>
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="w-full p-6 rounded-r border border-solid shadow-md">{booking.end}</div>
                </div>
            </div>

            <div className="w-full flex justify-center mt-10">
            <div className="w-1/5 p-6 font-bold">예약된 방</div>
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="w-full p-6 rounded-r border border-solid shadow-md">{roomList.roomName}</div>
                </div>
            </div>

            <div className="w-full flex justify-center mt-10">
            <div className="w-1/5 p-6 font-bold">위치</div>
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="w-full p-6 rounded-r border border-solid shadow-md">{roomList.location}</div>
                </div>
            </div>

            <div className="w-full flex justify-center mt-10">
            <div className="w-1/5 p-6 font-bold">예약자</div>
                <div className="relative mb-4 flex w-full flex-row items-stretch">
                    <div className="w-full p-6 rounded-r border border-solid shadow-md">{booking.empNo}</div>
                </div>
            </div>

            <div className="w-full flex justify-center p-4">
                {deptNo===1||empNo===booking.empNo?<button type="button" 
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#8ba7cd]  hover:bg-[#6f8cb4] cursor-pointer"
                onClick={()=>moveToModify(bookNo)}>
                    수정
                </button>:<></>}
                

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#8ba7cd]  hover:bg-[#6f8cb4] cursor-pointer"
                onClick={moveToList}>
                    리스트
                </button>
            </div>
        </div>
        </div>
    </div>
    </>
}

export default BookingReadComponent;