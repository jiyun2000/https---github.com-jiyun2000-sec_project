import { Link, useParams } from 'react-router';
import EmpTodoPage from './todoPage/EmpTodoPage';
import DeptTodoPage from './todoPage/DeptTodoPage';
import mail from "../assets/icon/mail.png";
import chat from "../assets/icon/chat.png";
import {  useState } from 'react';
import { getCookie } from '../util/cookieUtil';

const MainPage = () => {

  const [empNo, setEmpNo] = useState(getCookie("member").empNo);
  const [deptNo, setDeptNo] = useState(getCookie("member").deptNo);
  console.log(empNo);
  const today = new Date();
  const selectDate = `${today.getFullYear()}-${("0" + (today.getMonth()+1).toString()).substring(-2)}-${("0" + (today.getDate()).toString()).slice(-2)}`;

  console.log(getCookie);
  console.log(selectDate);




  return (
    <>
        <div className='flex flex-col items-center  '>
          <div className='flex justify-between items-start w-full mt-8'>
            <p className='text-3xl ml-4'>공지사항</p>
            <div className='flex'>
              <Link to={'/mail'}><img src={mail} className='w-12 ml-4'/></Link>
              <Link to={'/chat/empList/{empNo}?page=1'}><img src={chat} className='w-12 ml-4'/></Link>
            </div>
          </div>
          <div className='flex flex-row w-full mt-8'>
            <div className='w-[50%] h-[50%]'>
              <EmpTodoPage empNo={empNo} selectDate={selectDate} />
            </div>
            <div className='w-[50%] h-[50%]'>
              <DeptTodoPage empNo={empNo} deptNo={deptNo} selectDate={selectDate} />
            </div>
          </div>
          <div className='flex flex-row'>
            <div className='m-5 text-2xl shadow-2xl bg-[#eae5e5] w-[50%] text-center h-[100%]'><p>생일자</p></div>
            <div className='m-5 text-2xl shadow-2xl bg-[#eae5e5] w-[50%] text-center h-[100%]'><p>report</p></div>
            <div className='m-5 text-2xl shadow-2xl bg-[#eae5e5] w-[50%] text-center h-[100%]'><p>오늘의 출퇴근 시간</p></div>
          </div>
          <div className='flex flex-row'>
            <div  className='m-5 text-2xl shadow-2xl bg-[#eae5e5] w-[50%] text-center h-[100%]'><p>입사한지 ♥ + 999day</p></div>
            <div  className='m-5 text-2xl shadow-2xl bg-[#eae5e5] w-[50%] text-center h-[100%]'><p>올해 남은 연차</p></div>
            <div  className='m-5 text-2xl shadow-2xl bg-[#eae5e5] w-[50%] text-center h-[100%]'><p>오늘의 메뉴</p></div>
          </div>
          
        </div>


      
    </>
  );
};
export default MainPage;
