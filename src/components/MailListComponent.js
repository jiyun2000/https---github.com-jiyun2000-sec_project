import { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router';
import { getCookie } from '../util/cookieUtil';
import { getMailList } from '../api/mailApi';
import useCustomPageMove from '../hooks/CustomPageMove';
import '../css/mainMailBox.css';
import MailNavComponent from './MailNavComponent';
import useCustomSearchParam from '../hooks/CustomSearchParam';

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
const MailListComponent = () => {
  const { moveToMailDetail } = useCustomPageMove();
  const {page,size, cat,mailNo,setPage,setSize,setCat,setMailNo} = useOutletContext();
  const [mailData, setMailData] = useState(initState);
  const temp = 'border-blue-400';
  useEffect(() => {
    getMailList([page, size, cat, getCookie('member').email]).then((data) => {
      setMailData(data);
    });
  }, [page, size, cat]);

  const chgCat = (param) => {
    setCat(param);
  }

  return (
    <div className="h-full w-full flex flex-col">
      <MailNavComponent />
      <div className="border-2 border-black border-opacity-0 mt-5 mainMailBox">
        <div className="w-full flex flex-wrap text-center">
          <div className="w-3/4 flex flex-wrap m-0">
            {cat == 'cat1' ? (
              <div
                className="w-44 border-b-4 border-blue-400 text-3xl"
                onClick={() => chgCat('cat1')}
              >
                기본
              </div>
            ) : (
              <div
                className="w-44 border-b-4 bg-gray-100 text-3xl"
                onClick={() => chgCat('cat1')}
              >
                기본
              </div>
            )}
            {cat == 'cat2' ? (
              <div
                className="w-44 border-b-4 border-blue-400 text-3xl"
                onClick={() => chgCat('cat2')}
              >
                중요
              </div>
            ) : (
              <div
                className="w-44 border-b-4 bg-gray-100 text-3xl"
                onClick={() => chgCat('cat2')}
              >
                중요
              </div>
            )}
            {cat == 'mysend' ? (
              <div
                className="w-44 border-b-4 border-blue-400 text-3xl"
                onClick={() => chgCat('mysend')}
              >
                보낸메일
              </div>
            ) : (
              <div
                className="w-44 border-b-4 bg-gray-100 text-3xl"
                onClick={() => chgCat('mysend')}
              >
                보낸메일
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap flex-col">
          {mailData.dtoList.map((mail) => {
            return (
              <>
                <div
                  className="w-full flex border-2 h-12 border-b-gray-300 cursor-pointer "
                  onMouseOver={(evt) => {
                    evt.currentTarget.classList.remove('border-b-gray-300');
                    evt.currentTarget.classList.add('border-b-blue-400');
                  }}
                  onMouseOut={(evt) => {
                    evt.currentTarget.classList.remove('border-b-blue-400');
                    evt.currentTarget.classList.add('border-b-gray-300');
                  }}
                  onClick={(evt) => {
                    moveToMailDetail([page, size, mail.mailNo]);
                  }}
                >
                  <div className="w-60 min-w-60 m-auto ml-4 flex-row flex">
                    <div className="w-1/4 bg-red-500">1</div>
                    <div className="w-1/4 bg-blue-500">2</div>
                    <div className="w-1/4 bg-green-500">3</div>
                    <div className="w-1/4 bg-pink-500">4</div>
                  </div>
                  <div className="w-full m-auto ml-8 max-w-full truncate bg-gray-100">
                    {mail.title} - {mail.contents}{' '}
                    어쩌구저쩌구쫑알쫑알재잘재잘옹알왱알
                  </div>
                  <div className="min-w-48 m-auto">{mail.sendDate}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MailListComponent;
