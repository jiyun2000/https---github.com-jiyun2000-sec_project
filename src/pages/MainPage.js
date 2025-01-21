import { Link, useNavigate } from 'react-router-dom';
import EmpTodoPage from './todoPage/EmpTodoPage';
import DeptTodoPage from './todoPage/DeptTodoPage';
import mail from "../assets/icon/mail.png";
import chat from "../assets/icon/chat.png";
import { useEffect, useState } from 'react';
import { getCookie } from '../util/cookieUtil';
import TodayCommutePage from './employees/TodayCommutePage';
import MenuPage from './menu/MenuPage';
import DDayPage from './DDayPage';
import BirthEmpPage from './BirthEmpPage';
import AnnualLeaveCountPage from './employees/AnnualLeaveCountPage';
import BoardTitleComponent from '../components/board/BoardTitleComponent';
import menu from "../assets/icon/menu.png";
import birth from "../assets/icon/birth.png";
import { getList, getOneEmp } from '../api/employeesApi';

const MainPage = () => {
  const navigate = useNavigate();
  const [empNo, setEmpNo] = useState(getCookie("member").empNo);
  const [deptNo, setDeptNo] = useState(getCookie("member").deptNo);
  const today = new Date();
  const selectDate = `${today.getFullYear()}-${("0" + (today.getMonth()+1).toString()).slice(-2)}-${("0" + (today.getDate()).toString()).slice(-2)}`;
  const [empData, setEmpData] = useState(null);

  const goToMenu = () => navigate(`/menu/add`);
  const goToMenuList = () => {
    const page = 1;
    const size = 10;
    navigate(`/menu/list?page=${page}&size=${size}`);
  };
  

  useEffect(()=>{
    getOneEmp(empNo).then((data)=>{
      console.log(data);
      setEmpData(data);
    }).catch((error)=>{
      console.log(error);
    })
  },[])

  const goToBoardList = () => {
    navigate(`/board/list`)
  }

  return (
    <div className="min-h-screen bg-white pb-5">
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
          <Link to={`/chat/empList/${empNo}?page=1`} className="w-12 cursor-pointer">
            <img src={chat} alt="Chat" className="w-full" />
          </Link>
        </div>
      </div>

      <div className='text-center font-semibold text-3xl'>
        환영합니다 {empData ? empData.firstName : ''}{empData ? empData.lastName : ''} 님
      </div>

      <div className="flex flex-row w-full mt-8 px-6">
        <div className="w-1/2 p-4">
          <div className="select-none">
            <EmpTodoPage empNo={empNo} selectDate={selectDate} />
          </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="select-none">
            <DeptTodoPage empNo={empNo} deptNo={deptNo} selectDate={selectDate} />
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full mt-2 px-6">
        <div className="w-1/3 p-4 text-center">
          <div className="select-none bg-[#e6edf6] rounded-md p-3 text-xl font-medium h-[10vh] flex items-center justify-center">
            <TodayCommutePage empNo={empNo} />
          </div>
        </div>
        <div className="w-1/2 p-4 text-center">
          <div className="select-none bg-[#e6edf6] rounded-md p-3 text-xl font-medium h-[10vh] flex items-center justify-center">
            <DDayPage empNo={empNo} />
          </div>
        </div>
        <div className="w-1/2 p-4 text-center">
          <div className="select-none bg-[#e6edf6] rounded-md p-3 text-xl font-medium h-[10vh] flex items-center justify-center">
            <AnnualLeaveCountPage empNo={empNo} />
          </div>
        </div>
      </div>


      <div className="flex flex-row w-full mt-8 px-6 flex-grow">
        <div className="w-1/2 p-4 text-center flex items-center justify-center">
          <div className="flex flex-col items-center w-full p-3 bg-[#f1f6fb] rounded-md h-full">
            <img src={birth} alt="Birth" className="w-24 mb-2" />
            <BirthEmpPage />
          </div>
        </div>

        <div className="w-1/2 p-4 text-center flex items-center justify-center">
          <div className="flex flex-col items-center w-full p-3 bg-[#f1f6fb] rounded-md h-full">
            <img src={menu} alt="Menu" className="w-24 mb-2" />
            <MenuPage menuDate={selectDate} />
            <div className="mt-4">
              {/* <button type="button" className="text-sm mr-3 text-blue-600 hover:underline" onClick={goToMenu}>
                메뉴 등록
              </button> */}
              <button type="button" className="text-sm text-blue-600 hover:underline" onClick={goToMenuList}>
                메뉴 리스트
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
