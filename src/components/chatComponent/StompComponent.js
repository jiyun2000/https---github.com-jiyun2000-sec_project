import { Link, useNavigate, useParams } from 'react-router-dom';
import { Client } from "@stomp/stompjs";
import { useState, useEffect, useRef, useCallback } from "react";
import SockJS from "sockjs-client";
import { getFileDetail, leaveChatRoom, sendFile } from '../../api/chatAPi/chatAPi';
import { jwtAxios } from '../../util/JWTutil';
import { getOneEmp } from '../../api/employeesApi';
import BoardTitleComponent from '../board/BoardTitleComponent';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import { getCookie, removeCookie } from '../../util/cookieUtil';
import colorChat from "../../assets/icon/colorChat.png";
import upload from "../../assets/icon/upload.png";
import { useDropzone } from 'react-dropzone';

export const API_SERVER_HOST = 'http://localhost:8080';

const initState = {
    files : [],
    chatNo : '',
    attachOriginName : ''
}

const StompComponent = () => {
    const navigate = useNavigate();
    const { senderEmpNo, receiverEmpNo } = useParams(); 
    const SERVER_URL = 'http://localhost:8080/chat';
    const [wsClient, setWsClient] = useState(undefined); //stomp 연결 후 생성한 client 
    const [secWsClient, setSecWsClient] = useState(undefined);
    const [isEnterChat, setIsEnterChat] = useState(false); //채팅창 입장 여부
    const [messages, setMessages] = useState([]);  //채팅 메시지지
    const [userId, setUserId] = useState(senderEmpNo); 
    const [empData, setEmpData] = useState(null);
    const [cookieEmpNo, setCookieEmpNo] = useState(getCookie("member").empNo);
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    const msgContainerRef = useRef('');
    const [fileList, setFileList] = useState([]);
    const fileId = useRef();
    const [fileDetail, setFileDetail] = useState('');
    const [messageObj, setMessageObj] = useState({
        content: '',
        sender: userId,
    });
    const dndRef = useRef();
    const [isExtraShow, setIsExtraShow] = useState();
    const [fileName, setFileName] = useState('');
    


    useEffect(()=>{
        if(msgContainerRef.current){
            msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
        }
    },[messages]);

    useEffect(()=>{
        getOneEmp(receiverEmpNo).then((data)=>{
            console.log(data);
            setEmpData(data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    useEffect(()=>{
        getFileDetail(messages.name).then((data) => {
            setFileDetail(data);
        })
    }, [])

    
   

    //과거 기록 가져오기
    const loadChatHistory = async () => {
        try {
            const chatRoomId = generateChatRoomId(senderEmpNo, receiverEmpNo);
            
            
            const response = await jwtAxios.get(`http://localhost:8080/chat/chat-history/${chatRoomId}`);


            const curr = new Date();
            console.log(curr);


        if(Array.isArray(response.data)){
            const formattedMessages = response.data.map(([sender, message, timestamp, uuid]) => ({
                            sender: sender,
                            content: message,
                            sendTime: new Date(timestamp).toLocaleString(),
                            uuid : uuid
                        })); 
                        // console.log("Ffff" + JSON.stringify(formattedMessages)); //새벽시간
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
            console.log("cook => "+ cookieEmpNo);
            
            console.log("receiverEmpNo " + receiverEmpNo) 
            const sortedEmpNos = [senderEmpNo, receiverEmpNo].sort();
            stompHandler.connect(sortedEmpNos[0], sortedEmpNos[1]); 
            chatSendAlert.connect(receiverEmpNo);
            
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

            //웹소켓 연결
            onConnect: (conn) => {
                console.log("stomp emp " + senderEmpNo + "  //rece " + receiverEmpNo);
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
                            content : chatMsg.content,
                            sender: chatMsg.sender,
                            sendTime: chatMsg.sendTime,
                            uuid:chatMsg.uuid
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
        const strCook = cookieEmpNo + '';
        const strSen = senderEmpNo + '';
        console.log(strCook);
        console.log(strSen);
        console.log("ㅁㅁㅁㅁ " + new Date);
        
    
        
        if(strSen === strCook){
            if (wsClient && wsClient.connected && messageObj.content.trim() !== '') {
                const messageWithTime = {
                    ...messageObj,
                    sendTime: new Date().toISOString,
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
                console.log("메시지 비어있음.");
            }
        }else if(empData.jobNo === 1){ //관리자 계정
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
        }
        else{
            alert("권한이 없습니다.")
            return;
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

const chatSendAlert = {
        connect : (empNo) => {
            const client = new Client({
                webSocketFactory: () => new SockJS(SERVER_URL),
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,

                onConnect : (conn) => {
                    //console.log("소켓 연결 완" + receiverEmpNo);
                    client.subscribe(`/sub/chat/${receiverEmpNo}`, (message)=>{
                        const chatMsg = message;
                        console.log("!!!!!!!!!!");
                        
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                content: chatMsg.content,
                                sender: chatMsg.sender,
                                sendTime: chatMsg.sendTime,
                            },
                        ]);
 
                    console.log("ㅋㅋㅋ");
                    console.log(chatMsg);
                    })
                },
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
            })
            setSecWsClient(client); //client객체 추가
            client.activate(); //client 활성화
        },
        sendMessage : () => {
            secWsClient.publish({
                destination: `/pub/chat/${receiverEmpNo}`,
                body: JSON.stringify({sender:senderEmpNo}),
            });
            console.log("!!!!!!");
            console.log(senderEmpNo);
            
        }
    }

    const generateChatRoomId = (senderEmpNo, receiverEmpNo) => {
        const smallEmpNo = Math.min(senderEmpNo, receiverEmpNo);
        const largeEmpNo = Math.max(senderEmpNo, receiverEmpNo);
        return `${smallEmpNo}_${largeEmpNo}`;
    };
    
    //채팅방 나가기
    const outChatRoom = () => {
        const strCook = cookieEmpNo + '';
        const strSen = senderEmpNo + '';
        console.log(strCook);
        console.log(strSen);
        if(strSen === strCook){
            console.log("outChatRoom");
            alert("채팅방에서 나가셨습니다")
            console.log("senderEmpNo" + senderEmpNo);
            console.log("receiverEmpNo" + receiverEmpNo);
            leaveChatRoom(senderEmpNo,receiverEmpNo);
            console.log("senderEmpNo 2 " + senderEmpNo);
            console.log("receiverEmpNo 2 " + receiverEmpNo);
            navigate(`/chat/empList/${senderEmpNo}`);
        }else{
            alert("권한이 없습니다.");
            return;
        }
    }

    const chatFileStomp = {
        connect: (senderEmpNo, receiverEmpNo) => {
            if (wsClient && wsClient.connected) { 
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
                console.log("chatFIleStomp emp " + senderEmpNo + "  //rece " + receiverEmpNo);
                navigate(`/chat/${senderEmpNo}/${receiverEmpNo}`);

                console.log("file 소켓 연결 완" + conn);
                setIsEnterChat(true); //채팅방 입장

                const chatRoomId = generateChatRoomId(senderEmpNo, receiverEmpNo);
                console.log(`/sub/chat/${chatRoomId}`);
               
                client.subscribe(`/sub/chat/${chatRoomId}`, (message) => {
                    const chatMsg = JSON.parse(message.body);  
                    console.log("file chatMsg    =>  " + chatMsg); 
                    
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            content: chatMsg.fileName,
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
        const fileList = fileId.current.files;
        const chatRoomId = generateChatRoomId(senderEmpNo, receiverEmpNo);
        console.log("Gggg" + chatRoomId);
        
        if (fileList.length > 0) {
            console.log("ooo" + fileList.attachUUID);
            
            console.log(fileList);
            
            const formData = new FormData();
            console.log(formData);
            console.log(JSON.stringify(formData));
            
            
            for (let i = 0; i < fileList.length; i++) {
                formData.append('files', fileList[i]);
            }
    
            formData.append('chatNo', chatRoomId);
            formData.append('attachOriginName', fileList[0].name);

            setFileName(fileList[0].name);

            sendFile(formData, chatRoomId, fileList, senderEmpNo).then((data) => {
                
                console.log("data" + data);      

                const messageWithFile = {
                    sender: senderEmpNo,
                    sendTime: new Date().toISOString(),
                    // content: fileList[0].name,
                    content : data,
                    uuid : data
                };

                console.log("messageWithFile => " + JSON.stringify(messageWithFile)); //
                
                const chatRoomId = generateChatRoomId(senderEmpNo, receiverEmpNo);
                wsClient.publish({
                    destination: `/pub/chat/${chatRoomId}`,
                    body: JSON.stringify(messageWithFile),
                });

              
    
            }).catch((error) => {
                console.log("errrrrrrrr file" + error);
            });

            
        }}}


    const goToBoardList = () => {
        navigate(`/board/list`)
      }

    const checkRemove = () => {
        removeCookie("alert");
    }

  

    return (
        <>
          <div>
            <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
              <div className="flex items-center space-x-8">
                <div className="text-2xl font-semibold text-blue-800 select-none cursor-pointer" onClick={goToBoardList}>
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
                <Link to={`/chat/empList/${senderEmpNo}?page=1`} className="w-12 cursor-pointer" onClick={() => checkRemove()}>
                  {chatCntCook ? 
                    <img src={colorChat} alt='colorChat' className='w-full' /> :
                    <img src={chat} alt="Chat" className="w-full" />
                  }
                </Link>
              </div>
            </div>
      
            <div>
              {!isEnterChat ? (
                <div style={{ textAlign: 'center' }}>
                  <h2>채팅방에 오신 것을 환영합니다.</h2>
                  <button type="button" onClick={stompHandler.connect} className="bg-[#6f8cb4] text-white p-2 rounded-md">채팅방 입장</button>
                </div>
              ) : (
                <div style={{
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '100vh', 
                  flexDirection: 'column',
                  width: '100%',
                  textAlign: 'center',
                }}>
                  <div className="text-center w-full items-center justify-center mb-4">
                    <h2 className='text-center font-semibold text-3xl m-2'>
                      {empData ? `${empData.firstName} ${empData.lastName}` : ''}
                    </h2>
                  </div>
      
                  <div 
                    ref={msgContainerRef}
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        width: '60%', 
                        height: '600px', 
                        backgroundColor: '#91B9F5', 
                        border: '1px solid #ddd', 
                        margin: '20px', 
                        borderRadius: '10px',
                        padding: '10px',
                        overflowY: 'auto',
                    }}
                  >
                   {messages.length > 0 && messages.map((item, index) => {
                        if (!item.sender || (item.content === "" && !item.uuid) || isNaN(Number(item.sender))) {
                            return null;
                        }

                        const sender = Number(item.sender);
                        const userEmpNo = Number(senderEmpNo);
                        const isUserMessage = sender === userEmpNo;
                        const isImage = (content) => {
                            return content && content.match(/\.(jpg|jpeg|png|gif)$/i);  
                          };
                          
                          const isFile = (content) => {
                            return content && content.match(/\.(pdf|docx|xlsx|pptx|txt)$/i); 
                          };
                       

                            return (
                                <div key={index} style={{
                                    textAlign: isUserMessage ? 'right' : 'left', 
                                    marginBottom: '10px',
                                }}>
                                  <div style={{
                                                display: 'inline-block',
                                                backgroundColor: isUserMessage ? '#FFE146' : '#FFFFFF',
                                                color: isUserMessage ? '#000' : '#000',
                                                borderRadius: '20px',
                                                padding: '10px 15px',
                                                maxWidth: '70%',
                                                wordBreak: 'break-word',
                                                fontSize: '14px',}}>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>
                                      {isUserMessage ? '[Me]' : `[${empData.firstName} ${empData.lastName}]`}
                                    </p>
                                    <p className="mt-1">
                                      {item.content && item.content !== "" ? (
                                        item.content
                                      ) : item.uuid ? (
                                        isImage(item.uuid) ? (
                                          <img src={`${API_SERVER_HOST}/chat/view/${item.uuid}`} className="w-32" alt="message image" />
                                        ) : isFile(item.uuid) ? (
                                          <a href={`${API_SERVER_HOST}/chat/viewFile/${item.uuid}`} download>
                                            <p>파일을 보냈습니다.</p>
                                            <button className="bg-[#3e3e3e] text-white p-2 rounded-md">파일 다운로드</button>
                                          </a>
                                        ) : (
                                          <span>지원하지 않는 파일 형식입니다.</span>
                                        )
                                      ) : (
                                        <span>No content</span>
                                      )}
                                    </p>
                                    <p className="text-xs text-right mt-2">{item.sendTime}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                     
                        
      
                  <div className="flex flex-col mt-4 w-full">

                    <div className="flex justify-center items-center w-full space-x-4">
                        <input
                        type="text"
                        value={messageObj.content}
                        onChange={(e) => setMessageObj({ ...messageObj, content: e.target.value })}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                            stompHandler.sendMessage();
                            }
                        }}
                        className="border-2 border-[#6f8cb4] rounded-md p-3 w-[50%] "
                        placeholder="메시지를 입력하세요"
                        />
                        
                        <button 
                        type="submit" 
                        onClick={() => {
                            stompHandler.sendMessage();
                            chatSendAlert.sendMessage();
                        }}
                        className="bg-[#83a3d0] text-white hover:bg-[#718aab] rounded-md p-3 w-[20%] "
                        >
                        전송
                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-4 space-x-4">
                        <label ref={dndRef}  className="w-[50%] cursor-pointer flex justify-center items-center bg-[#f1f5f9] hover:bg-[#e2e8f0] rounded-md p-2 border-2 border-[#6f8cb4] ">
                            <img src={upload} alt="upload" className="w-6 h-6 mr-2" />
                                <span className="text-[#6f8cb4]"> 파일을 선택하세요</span>
                            <input ref={fileId} type="file" hidden multiple="true" />
                        </label>

                        <button
                        onClick={() => { chatFileStomp.sendMessage(); chatSendAlert.sendMessage();}}
                        className="bg-[#83a3d0] text-white hover:bg-[#718aab] rounded-md p-3 w-[20%] "
                        >
                        파일전송
                        </button>
                    </div>
                   

                    <div className="mt-4 flex flex-row justify-center space-x-4">
                        <button 
                        type="button" 
                        onClick={stompHandler.disconnect} 
                        className="bg-[#727272] text-white hover:bg-[#2f2f2f] rounded-md p-3 w-[30%] "
                        >
                        닫기
                        </button>
                        
                        <button 
                        type="button" 
                        onClick={outChatRoom} 
                        className="bg-[#727272] text-white hover:bg-[#2f2f2f] rounded-md p-3 w-[30%] "
                        >
                        채팅방 나가기
                        </button>
                    </div>
                    </div>
                </div>

              )}
            </div>
          </div>
        </>
      );
};

export default StompComponent;

