import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  
import { empList, sendChat } from "../../api/chatAPi/chatAPi";

const ChatEmpListComponent = () => {
    const { empNo } = useParams();  
    const [events, setEvents] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchEmpList = async () => {
                const empListData = await empList(empNo, currentPage); 
                console.log("empListData"+ empListData);
                console.log("emp" + JSON.stringify(empListData));
                if (empListData && Array.isArray(empListData.dtoList)) {
                    setEvents(empListData.dtoList); 
                } else {
                    console.error("X");
                }
        };

        if (empNo) {
            fetchEmpList();
        } else {
            console.error("XX");
        }
    }, [empNo, currentPage]); 

    
    const loadMore = async () => {
        const nextPage = currentPage + 1; 
        setCurrentPage(nextPage);  
         const empListData = await empList(empNo, nextPage);  
        if (empListData && Array.isArray(empListData.dtoList)) {
            setEvents((prevEvents) => [...prevEvents, ...empListData.dtoList]);  
        }
    };

    const sendMessage = (senderEmpNo,receiverEmpNo,chatMessageDTO) => {
        console.log("Sss" + senderEmpNo); 
        console.log("rrr" + receiverEmpNo); 

        navigate(`/chat/${empNo}/${receiverEmpNo}`)
        sendChat(senderEmpNo, receiverEmpNo,chatMessageDTO);
        console.log("dddd");
            
    }

return (
    <>
        {events.length === 0 ? (
            <div>Employees List 가 없네요 ????</div>
        ) : (
            <div>
                {events.map((evt) => { 
                    return (
                        <div className='border border-gray-500 px-2 m-2 rounded-md font-light '>
                        <div key={evt.empNo}>
                            <p>이름 : {evt.firstName}{evt.lastName}</p>
                            <p>메일 주소 : {evt.mailAddress}</p>
                            <p>전화번호 : {evt.phoneNum}</p>
                            <button type="button" className='border border-gray-400 rounded-md px-2' onClick={() => sendMessage(empNo, evt.empNo, { content: "" })}>채팅보내기</button>
                            <hr />
                        </div>
                        </div>
                    );
                })}
                {hasMore && (
                    <button className='border border-gray-500 rounded-md px-2 mx-2' onClick={loadMore}>더 보기</button>
                )}
            </div>
        )}
    </>
    );
};

export default ChatEmpListComponent;
