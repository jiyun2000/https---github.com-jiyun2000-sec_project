import { Outlet } from 'react-router';
import MainLayout from '../../layouts/MainLayout';
import { useState } from 'react';

const MailPage = () => {
  const [page,setPage] = useState(1);
  const [size,setSize] = useState(50);
  const [cat,setCat] = useState('cat1');
  const [mailNo,setMailNo] = useState(0);
  return (
    <>
      <MainLayout children={<Outlet context={{page,size,cat,mailNo,setPage,setSize,setCat,setMailNo}} />} />
    </>
  );
};
export default MailPage;
