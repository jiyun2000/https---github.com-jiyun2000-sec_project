import { Navigate } from "react-router-dom";
import RoomListReadPage from "../pages/roomList/RoomListReadPage.js";
import RoomListModifyPage from "../pages/roomList/RoomListModifyPage.js";
import RoomListAddPage from "../pages/roomList/RoomListAddPage.js";
import RoomListPage from "../pages/roomList/RoomListPage.js";

const roomListRouter = () => {
    return [
        {
            path : "list",
            element : <RoomListPage/>
        },
        {
            path : '',
            element : <Navigate replace to={'list'}/>
        },
        {
            path : 'read/:roomNo',
            element : <RoomListReadPage/>
        },
        {
            path : 'modify/:roomNo',
            element : <RoomListModifyPage/>
        },
        {
            path : 'add',
            element : <RoomListAddPage/>
        }
    ]
}

export default roomListRouter;