import { useEffect, useState } from "react";
import RoomListComponent from "../../components/roomList/RoomListComponent";
import { getList } from "../../api/roomListApi";


const RoomListPage = () => {
    const [roomList,setRoomList] = useState();
    useEffect(()=>{
        getList().then(res =>{
            setRoomList(res);
        })
    },[]);

    return (
        <div>
            <RoomListComponent roomList = {roomList}/>
        </div>
    )
}

export default RoomListPage;