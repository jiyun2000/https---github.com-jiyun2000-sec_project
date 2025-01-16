import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate를 위해 import
import { empList, getChatList } from "../../api/chatAPi/chatAPi";

const ChatListComponent = ({ senderEmpNo }) => {
    const [chatList, setChatList] = useState([]);
    const navigate = useNavigate(); 
    const [page, setPage] = useState(1);

    useEffect(() => {
        getChatList(senderEmpNo)
            .then((data) => {
                console.log(JSON.stringify(data));
                setChatList(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [senderEmpNo]);
    

    useEffect(()=>{
        empList(senderEmpNo,page).then((data) => {
            console.log(JSON.stringify(data));
        }).catch((error) => {
            console.log(error);
        })
    }, [senderEmpNo, page]);

    const goToChatRoom = (chatNo) => {
        const [emp1, emp2] = chatNo.split('_');

        const receiverEmpNo = Math.min(emp1, emp2);
        const senderEmpNoFromChat = Math.max(emp1, emp2);

        navigate(`/chat/${senderEmpNoFromChat}/${receiverEmpNo}`);
    };

    const goToEmpList = () => {
        navigate(`/chat/empList/${senderEmpNo}?page=1`);
    }

    return (
        <div className="flex flex-col items-center py-10 px-4">
            <h3 className="text-2xl font-semibold mb-6">채팅 목록</h3>
            
            <div className="w-full max-w-2xl">
                {chatList.length === 0 ? (
                    <div className="text-center text-xl text-gray-500">채팅 목록X</div>
                ) : (
                    <div className="flex flex-col items-center">
                        {chatList.map((chat) => {
                           
                            return (
                                <>
                                <div key={chat.chatNo} className="bg-white p-4 rounded-xl shadow-md w-3/4 mb-2">
                                    <div className="mb-4 text-center">
                                        <p className="font-semibold text-lg text-gray-800">채팅방: {chat.chatNo}</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full bg-blue-300 text-white py-2 px-4 rounded-md text-sm "
                                        onClick={() => goToChatRoom(chat.chatNo)}
                                    >
                                        채팅 시작
                                    </button>
                                </div>
                                </> 
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="fixed bottom-10 left-0 right-0 flex justify-center mb-4">
                <button
                type="button"
                className="bg-sky-300 text-white py-2 px-6 rounded-full text-lg"
                onClick={goToEmpList}
            >
                친구목록
            </button>
            </div>
        </div>
    );
};

export default ChatListComponent;
