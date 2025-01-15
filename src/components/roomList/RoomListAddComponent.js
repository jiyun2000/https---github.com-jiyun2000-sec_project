import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { addOne } from "../../api/roomListApi";

const initState = {
    roomNo : 0,
    roomName : '',
    location : ''
}

const RoomListAddComponent = () => {
    const [roomList, setRoomList] = useState({...initState});

    const {moveToList} = useCustomMove();

    const handleClickAdd = () => {
        addOne(roomList).then(()=>moveToList());
    }

    const handleChangeRoomList = (evt) => {
        roomList[evt.target.name] = evt.target.value;
        setRoomList({...roomList});
    }

    return (
        <>
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
        </>
    )
}

export default RoomListAddComponent;