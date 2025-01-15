import { useOutletContext, useSearchParams } from 'react-router';
import { getDetail, getReceived } from '../api/mailApi';
import { useEffect, useState } from 'react';
import MailWriteModal from './MailWriteModal';
import MailNavComponent from './MailNavComponent';
import useCustomSearchParam from '../hooks/CustomSearchParam';

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
    <div className="h-full w-full flex flex-col">
      <MailNavComponent />
      <div className="border-2 border-black border-opacity-0 mt-5 mainMailBox">
        {mailData.title},{mailData.contents},{mailData.mailCategory},
        {mailData.sendDate}
        <br />
        {mailRecv.mailNo}
        {mailRecv.empDTO.map((data) => {
          return (
            <div>
              {data.firstName},{data.lastName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MailDetailComponent;
