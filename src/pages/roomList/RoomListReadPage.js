import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import RoomListReadComponent from "../../components/roomList/RoomListReadComponent";

const RoomListReadPage = () => {
    const {roomNo} = useParams();

    const navigate = useNavigate();

    const [queryString] = useSearchParams();

    const page = queryString.get('page')?parseInt(queryString.get('page')):1;
    const size = queryString.get('size')?parseInt(queryString.get('size')):10;

    return <>
        <div><RoomListReadComponent roomNo = {roomNo}/></div>
    </>
}

export default RoomListReadPage;