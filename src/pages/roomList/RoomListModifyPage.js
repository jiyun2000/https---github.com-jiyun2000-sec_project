import { useParams } from "react-router-dom"
import RoomListModifyComponent from "../../components/roomList/RoomListModifyComponent";

const RoomListModifyPage = () => {
    const {roomNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            <RoomListModifyComponent roomNo = {roomNo}/>
        </div>
    )
}

export default RoomListModifyPage;