import { Outlet } from "react-router-dom";
import NavigationComponent from "../components/nav/NavigationComponent";
import { useEffect, useState } from "react";
import cx from "classnames";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getCookie, setCookie } from "../util/cookieUtil";

const Layout = () => {
    const [isScrolling, setIsScrolling] = useState(false);
    const SERVER_URL = 'http://localhost:8080/chat';
    const [messages, setMessages] = useState([]);  
    const [wsaClient, setaWsClient] = useState(undefined);

    const chatAlert = {
        connect : (empNo) => {
            const client = new Client({
                 webSocketFactory: () => new SockJS(SERVER_URL),
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,

                onConnect : (conn) => {
                    console.log("소켓 연결 완" + empNo);
                    console.log(client)
                    client.subscribe(`/sub/chat/${empNo}`, (message)=>{
                        const chatMsg = JSON.parse(message.body).sender;
                        console.log(chatMsg);
                        
                        console.log("!!!!!!!!!!");
                        setCookie(chatMsg,chatMsg,365)
                        setCookie("alert",true,365);
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                content: chatMsg.content,
                                sender: chatMsg.sender,
                                sendTime: chatMsg.sendTime,
                            },
                        ]);
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
            setaWsClient(client); //client객체 추가
            client.activate(); //client 활성화
        }
    }


    const handleScroll = () => {
        clearTimeout();
        if(!isScrolling) setIsScrolling(true);
        if(isScrolling) setTimeout(() => {
            setIsScrolling(false);
        }, 1000);
    };

    useEffect(()=>{
        chatAlert.connect(getCookie("member").empNo);
    },[])
    return <>
    
        <div className="fixed top-0 left-0">
            <NavigationComponent />
        </div>
        <div className="p-5 ml-[260px] bg-slate-100 h-[100vh]">
            <div className={cx("h-full rounded-xl bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] overflow-y-scroll",
                    isScrolling && "isScrolling")} onScroll={handleScroll}>
                <Outlet />
            </div>
        </div>
    </>;
};

export default Layout;