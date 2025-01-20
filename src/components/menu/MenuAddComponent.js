import {useState } from "react";
import { addMenu } from "../../api/menuApi";
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';

const initState = {
    empNo : 0,
    mainMenu : '',
    firSideDish : '', 
    secSideDish : '', 
    thirdSideDish : '', 
    dessert : '', 
    menuDate : ''
}

const MenuAddComponent = () => {
    const navigate = useNavigate();
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [menuDTO, setMenuDTO] = useState({...initState});

    const handleClickChangeInput = (e) => {;
        menuDTO[e.target.name] = e.target.value;
        setMenuDTO({...menuDTO});
    }

    const handleSaveEvent = () =>{
        addMenu(menuDTO).then((data)=>{ 
            console.log(data)
            alert("등록되었습니다.");
            navigate(`/main`);
        }).catch((error) => {
            console.log(error);
        })

    }

    return (
        <>
        <div>
            <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
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
                    <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
                        <img src={chat} alt="Chat" className="w-full" />
                    </Link>
                </div>
            </div>

         <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">메뉴 입력</h2>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">메인메뉴</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="mainMenu" 
                            placeholder="메인메뉴 입력"
                            value={menuDTO.mainMenu} 
                            onChange={handleClickChangeInput} 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">반찬 1</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="firSideDish" 
                            placeholder="반찬 1 입력"
                            value={menuDTO.firSideDish} 
                            onChange={handleClickChangeInput} 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">반찬 2</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="secSideDish" 
                            placeholder="반찬 2 입력"
                            value={menuDTO.secSideDish} 
                            onChange={handleClickChangeInput} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">반찬 3</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="thirdSideDish" 
                            placeholder="반찬 3 입력"
                            value={menuDTO.thirdSideDish} 
                            onChange={handleClickChangeInput} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">디저트</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="dessert" 
                            placeholder="디저트 입력"
                            value={menuDTO.dessert} 
                            onChange={handleClickChangeInput} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">해당 날짜</label>
                        <input 
                            type="date" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="menuDate" 
                            value={menuDTO.menuDate} 
                            onChange={handleClickChangeInput} 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">등록 사원번호</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="empNo" 
                            placeholder="사원번호 입력"
                            value={menuDTO.empNo} 
                            onChange={handleClickChangeInput} 
                        />
                    </div>
                    
                    <button
                        type="button"
                        onClick={handleSaveEvent}
                        className="w-full py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default MenuAddComponent;

