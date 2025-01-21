import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/roomListApi";
import { getCookie } from "../../util/cookieUtil";
import { Link, useNavigate } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';

const initState = {
    roomNo : 0,
    roomName : '',
    location : ''
}

const RoomListAddComponent = () => {
    const [roomList, setRoomList] = useState({...initState});
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const navigate = useNavigate();
    const {moveToList} = useCustomMove();

    const handleClickAdd = () => {
        addOne(roomList).then(()=>moveToList());
    }

    const handleChangeRoomList = (evt) => {
        roomList[evt.target.name] = evt.target.value;
        setRoomList({...roomList});
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    return (
        <>
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
                <Link  to="/mail" className="w-12 cursor-pointer">
                    <img src={mail} alt="Mail" className="w-full" />
                </Link>
                <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                    <img src={chat} alt="Chat" className="w-full" />
                </Link>
            </div>
        </div>

        <h1 className="text-center mt-8 text-3xl">회의실(화장실) 추가하기</h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">회의실(화장실) 번호</div>
                    <input className="w-2/3 p-6 rounded-md border border-blue-300 "  
                    name="roomNo"
                    type={'number'} 
                    value={roomList.roomNo}
                    onChange={handleChangeRoomList}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">회의실(화장실) 이름</div>
                    <input className="w-2/3 p-6 rounded-md border border-blue-300" 
                    name="roomName"
                    type={'text'} 
                    value={roomList.roomName} 
                    onChange={handleChangeRoomList}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">회의실(화장실) 위치</div>
                    <input className="w-2/3 p-6 rounded-md border border-blue-300" 
                    name="location"
                    type={'text'} 
                    value={roomList.location} 
                    onChange={handleChangeRoomList}></input>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                 className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-sky-400 hover:text-white hover:bg-blue-500 cursor-pointer"
                onClick={handleClickAdd}>
                    추가하기
                </button>
            </div>
        </div>
        </div>
        </>
    )
}

export default RoomListAddComponent;