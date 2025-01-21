import { useOutletContext, useSearchParams } from 'react-router';
import { getDetail, getReceived } from '../api/mailApi';
import { useEffect, useState } from 'react';
import MailWriteModal from './MailWriteModal';
import MailNavComponent from './MailNavComponent';
import useCustomSearchParam from '../hooks/CustomSearchParam';
import BoardTitleComponent from "./board/BoardTitleComponent";
import { Link } from 'react-router-dom';
import mail from '../assets/icon/mail.png';
import chat from '../assets/icon/chat.png';
import { getCookie } from '../util/cookieUtil';


const initMailDetail = {
  contents: '',
  title: '',
  mailCategory: '',
  mailNo: 0,
  sendDate: '',
};
const initMailReceived = {
  empDTO: [],
  mailNo: 0,
};

const MailDetailComponent = () => {
  const [queryString] = useSearchParams();
  const { getNum } = useCustomSearchParam();
  const { page, size, cat, setPage, setSize, setCat } = useOutletContext();
  const mailNo = getNum(queryString.get('mailNo'), 0);
  const [mailData, setMailData] = useState(initMailDetail);
  const [mailRecv, setMailRecv] = useState(initMailReceived);
  const [empNo, setEmpNo] = useState(getCookie("member").empNo);
  useEffect(() => {
    getDetail({ page, size, mailNo }).then((data) => {
      console.log(data);
      setMailData(data);
    });
    getReceived({ mailNo }).then((data) => {
      console.log(data);
      setMailRecv(data);
    });
  }, []);

  return (
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


    <div className="h-full w-full flex flex-col">
      <MailNavComponent />
      <div className="border-2 border-black border-opacity-0 mt-5 mainMailBox">
        <div className='flex flex-col'>
          <div className='text-3xl font-semibold text-center'> {mailData.title}</div>
          <div className='text-2xl text-center'>{mailData.contents}</div>
          <div className='flex flex-row text-center justify-center text-2xl'>
            <div>{mailData.mailCategory}</div>
            <div>{mailData.sendDate}</div>
            <div>{mailRecv.mailNo}</div>
          </div>
          <div>
            {mailRecv.empDTO.map((data) => {
              return (
                <div className='flex flex-row text-2xl text-center justify-center'>
                  {data.firstName},{data.lastName}
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  </div>
  );
};
export default MailDetailComponent;
