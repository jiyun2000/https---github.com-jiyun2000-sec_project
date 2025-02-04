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
import { deptOne } from '../api/deptInfoApi';
import board from "../assets/icon/board.png";
import todo from "../assets/icon/todo.png";
import team from "../assets/icon/team.png";
import admin from "../assets/icon/admin.png";
import user from "../assets/icon/user.png";
import BoardMainpageComponent from '../components/board/BoardMainPageComponent';


const MainPage = () => {
  const navigate = useNavigate();
  const [empNo, setEmpNo] = useState(getCookie("member").empNo);
  const [deptNo, setDeptNo] = useState(getCookie("member").deptNo);
  const today = new Date();
  const selectDate = `${today.getFullYear()}-${("0" + (today.getMonth()+1).toString()).slice(-2)}-${("0" + (today.getDate()).toString()).slice(-2)}`;
  const [empData, setEmpData] = useState(null);
  const [deptData, setDeptData] = useState('');
  const [BoardData, setBoardData] = useState([]);

  const goToMenu = () => navigate(`/menu/add`);
  const goToMenuList = () => {
    const page = 1;
    const size = 10;
    navigate(`/menu/list?page=${page}&size=${size}`);
  };
  
  useEffect(()=>{
    deptOne(deptNo).then((data)=>{
      console.log(data);
      setDeptData(data);
    })
  }, []);


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

  <div className='flex flex-row m-3'>
    <div className='m-3'>
      <Link to={`/employees/read/${empNo}`}><img src={user} alt='User' className='w-[120px] ml-8 h-[120px]' /></Link>
    </div>
    <div className='flex flex-col'>
      <div className='flex flex-row w-full'>
        <div className='font-semibold text-3xl m-3 ml-8'>
          {empData ? `${empData.firstName} ${empData.lastName}` : ''} 님
        </div>
        <div className='text-2xl font-semibold m-3'>
          ({deptData.deptName})
        </div>
      </div>

      <div className='flex flex-row space-x-8 ml-8 gap-10'>
        <div className='font-medium text-xl'>
          <div className='bg-[#dce1f3] rounded-md text-center'>근무정보</div>
          <TodayCommutePage empNo={empNo} />
        </div>

        <div className='font-medium text-xl'>
          <div className='bg-[#dfdcf3] rounded-md text-center'>입사</div>
          <DDayPage empNo={empNo} />
        </div>

        <div className='font-medium text-xl'>
          <div className='bg-[#dce7f3] rounded-md text-center'> 연차</div>
          <AnnualLeaveCountPage empNo={empNo} />
        </div>
      </div>
    </div>
  </div>

    <div className='flex flex-col w-full mt-3'>
      <div className='flex flex-row m-3 gap-5 justify-center'>
        <div className='w-[30%] shadow-xl rounded-md p-4'>
          <div className='flex flex-row justify-center gap-5 p-2'> 
            <img src={board} alt='Board' className='w-8'/>
            <p className='text-center text-xl font-semibold '>공지사항</p>
          </div>
          <BoardMainpageComponent />
        </div>
        <div className='w-[30%] shadow-xl rounded-md p-4'>
          <div className='flex flex-row justify-center gap-5 p-2'>
            <img src={todo} alt='Todo' className='w-8'/>
            <p className='text-center text-xl font-semibold '>개인일정</p>
          </div>
          <EmpTodoPage empNo={empNo} selectDate={selectDate} />
        </div>
        <div className='w-[30%] shadow-xl rounded-md p-4'>
          <div className='flex flex-row justify-center gap-5 p-2'>
            <img src={team} alt='Team' className='w-8'/>
            <p className='text-center text-xl font-semibold '>{deptData.deptName}일정</p>
          </div>
          <DeptTodoPage empNo={empNo} deptNo={deptNo} selectDate={selectDate} />
        </div>
      </div>
    </div>

    <div className='flex flex-col w-full'>
      <div className='flex flex-row m-3 gap-5 justify-center'> 
        <div className='w-[30%] shadow-xl rounded-md p-4 text-center'>
          <div  className='flex flex-row justify-center gap-5 p-2'>
            <img src={birth} alt="Birth" className="w-8 mb-2" />
            <p className='text-center text-xl font-semibold '>오늘의 생일자</p>
          </div>
          <BirthEmpPage />
        </div>
        <div className='w-[30%] shadow-xl rounded-md p-4 text-center'>
          <div className='flex flex-row justify-center gap-5 p-2'>
            <img src={menu} alt="Menu" className="w-8 mb-2" />
            <p className='text-center text-xl font-semibold '>오늘의 메뉴</p>
          </div>
          <MenuPage menuDate={selectDate} />
          <button type="button" className="text-lg mt-2 text-[#0f1f6f] hover:underline" onClick={goToMenuList}>
                메뉴 리스트
          </button>
        </div>
        <div className='w-[30%] shadow-xl rounded-md p-4'>
          <div  className='flex flex-row justify-center gap-5 p-2'>
            <img src={admin} alt='Admin' className='w-8'/>
            <p className='text-center text-xl'>관리자 문의</p>
          </div>
          <div>
           
          </div>
        </div>
      </div>
      

    </div>
      {/* <div className="flex flex-row w-full mt-8 px-6">
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
      </div> */}
{/* 
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
      </div> */}


      {/* <div className="flex flex-row w-full mt-8 px-6 flex-grow">
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
              <button type="button" className="text-sm text-blue-600 hover:underline" onClick={goToMenuList}>
                메뉴 리스트
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MainPage;
