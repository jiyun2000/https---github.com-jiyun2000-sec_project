import { ReactComponent as Logo } from '../../assets/icon/logo.svg';
import { ReactComponent as CaretRight } from '../../assets/icon/caret-right.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCookie, removeCookie } from '../../util/cookieUtil';

const NavigationComponent = () => {
     const [empNo, setEmpNo] = useState(getCookie("member").empNo);
    const [deptNo, setDeptNo] = useState(getCookie("member").deptNo);

    const menu = [ 
                    {name:'마이페이지',path:`/employees/read/${empNo}` },
                    {name:'직원 현황', path:`/employees`},
                    {name:'부서 현황', path:`/deptinfo`},
                    {name:'직책 현황', path:`/job`},
                    {name:'게시판', path : `/board`},
                    {name:'전자우편', path:`/mail`},
                    {name:'스케줄', path:`/empDeptSchedule/read/${deptNo}/${empNo}`},
                    {name:'예약', path:`/booking`},
                    {name:'서류 작성', path:`/report/list/received/${empNo}`},
                    {name:'채팅', path:`/chat/empList/${empNo}?page=1`}
                ];

    const [loc, setLoc] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(loc!==''){
            navigate(loc);
        }
        
    },[loc]);

    const openMenu = (path) => {
        setLoc(path);
    }

    const logOut = () => {
        console.log("로그아웃");
        removeCookie("member");
        navigate("/");
    }

    return <nav className='flex flex-col items-center w-[260px] h-[100vh] bg-white font-medium text-[var(--color-light-black)] shadow-[4px_0_6px_-1px_rgba(0,0,0,0.1)]'>
        <div className="py-10 flex justify-center w-14">
            <a href='/main'><Logo className='w-full cursor-pointer' /></a>
        </div>
        <ul className="w-full border-t border-gray-300">
            {menu.map((menu, index) => (
                <li key={index} id={menu} onClick={()=>openMenu(menu.path)} className="w-full p-4 flex justify-between border-b border-gray-300 cursor-pointer hover:bg-[var(--color-faint-gray)]">
                    <span>{menu.name}</span>
                    <CaretRight className='w-[6px] fill-[var(--color-light-black)]' />
                </li>
            ))}
        </ul>
        <div className='mt-4 w-full px-3'>
            <button className='w-full rounded-lg py-3 bg-[var(--color-red)] text-white hover:bg-[var(--color-dark-red)]' onClick={logOut}>로그아웃</button>
        </div>
    </nav>;
};

export default NavigationComponent;