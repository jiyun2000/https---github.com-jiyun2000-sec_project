import { Outlet } from 'react-router';
import MainLayout from '../../layouts/MainLayout';
import { useEffect, useState } from 'react';
import { getCookie } from '../../util/cookieUtil';
import { getMailList } from '../../api/mailApi';

const initState = {
  dtoList: [],
  pageNumList: [],
  requestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPageL: 0,
  current: 0,
};
const MailPage = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(50);
  const [cat, setCat] = useState('cat1');
  const [mailNo, setMailNo] = useState(0);
  const [mailData, setMailData] = useState(initState);
  useEffect(() => {
    getMailList([page, size, cat, getCookie('member').email]).then((data) => {
      setMailData(data);
    });
  }, [page, size, cat]);
  return (
    <>
      <MainLayout
        children={
          <Outlet
            context={{
              page,
              size,
              cat,
              mailNo,
              mailData,
              setPage,
              setSize,
              setCat,
              setMailNo,
              setMailData,
            }}
          />
        }
      />
    </>
  );
};
export default MailPage;
