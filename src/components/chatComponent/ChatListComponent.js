import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { empList, getChatList } from "../../api/chatAPi/chatAPi";
import { getOneEmp } from "../../api/employeesApi";
import BoardTitleComponent from "../board/BoardTitleComponent";
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";

const ChatListComponent = () => {
    const { senderEmpNo } = useParams();
    const [chatList, setChatList] = useState([]);
    const [userNames, setUserNames] = useState({});  
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


    useEffect(() => {
        const empData = [];
        chatList.forEach(chat => {
            const [emp1, emp2] = chat.chatNo.split('_');
            if (emp1 !== senderEmpNo && !empData.includes(emp1)) {
                empData.push(emp1);
            }
            if (emp2 !== senderEmpNo && !empData.includes(emp2)) {
                empData.push(emp2);
            }
        });
    
        empData.forEach(empNo => {
            if (!userNames[empNo]) {
                getOneEmp(empNo)
                    .then((data) => {
                        setUserNames(prevNames => ({
                            ...prevNames,
                            [empNo]: `${data.firstName} ${data.lastName}`
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }, [chatList, senderEmpNo, userNames]);
    

    const goToChatRoom = (chatNo) => {
        const [emp1, emp2] = chatNo.split('_');
        const receiverEmpNo = emp1 === senderEmpNo ? emp2 : emp1;

        navigate(`/chat/${senderEmpNo}/${receiverEmpNo}`);
    };

    const goToEmpList = () => {
        navigate(`/chat/empList/${senderEmpNo}?page=1`);
    };

    return (
        <div>
            <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-semibold text-blue-800 select-none">
                        [공지사항]
                    </div>
                    <div className="w-64 text-2xl font-semibold cursor-pointer">
                        <BoardTitleComponent />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <Link to="/mail" className="w-12 cursor-pointer">
                        <img src={mail} alt="Mail" className="w-full" />
                    </Link>
                    <Link to={`/chat/empList/${senderEmpNo}?page=1`} className="w-12 cursor-pointer">
                        <img src={chat} alt="Chat" className="w-full" />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center py-10 px-4">
                <h3 className="text-2xl font-semibold mb-6">채팅 목록</h3>

            <div className="w-full max-w-2xl">
                {chatList.length === 0 ? (
                    <div className="text-center text-xl text-gray-500">채팅 목록X</div>
                ) : (
                    <div className="flex flex-col items-center">
                        {chatList.map((chat) => {
                            const [emp1, emp2] = chat.chatNo.split('_');
                            const receiverEmpNo = emp1 === senderEmpNo ? emp2 : emp1;
                            const receiverName = userNames[receiverEmpNo];

                            return (
                                <div key={chat.chatNo} className="bg-white p-4 rounded-xl shadow-md w-3/4 mb-2">
                                    <div className="mb-4 text-center">
                                        <p className="font-semibold text-lg text-gray-800">
                                            {receiverName} 님
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="w-full bg-blue-300 text-white py-2 px-4 rounded-md text-sm"
                                        onClick={() => goToChatRoom(chat.chatNo)}
                                    >
                                        채팅 시작
                                    </button>
                                </div>
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
        </div>
    );
};

export default ChatListComponent;
