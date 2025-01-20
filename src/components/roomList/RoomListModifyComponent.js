import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { delOne, getOne, getOneRoom, putOne } from "../../api/roomListApi";

const initState = {
    roomNo : 0,
    roomName : '',
    location : ''
}

const RoomListModifyComponent = ({roomNo}) => {
    const [roomList, setRoomList] = useState({...initState});

    const {moveToList, moveToRead} = useCustomMove();

    useEffect(()=>{
        getOneRoom(roomNo).then(data=>setRoomList(data));
    },[roomNo]);

    const handleClickDelete = () => {
        delOne(roomNo).then(()=>moveToList());
    }

    const handleClickModify = () => {
        putOne(roomNo,roomList).then(()=>moveToRead(roomNo));
    }

    const handleChangeRoomList = (evt) => {
        roomList[evt.target.name] = evt.target.value;
        setRoomList({...roomList});
    }

    return (
        <>
        <h1 className="text-center mt-8 text-3xl">{roomList.roomName} 수정하기</h1>
        <div className="border-2 border-blue-300 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">회의실(화장실) 번호</div>
                    <div className="w-4/5 p-6 rounded-md border border-blue-300 ">{roomList.roomNo}</div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">회의실(화장실) 이름</div>
                    <input className="w-4/5 p-6  rounded-md border border-blue-300" 
                    name="roomName"
                    type={'text'} 
                    value={roomList.roomName} 
                    onChange={handleChangeRoomList}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 font-bold">회의실(화장실) 주소</div>
                    <input className="w-4/5 p-6  rounded-md border border-blue-300" 
                    name="location"
                    type={'text'} 
                    value={roomList.location} 
                    onChange={handleChangeRoomList}></input>
                </div>
            </div>

            <div className="flex justify-center p-4">
                <button type="button"
                 className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-sky-400 hover:text-white hover:bg-blue-500 cursor-pointer"
                onClick={handleClickModify}>
                    수정
                </button>

                <button type="button"
                 className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-blue-400 hover:text-white hover:bg-sky-500 cursor-pointer"
                onClick={handleClickDelete}
                >
                    삭제
                </button>
            </div>
        </div>
        </>
    )
}

export default RoomListModifyComponent;