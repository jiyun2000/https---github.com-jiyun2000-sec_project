import { useNavigate, useParams } from 'react-router-dom';
import { Client } from "@stomp/stompjs";
import { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import axios from 'axios';
import { leaveChatRoom } from '../../api/chatAPi/chatAPi';
import { jwtAxios } from '../../util/JWTutil';

const StompComponent = () => {
    const navigate = useNavigate();
    const { senderEmpNo, receiverEmpNo } = useParams(); 
    const SERVER_URL = 'http://localhost:8080/chat';
    const [wsClient, setWsClient] = useState(undefined); //stomp 연결 후 생성한 client 
    const [isEnterChat, setIsEnterChat] = useState(false); //채팅창 입장 여부
    const [messages, setMessages] = useState([]);  //채팅 메시지지
    const [userId, setUserId] = useState(senderEmpNo); 

    const [messageObj, setMessageObj] = useState({
        content: '',
        sender: userId,
    });

    //과거 기록 가져오기
    const loadChatHistory = async () => {
        try {
            const chatRoomId = generateChatRoomId(senderEmpNo, receiverEmpNo);
            
            const response = await jwtAxios.get(`http://localhost:8080/chat/chat-history/${chatRoomId}`);

        if(Array.isArray(response.data)){
            const formattedMessages = response.data.map(([sender, message, timestamp]) => ({
                            sender: sender,
                            content: message,
                            sendTime: new Date(timestamp).toLocaleString()
                        }));
                        setMessages(formattedMessages);
        }else {
            console.log("errr");
            setMessages([]);
        }
        }catch (error) {
                console.log(error);
                setMessages([]);
        }
    };
    
    //senderEmpNo & receiverEmpNo 둘 다 있다면면 소켓 연결
    useEffect(() => { 
        if (senderEmpNo && receiverEmpNo) {
            console.log("senderEmpNo " +senderEmpNo); 
            console.log("receiverEmpNo " + receiverEmpNo) 
            const sortedEmpNos = [senderEmpNo, receiverEmpNo].sort();
            stompHandler.connect(sortedEmpNos[0], sortedEmpNos[1]); 
            loadChatHistory(); //과거 리스트 호출
        
        } else { //아니면 다시 리스트로 이동
            navigate(`/chat/empList/${senderEmpNo}`);
        }
    }, [senderEmpNo,receiverEmpNo]);

    const stompHandler = {
        connect: (senderEmpNo, receiverEmpNo) => {
            if (wsClient && wsClient.connected) { //이미 연결되어 있을 경우. 콘솔
                console.log("이미 연결");
                return;
            }

        //Client 객체 생성성
        const client = new Client({
            webSocketFactory: () => new SockJS(SERVER_URL),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,

            //웹소켓 연결결
            onConnect: (conn) => {
                console.log("소켓 연결 완" + conn);
                setIsEnterChat(true); //채팅방 입장

                const chatRoomId = generateChatRoomId(senderEmpNo, receiverEmpNo);
                console.log(`/sub/chat/${chatRoomId}`);
               
                client.subscribe(`/sub/chat/${chatRoomId}`, (message) => {
                    const chatMsg = JSON.parse(message.body);  // 받은 메시지
                    console.log("Received message: ", chatMsg);  // 서버에서 받은 메시지 확인
                    
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            content: chatMsg.content,
                            sender: chatMsg.sender,
                            sendTime: chatMsg.sendTime,
                        },
                    ]);
                });
                
            },
            //소켓 연결 종료
            onWebSocketClose: () => {
                console.log('onWebSocketClose');
            },
            //소켓 연결 에러
            onWebSocketError: (error) => {
                console.log("onWebSocketError " + error);
            },
            //stomp 에러러
            onStompError: (frame) => {
                console.log("onStompError " + frame);
            },
        });

        setWsClient(client); //client객체 추가
        client.activate(); //client 활성화
    },

    sendMessage: (e) => {  // 메시지 보내기
        if (wsClient && wsClient.connected && messageObj.content.trim() !== '') {
            const messageWithTime = {
                ...messageObj,
                sendTime: new Date().toISOString(),
                receiver: receiverEmpNo,
            };
    
            console.log("messageWithTime " + JSON.stringify(messageWithTime));  // 메시지 내용 확인
    
            const chatRoomId = generateChatRoomId(senderEmpNo, receiverEmpNo);
            
            // STOMP로 메시지 보내기
            wsClient.publish({
                destination: `/pub/chat/${chatRoomId}`,
                body: JSON.stringify(messageWithTime),
            });
    
            // Spring Boot 서버로 메시지 저장
            jwtAxios.post(`http://localhost:8080/chat/${senderEmpNo}/${receiverEmpNo}`, messageWithTime, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            })
            .then(response => {
                console.log("Message saved in DB:", response.data);
            })
            .catch(error => {
                console.log("Error saving message:", error);
            });
    
            // 메시지 입력 필드 초기화
            setMessageObj({ ...messageObj, content: '' });
        } else {
            console.log("Message content is empty");
        }
    },
    
    //소켓 연결끊음
    disconnect: () => {
        if (wsClient) {
            wsClient.deactivate();
            setWsClient(undefined);
            setIsEnterChat(false);
        }
        navigate(`/chat/empList/${senderEmpNo}`);
    },
};
    const generateChatRoomId = (senderEmpNo, receiverEmpNo) => {
        const smallEmpNo = Math.min(senderEmpNo, receiverEmpNo);
        const largeEmpNo = Math.max(senderEmpNo, receiverEmpNo);
        return `${smallEmpNo}_${largeEmpNo}`;
    };
    
    //채팅방 나가기
    const outChatRoom = () => {
        console.log("outChatRoom");
        alert("채팅방에 나가시겠습니까?")
        console.log("senderEmpNo" + senderEmpNo);
        console.log("receiverEmpNo" + receiverEmpNo);
        leaveChatRoom(senderEmpNo,receiverEmpNo);
        console.log("senderEmpNo 2 " + senderEmpNo);
        console.log("receiverEmpNo 2 " + receiverEmpNo);
        navigate(`/chat/empList/${receiverEmpNo}`);
    }

    return ( 
        <div>
            {!isEnterChat ? (
                <div style={{ textAlign: 'center' }}>
                    <h2>채팅방에 오신 것을 환영합니다.</h2>
                    <button type="button" onClick={stompHandler.connect}>
                        채팅방 입장
                    </button>
                </div>
            ) : (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '100vh',
                    flexDirection: 'column',
                    width: '100%',
                    textAlign: 'center'
                }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>{receiverEmpNo} </h2>
                    <div >
                        <input
                            type="text"
                            value={messageObj.content}
                            onChange={(e) => setMessageObj({ ...messageObj, content: e.target.value })}
                            className='border border-blue-200 rounded-md p-1'
                        />
                        <button type="submit" 
                            onClick={stompHandler.sendMessage}
                            className='border border-blue-200 rounded-md mx-2 p-1 font-thin'
                        >
                            전송
                        </button>
                    </div>
                    </div>
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        width: '60%', 
                        height: '700px', 
                        backgroundColor: '#B4E5FF', 
                        border: '1px solid black', 
                        margin: '20px', 
                        overflowY: 'scroll' 
                    }}>
                        {messages.length > 0 && messages.map((item, index) => {
                            if (!item.sender || !item.content || isNaN(Number(item.sender))) {
                                return null;}

                            const sender = Number(item.sender); 
                            const userEmpNo = Number(senderEmpNo); 
                            const isUserMessage = sender === userEmpNo; 

                        return (
                            <div key={index} style={{ 
                            textAlign: isUserMessage ? 'right' : 'left', 
                            marginBottom: '10px' }}>
                            <h1 style={{
                            fontSize: 13,
                            padding: '5px 10px',
                            borderRadius: '10px',
                            display: 'inline-block'}}>
                            {isUserMessage ? `[ME] ${item.content} (${item.sendTime})` : `[${sender}] ${item.content} (${item.sendTime})`}
                            </h1>
                            </div>
                        );
                     })}
                </div>

                    <div style={{ marginTop: 10 }}>
                        <button type="button" onClick={stompHandler.disconnect} className='border border-blue-200 rounded-md p-1 font-thin'>
                            닫기
                        </button> 
                        <button type='button' onClick={outChatRoom} className='border border-blue-200 rounded-md p-1 mx-1 font-thin'>채팅방 나가기</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default StompComponent;
