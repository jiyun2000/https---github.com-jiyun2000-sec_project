import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';  
import { empList, sendChat } from "../../api/chatAPi/chatAPi";
import BoardTitleComponent from '../board/BoardTitleComponent';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import { getCookie, removeCookie } from '../../util/cookieUtil';
import { getOneEmp } from '../../api/employeesApi';
import colorChat from "../../assets/icon/colorChat.png";

const ChatEmpListComponent = () => {
    const { empNo } = useParams();  
    const [events, setEvents] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate(); 
    const [search, setSearch] = useState('');
    const [searchType] = useState('name');  // 이름 검색만
    const [cookieEmpNo, setCookieEmpNo] = useState(getCookie("member").empNo);
    const [empData, setEmpData] = useState('');
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));

    useEffect(() => {
        const awaitEmpList = async () => {
            const empListData = await empList(empNo, currentPage);
            if (empListData && Array.isArray(empListData.dtoList)) { 
                setEvents(empListData.dtoList); 
                setHasMore(empListData.dtoList.length > 0 && empListData.pageNumList.length > currentPage);
            } else {
                setHasMore(false);
            }
        };

        if (empNo) {
            awaitEmpList();
        }
    }, [empNo, currentPage]); 

    useEffect(()=>{
        getOneEmp(cookieEmpNo).then((data)=>{
            setEmpData(data);
            console.log(JSON.stringify(data))
        })
    },[])

    const loadMore = async () => {
        const nextPage = currentPage + 1; 
        setCurrentPage(nextPage);  
        const empListData = await empList(empNo, nextPage);  
        if (empListData && Array.isArray(empListData.dtoList)) {
            setEvents((prevEvents) => [...prevEvents, ...empListData.dtoList]); 
            setHasMore(empListData.dtoList.length > 0);
        } else {
            setHasMore(false);
        }
    };

    //로그인 한 당사자만 채팅 보낼 수 있게
    const sendMessage = (senderEmpNo, receiverEmpNo, chatMessageDTO) => {
        const strCook = cookieEmpNo + '';
        const strSen = senderEmpNo + '';
        console.log("strCook => " + strCook);
        console.log("strSen => " + strSen);
        if(strSen === strCook){
            console.log(cookieEmpNo);
            navigate(`/chat/${empNo}/${receiverEmpNo}`);
            sendChat(senderEmpNo, receiverEmpNo, chatMessageDTO);
        }else if(empData.jobNo === 1){ //관리자 계정
            console.log("관리자 계정");
            
            navigate(`/chat/${empNo}/${receiverEmpNo}`);
            sendChat(senderEmpNo, receiverEmpNo, chatMessageDTO);
        }
        else{
            alert("권한이 없습니다.")
        }
       
    };

    const handleFilter = () => {
        const lowerSearch = search.toLowerCase();
        return events.filter(employee => {
            const fullName = (employee.firstName + employee.lastName).toLowerCase();
            return fullName.includes(lowerSearch) && String(employee.empNo) !== String(empNo);  //나와의 채팅 안뜨도록
        });
    };

    const handleSearch = (evt) => {
        setSearch(evt.target.value);
    };

    const goToChatList = (senderEmpNo) => {
        if (!senderEmpNo) return;
        navigate(`/chat/chatList/${senderEmpNo}`);
    };

    const filteredList = handleFilter(); 

    useEffect(() => {
        if (filteredList.length === 0) {
            setHasMore(false);
        }
    }, [filteredList]);

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

  const checkRemove = () => {
    removeCookie("alert");
  }

    return (
        <div className="flex flex-col items-center py-10 px-6">
            <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
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
                    <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                    {chatCntCook  ? 
                        <img src={colorChat} alt='colorChat' className='w-full' /> :
                        <img src={chat} alt="Chat" className="w-full" />
                    }
                    </Link>
                </div>
            </div>

            <h2 className="text-center text-3xl mb-6">직원 목록</h2>
            <div className="flex flex-row items-center justify-center mb-4 w-full">
                <div className="m-2">
                    <select value={searchType} disabled className="p-2 border-2 border-gray-300 rounded-md">
                        <option value="name">이름</option>
                    </select>
                </div>

                <div className='border border-gray-500 rounded-lg m-2'>
                    <input 
                        type='text' 
                        value={search} 
                        onChange={handleSearch} 
                        className='p-2 rounded-md w-64 focus:outline-none'
                        placeholder="이름으로 검색"
                    />
                </div>

                <div>
                    <button 
                        type="button" 
                        className="inline-block rounded p-2 m-2 text-xl w-32  bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] cursor-pointer"
                    >
                        검색
                    </button>
                </div> 
            </div>

            <div className="w-full max-w-md px-4">
                {filteredList.length === 0 ? (
                    <div className="text-center text-xl text-gray-500">검색된 직원이 없습니다.</div>
                ) : (
                    <div className="space-y-4">
                        {filteredList.map((evt) => {
                            return (
                                <div className="w-full bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl mt-5" key={evt.empNo}>
                                    <div className="text-lg font-semibold text-gray-800">{evt.firstName} {evt.lastName}</div>
                                    <div className="text-sm text-gray-500 mt-2">
                                        <p>메일 주소: {evt.mailAddress}</p>
                                        <p>전화번호: {evt.phoneNum}</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-4 bg-[#8ba7cd] hover:bg-[#6f8cb4] text-white py-2 px-4 rounded-md w-full text-sm"
                                        onClick={() => sendMessage(empNo, evt.empNo, { content: "" })}
                                    >
                                        채팅보내기
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {hasMore && filteredList.length > 0 && (
                <div className="flex justify-end mt-4 w-full">
                    <button 
                        className="border border-gray-500 text-gray-700 py-2 px-6 rounded-lg mb-5"
                        onClick={loadMore}
                    >
                        더 보기
                    </button>
                </div>
            )}

            <div className="fixed bottom-10 left-0 right-0 flex justify-center mb-4">
                <button 
                    type="button" 
                    className="bg-[#8ba7cd] text-white  hover:bg-[#6f8cb4] py-2 px-6 rounded-full text-lg"
                    onClick={() => goToChatList(empNo)}
                >
                    채팅목록
                </button>
            </div>
        </div>
    );
};

export default ChatEmpListComponent;
