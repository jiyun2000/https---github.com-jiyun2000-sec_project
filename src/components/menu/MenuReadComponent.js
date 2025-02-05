import { useEffect, useState } from "react";
import { delOne, getOne } from "../../api/menuApi";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import { getOneEmp } from "../../api/employeesApi";
import colorChat from "../../assets/icon/colorChat.png";

const initState = {
    empNo: 0,
    mainMenu: '',
    firSideDish: '',
    secSideDish: '',
    thirdSideDish: '',
    dessert: '',
    menuDate: ''
}

const MenuReadComponent = () => {
    const { menuNo } = useParams();
    const [menuRead, setMenuRead] = useState(initState);
    const navigate = useNavigate();
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [empData, setEmpData] = useState('');
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    
    useEffect(()=>{
        getOneEmp(empNo).then((data)=>{
            console.log(data);
            setEmpData(data);
        }).catch((error)=>{
            console.log(error);
        })
    }, []);

    useEffect(() => {
        getOne(menuNo).then((data) => {
            setMenuRead(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [menuNo]);

    const modMenu = (menuNo) => {
        if(empData.jobNo === 999){
            navigate(`/menu/${menuNo}`);
        }else{
            alert("권한이 없습니다.")
            return;
        }
        
    }

    const delMenu = (menuNo) => {
        if(empData.jobNo === 999){
            if (window.confirm("삭제하시겠습니까?")) {
                delOne(menuNo).then((res) => {
                    navigate(`/menu/list`);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }else{
            alert("권한이 없습니다.")
            return;
        }
            
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }

      const checkRemove = () => {
        removeCookie("alert");
      }

    return (
        <div>
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

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">메뉴 상세 정보</h2>

                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-medium text-gray-700">날짜</div>
                    <div className="text-xl text-gray-800">{menuRead.menuDate}</div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-medium text-gray-700">메인 메뉴</div>
                    <div className="text-xl text-gray-800">{menuRead.mainMenu}</div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-medium text-gray-700">반찬 1</div>
                    <div className="text-xl text-gray-800">{menuRead.firSideDish}</div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-medium text-gray-700">반찬 2</div>
                    <div className="text-xl text-gray-800">{menuRead.secSideDish}</div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="text-xl font-medium text-gray-700">반찬 3</div>
                    <div className="text-xl text-gray-800">{menuRead.thirdSideDish}</div>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <div className="text-xl font-medium text-gray-700">디저트</div>
                    <div className="text-xl text-gray-800">{menuRead.dessert}</div>
                </div>

                <div className="flex justify-center space-x-6">
                    <button
                        className="w-1/3 bg-[#8ba7cd]  hover:bg-[#6f8cb4] text-white py-3 rounded-md text-xl"
                        type="button"
                        onClick={() => modMenu(menuRead.menuNo)}
                    >
                        수정
                    </button>
                    <button
                        className="w-1/3 bg-[#8ba7cd]  hover:bg-[#6f8cb4] text-white py-3 rounded-md text-xl"
                        type="button"
                        onClick={() => delMenu(menuRead.menuNo)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default MenuReadComponent;
