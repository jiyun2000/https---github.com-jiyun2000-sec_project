import React, { useEffect, useState } from 'react';
import { getList } from '../../api/roomListApi';
import useCustomMove from '../../hooks/useCustomMove';

const initState = {
    roomNo : 0,
    roomName : '',
    location : ''
}

const RoomListComponent = () => {

    const [roomList,setRoomList] = useState([initState]);
    let cnt = 0;

    const { moveToRead, moveToAdd } = useCustomMove();

    useEffect(() => {
      getList().then(res => {
        //console.log(res); //서버에서 받아오는지 확인 ok
        setRoomList(res);
      });
    }, [cnt]);

    const handleClickAdd = () =>{
        moveToAdd();
    }
    
    return (<>
    <div>
            <h2 className='text-center mt-8 text-3xl'>회의실(화장실) 안내</h2>
            <div className='flex flex-wrap mx-auto p-6 items-start justify-center text-center'>
                {roomList.map((res)=>{
                    return(
                    <div 
                    key = {res.roomNo} 
                    className='flex w-2/4 p-2 m-2 rounded-md font-light items-center text-center border border-blue-300 justify-center' 
                    onClick = {() => moveToRead(res.roomNo)}
                    >
                        {res.roomName} <br />
                        위치 : {res.location}
                    </div>)
                })}
            </div>
        </div>

        <div className="flex p-4 justify-center">
        <button type="button"
        className="inline-block rounded p-4 m-2 text-xl w-32 text-white  bg-blue-400 hover:text-white hover:bg-sky-500 cursor-pointer "
        onClick={handleClickAdd}>
            추가
        </button>
        </div>
        </>
    )
}

export default RoomListComponent;