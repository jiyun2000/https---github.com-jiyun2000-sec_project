import {
  createSearchParams,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router';
import useCustomSearchParam from '../hooks/CustomSearchParam';
import '../css/mainMailBox.css';
import MailWriteModal from './MailWriteModal';
import TestingMemo from './TestingMemo';
import { useEffect } from 'react';

const MailNavComponent = () => {
  const { getNum, getStr } = useCustomSearchParam();
  const navigate = useNavigate();
  const [queryString] = useSearchParams();
  const {
    page,
    size,
    cat,
    mailNo,
    mailData,
    setPage,
    setSize,
    setCat,
    setMailNo,
  } = useOutletContext();
  // const curPage = getNum(queryString.get('page'), 1);
  // const size = getNum(queryString.get('size'), 50);
  // const cat = getStr(queryString.get('cat'), 'cat1');
  const pageMove = (val) => {
    // let page = curPage + val;
    // let qStr = createSearchParams({ page, size, cat }).toString();
    // navigate({ pathName: `../list`, search: qStr });
    setPage(page + val);
  };
  const newTotals = Math.ceil((mailData ? mailData.totalCnt : 1) / size);
  return (
    <div className="h-20 flex flex-row shadow-lg">
      <div className=" w-[30%]">
        <MailWriteModal />
      </div>
      <div className=" w-[70%] flex flex-row">
        <div>
          {page} of {newTotals ? newTotals : 1}
        </div>

        <div>
          {page < newTotals ? (
            <img
              className="size-5 cursor-pointer"
              onClick={() => {
                pageMove(1);
              }}
              src={require('../assets/icon/angle-right.png')}
            ></img>
          ) : (
            <></>
          )}
          {page > 1 ? (
            <img
              className="size-5 cursor-pointer"
              onClick={() => {
                pageMove(-1);
              }}
              src={require('../assets/icon/angle-left.png')}
            ></img>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};
export default MailNavComponent;
