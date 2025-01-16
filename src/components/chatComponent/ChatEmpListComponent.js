import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import { empList, sendChat } from "../../api/chatAPi/chatAPi";

const ChatEmpListComponent = () => {
    const { empNo } = useParams();  
    const [events, setEvents] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate(); 
    console.log("empNo:", empNo); 
    

    useEffect(() => {
        //리스트 가져오기
        const awaitEmpList = async () => {
                const empListData = await empList(empNo, currentPage);  //await빼면 안됨..
                console.log("empListData"+ empListData);
                console.log("emp" + JSON.stringify(empListData));
                if (empListData && Array.isArray(empListData.dtoList)) { 
                    setEvents(empListData.dtoList); 
                    setHasMore(empListData.dtoList.length > 0 && empListData.pageNumList.length > 1);
                } else {
                    console.log("X");
                    setHasMore(false);
                }
        };

        if (empNo) {
            awaitEmpList();
        } else {
            console.log("XX");
        }
    }, [empNo, currentPage]); 

    
    const loadMore = async () => {
        const nextPage = currentPage + 1; 
        setCurrentPage(nextPage);  
         const empListData = await empList(empNo, nextPage);  
        if (empListData && Array.isArray(empListData.dtoList)) {
            setEvents((prevEvents) => [...prevEvents, ...empListData.dtoList]); 
            
            if(empListData.dtoList.length === 0){
                setHasMore(false);
            }else{
                setEvents((prevEvents) => [...prevEvents, ...empListData.dtoList]); 
                setHasMore(empListData.pageNumList.length > currentPage);
            }
        }else{
            setHasMore(false);
        }
        
    };

    const sendMessage = (senderEmpNo,receiverEmpNo,chatMessageDTO) => {
        console.log("Sss" + senderEmpNo); 
        console.log("rrr" + receiverEmpNo); 

        navigate(`/chat/${empNo}/${receiverEmpNo}`)
        sendChat(senderEmpNo, receiverEmpNo,chatMessageDTO);
        console.log("dddd");
    }



    // const goToChatList = (senderEmpNo) => {
    //     console.log("goToChatList");
    //     console.log(senderEmpNo); //잘받음
    //     navigate(`/chat/chatList/${senderEmpNo}`);  
    // }
    
 
    


    return (
        <>
            <h2 className='text-center text-3xl mt-8'>Employee List</h2>
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="w-full max-w-md px-4">
                    {events.length === 0 && !hasMore ? (
                        <div className="text-center text-xl text-gray-500">Employees List 가 없네요 ????</div>
                    ) : (
                        <div className="space-y-4">
                            {events.filter(evt => evt.empNo !== parseInt(empNo)).map((evt) => {
                                return (
                                    <div className="w-full bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl mt-5" key={evt.empNo}>
                                        <div className="text-lg font-semibold text-gray-800">{evt.firstName} {evt.lastName}</div>
                                        <div className="text-sm text-gray-500 mt-2">
                                            <p>메일 주소: {evt.mailAddress}</p>
                                            <p>전화번호: {evt.phoneNum}</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-4 bg-blue-300 text-white py-2 px-4 rounded-md w-full text-sm "
                                            onClick={() => sendMessage(empNo, evt.empNo, { content: "" })}
                                        >
                                            채팅보내기
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
    
                    {hasMore && (
                        <div className="flex justify-end mt-4">
                            <button 
                                className="border border-gray-500 text-gray-700 py-2 px-6 rounded-lg mb-5"
                                onClick={loadMore}
                            >
                                더 보기
                            </button>
                        </div>
                    )}
                </div>
            </div>
    
            {/* <div className="fixed bottom-10 left-0 right-0 flex justify-center mb-4">
                <button 
                    type="button" 
                    className="bg-sky-300 text-white py-2 px-6 rounded-full text-lg "
                    onClick={() => goToChatList(empNo)}
                >
                    채팅목록
                </button>
            </div> */}
        </>
    );
    
};

export default ChatEmpListComponent;
