import { ReactComponent as Logo } from '../../assets/icon/logo.svg';
import { ReactComponent as CaretRight } from '../../assets/icon/caret-right.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie, removeCookie } from '../../util/cookieUtil';

const NavigationComponent = () => {
  const [empNo, setEmpNo] = useState(getCookie('member').empNo);
  const [deptNo, setDeptNo] = useState(getCookie('member').deptNo);
  const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
  const menu = [  
    { name: '마이페이지', path: `/employees/read/${empNo}` },
    { name: '직원 현황', path: `/employees` },
    { name: '부서 현황', path: `/deptinfo` },
    { name: '직책 현황', path: `/job` },
    { name: '공지사항', path: `/board` },
    { name: '전자우편', path: `/mail` },
    { name: '스케줄', path: `/empDeptSchedule/read/${deptNo}/${empNo}` },
    { name: '예약', path: `/booking` },
    { name: '서류 작성', path: `/report/list/received` },
    { name: '채팅', path: `/chat/empList/${empNo}?page=1` },
    { name: '회의실 추가', path: `/room` }
  ];

  const [loc, setLoc] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loc !== '') {
      navigate(loc);
    }
  }, [loc]);

  const openMenu = (path) => {
    if (path.includes('/chat/empList')) {
      removeCookie('alert');
    }
    setLoc(path);
  };

  const confirmLog = () => {
    const isConfirm = window.confirm("로그아웃 하시겠습니까 ?");
    console.log(isConfirm);
    if(isConfirm){
      removeCookie('member');
      navigate('/');
    }else{
      navigate('/main');
    }
  }

  const logOut = () => {
    console.log('로그아웃');
    confirmLog();
  };

    return <nav className='flex flex-col items-center w-[260px] h-[100vh] bg-white font-medium text-[#333333] shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]'>
        <div className="py-10 flex justify-center w-14">
            <a href='/main'><Logo className='w-full cursor-pointer' /></a>
        </div>
        <ul className="w-full border-t border-gray-300">
            {menu.map((menu, index) => (
                deptNo===1?<li key={index} id={menu} onClick={()=>openMenu(menu.path)} className="w-full p-4 flex justify-between border-b border-gray-300 cursor-pointer hover:bg-[#bebebe]">
                    <span>{menu.name}</span>
                    {/* <CaretRight className='w-[6px] fill-[#333333]' /> */}
                </li>:<>
                  {menu.name!=='회의실 추가'?<li key={index} id={menu} onClick={()=>openMenu(menu.path)} className="w-full p-4 flex justify-between border-b border-gray-300 cursor-pointer hover:bg-[#bebebe]">
                    <span>{menu.name}</span>
                    {/* <CaretRight className='w-[6px] fill-[#333333]' /> */}
                </li>:<></>}
                </>
            ))}
        </ul>
        <div className='mt-4 w-full px-3'>
            <button className='w-full rounded-lg py-3 bg-[#FF7F7F] text-white hover:bg-[#cf6363] ' onClick={logOut}>로그아웃</button>
        </div>
    </nav>;
};

export default NavigationComponent;
