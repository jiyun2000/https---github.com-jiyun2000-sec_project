import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getBookList, getOne, getOneRoom } from "../../api/roomListApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import RoomListPageComponent from "../common/RoomListPageComponent";
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';
import BoardTitleComponent from "../board/BoardTitleComponent";
import { getCookie, removeCookie } from "../../util/cookieUtil";
import colorChat from "../../assets/icon/colorChat.png";

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
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const navigate = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    const {page, size, moveToRoomList, moveToList, moveToModify} = useCustomMove();

    useEffect(()=>{
        getOneRoom(roomNo).then(res => {
            setRoomList(res);
        });
    },[page]);

    useEffect(() => {
        getBookList(roomNo,[page,size]).then(res => {
            setBooking(res);
        })
    },[page]);

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

const checkRemove = () => {
    removeCookie("alert");
  }

    return <>
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
          <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
          {chatCntCook  ? 
              <img src={colorChat} alt='colorChat' className='w-full' /> :
              <img src={chat} alt="Chat" className="w-full" />
          }
          </Link>
        </div>
      </div>

    <h1 className="text-center mt-8 text-3xl">{roomList.roomName} 안내</h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4 ">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">회의실 번호</div>
                    <div className="w-2/3 p-6 rounded-md border border-blue-300">{roomList.roomNo}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">회의실 이름</div>
                    <div className="w-2/3 p-6 rounded-md border border-blue-300">{roomList.roomName}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">회의실 위치</div>
                    <div className="w-2/3 p-6 rounded-md border border-blue-300">{roomList.location}</div>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button" 
                 className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#8ba7cd]  hover:bg-[#6f8cb4] cursor-pointer"
                onClick={()=>moveToModify(roomNo)}>
                    수정
                </button>

                <button type="button"
                className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-[#8ba7cd]  hover:bg-[#6f8cb4] cursor-pointer"
                onClick={moveToList}>
                    리스트
                </button>
            </div>
        </div>

        <h1 className="text-center mt-8 text-3xl">{roomList.roomName} 예약 목록</h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
            <div className='flex flex-wrap mx-auto p-6'>
                {booking.dtoList.map((res)=>{
                    return(
                    <div 
                    key = {res.bookNo} 
                    className='flex w-full min-w-[400px] p-2 m-2 rounded-md border border-blue-300' 
                    >
                        <div className="w-1/5 p-6 font-bold">날짜</div>
                        <div className="w-4/5 p-6 rounded-md border border-blue-300">{res.bookDate}</div>

                        <div className="w-1/5 p-6 font-bold">시작 시간</div>
                        <div className="w-4/5 p-6 rounded-md border border-blue-300">{res.start}</div>

                        <div className="w-1/5 p-6 font-bold">끝난 시간</div>
                        <div className="w-4/5 p-6 rounded-md border border-blue-300">{res.end}</div>
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
    </div>
    </>
}

export default RoomListReadComponent;