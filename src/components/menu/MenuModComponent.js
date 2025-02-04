import { useEffect, useState } from "react";
import { delOne, getOne, putOne } from "../../api/menuApi";
import { Link, useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from "../board/BoardTitleComponent";
import { getOneEmp } from "../../api/employeesApi";
import colorChat from "../../assets/icon/colorChat.png";

const initState = {
    empNo : 0,
    mainMenu : '',
    firSideDish : '', 
    secSideDish : '', 
    thirdSideDish : '', 
    dessert : '', 
    menuDate : ''
}

const MenuModComponent = ({menuNo}) => {
    const [menu, setMenu] = useState({...initState});
    const navigate = useNavigate();
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [empData, setEmpData] = useState('');
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    useEffect(() => {
        getOne(menuNo).then((data) => {
            setMenu(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [menuNo]);

    const handleChangeMenu = (evt) => {
        menu[evt.target.name] = evt.target.value;
        setMenu({...menu});
    }

    useEffect(()=>{
        getOneEmp(empNo).then((data) => {
            console.log(data);
            setEmpData(data);
        }).catch((error)=>{
            console.log(error);
        })
    }, []);

    const handleClickModify = () => {
        if(empData.jobNo === 999){
            putOne(menuNo, menu).then((res) => {
                console.log(res);
                navigate(`/menu/list`);
            }).catch((error) => {
                console.log(error);
            });
        }else{
            alert("권한이 없습니다.");
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
        <>
        <div>
            <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-semibold text-blue-800 select-none cursor-pointer" onClick={goToBoardList}>
                    [공지사항]
                    </div>
                    <div className="w-64 text-2xl font-semibold cursor-pointer">
                        <BoardTitleComponent/>
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

             <div className="w-full flex flex-col p-8">
                <div className="flex mb-6">
                    <div className="w-1/5 text-xl font-semibold text-gray-700">메뉴 번호</div>
                    <div className="w-4/5 p-3 text-lg rounded-md border border-gray-300">{menu.menuNo}</div>
                </div>

                <div className="flex mb-6">
                    <div className="w-1/5 text-xl font-semibold text-gray-700">메인 메뉴</div>
                    <input
                        className="w-4/5 p-3 text-lg rounded-md border border-gray-300"
                        name="mainMenu"
                        type="text"
                        value={menu.mainMenu}
                        onChange={handleChangeMenu}
                    />
                </div>

                <div className="flex mb-6">
                    <div className="w-1/5 text-xl font-semibold text-gray-700">반찬 1</div>
                    <input
                        className="w-4/5 p-3 text-lg rounded-md border border-gray-300"
                        name="firSideDish"
                        type="text"
                        value={menu.firSideDish}
                        onChange={handleChangeMenu}
                    />
                </div>

                <div className="flex mb-6">
                    <div className="w-1/5 text-xl font-semibold text-gray-700">반찬 2</div>
                    <input
                        className="w-4/5 p-3 text-lg rounded-md border border-gray-300"
                        name="secSideDish"
                        type="text"
                        value={menu.secSideDish}
                        onChange={handleChangeMenu}
                    />
                </div>

                <div className="flex mb-6">
                    <div className="w-1/5 text-xl font-semibold text-gray-700">반찬 3</div>
                    <input
                        className="w-4/5 p-3 text-lg rounded-md border border-gray-300"
                        name="thirdSideDish"
                        type="text"
                        value={menu.thirdSideDish}
                        onChange={handleChangeMenu}
                    />
                </div>

                <div className="flex mb-6">
                    <div className="w-1/5 text-xl font-semibold text-gray-700">디저트</div>
                    <input
                        className="w-4/5 p-3 text-lg rounded-md border border-gray-300"
                        name="dessert"
                        type="text"
                        value={menu.dessert}
                        onChange={handleChangeMenu}
                    />
                </div>

                <div className="flex mb-6">
                    <div className="w-1/5 text-xl font-semibold text-gray-700">날짜</div>
                    <input
                        className="w-4/5 p-3 text-lg rounded-md border border-gray-300"
                        name="menuDate"
                        type="text"
                        value={menu.menuDate}
                        onChange={handleChangeMenu}
                    />
                </div>

                <div className="flex mb-6">
                    <div className="w-1/5 text-xl font-semibold text-gray-700">사원번호</div>
                    <input
                        className="w-4/5 p-3 text-lg rounded-md border border-gray-300"
                        name="empNo"
                        type="text"
                        value={menu.empNo}
                        onChange={handleChangeMenu}
                    />
                </div>

                <div className="flex justify-center p-6">
                    <button
                        type="button"
                        className="w-36 text-xl py-3 bg-[#8ba7cd]  hover:bg-[#6f8cb4] text-white rounded-md"
                        onClick={handleClickModify}
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default MenuModComponent;
