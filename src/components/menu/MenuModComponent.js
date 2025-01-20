import { useEffect, useState } from "react";
import { delOne, getOne, putOne } from "../../api/menuApi";
import { useNavigate } from "react-router-dom";

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

    const handleClickModify = () => {
        putOne(menuNo, menu).then((res) => {
            console.log(res);
            navigate(`/menu/list`);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
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
                        className="w-36 text-xl py-3 bg-sky-400 text-white rounded-md hover:bg-blue-500"
                        onClick={handleClickModify}
                    >
                        수정
                    </button>
                </div>
            </div>
        </>
    )
}

export default MenuModComponent;
