import { useParams } from "react-router-dom";
import ChatListComponent from "../../components/chatComponent/ChatListComponent";

const ChatListPage = ({empNo}) => {


    return(
        <>
            <ChatListComponent senderEmpNo={empNo}/>
        </>
    )
}
export default ChatListPage;