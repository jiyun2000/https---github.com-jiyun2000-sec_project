import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { listMenu } from "../../api/menuApi";
import PageComponent from "../common/PageComponent";
import { useNavigate } from "react-router-dom";
import { getCookie } from '../../util/cookieUtil';
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';


const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

const MenuListComponent = () => {
    const [menuList, setMenuList] = useState(initState);
    const { page, size, moveToMenuList } = useCustomMove();
    const navigate = useNavigate();
    const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [menuDateExist, setMenuDateExist] = useState(false);
    const [menuDate, setMenuDate] = useState('')

    useEffect(() => {
        listMenu([page, size]).then((data) => {
            setMenuList(data);

            const menuDateFormat = data.dtoList.find((menu)=>menu.menuDate === menuDate);
            setMenuDateExist(!!menuDateFormat)
        });
    }, [page, size]);

    const goToMenu = (menuNo) => {
        navigate(`/menu/readMenu/${menuNo}`)
    }

    const goToMenuAdd = () => navigate(`/menu/add`);

    const goToBoardList = () => {
        navigate(`/board/list`)
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
            <div className="text-3xl font-bold mb-6 text-center m-5">메뉴 리스트</div>
                <div className="flex flex-wrap justify-between px-16">
                    {menuList.dtoList.map((data) => (
                    <div
                        key={data.menuNo}
                        className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl w-[48%] mb-6 text-center"
                    >
                        <div className="font-semibold text-lg text-blue-600 mb-2">{data.menuDate}</div>
                        <div className="text-xl font-semibold mb-2 text-gray-800">{data.mainMenu}</div>

                        <div className="text-base text-gray-600 mb-1">
                            {data.firSideDish} | {data.secSideDish} | {data.thirdSideDish}
                        </div>
                        <div className="text-base text-gray-600 mb-1">
                            {data.dessert}
                        </div>
                        <div>
                            <button onClick={()=>goToMenu(data.menuNo)} type="button">자세히</button>
                        </div>
                    </div>
                ))}
            </div>

            <PageComponent serverData={menuList} movePage={moveToMenuList} />
            <div className="flex justify-center items-center">
                <button type="button" className="inline-block px-6 py-3 text-xl font-medium text-white bg-[#8ba7cd]  hover:bg-[#6f8cb4] rounded-lg mb-8" onClick={goToMenuAdd}>
                    메뉴 등록
                </button>
            </div>
              
        </div>
        </>
    );
};

export default MenuListComponent;
