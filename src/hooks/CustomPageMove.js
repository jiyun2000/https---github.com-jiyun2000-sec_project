import { createSearchParams, useNavigate, useSearchParams } from 'react-router';

const getNum = (param, defaultvalue) => {
  if (!param) {
    return defaultvalue;
  }
  return parseInt(param);
};
const getStr = (param, defaultvalue) => {
  if (!param) {
    return defaultvalue;
  }
  return param;
};

const useCustomPageMove = () => {
  const navigate = useNavigate();

  const [queryString] = useSearchParams();
  const page = getNum(queryString.get('page'), 1);
  const size = getNum(queryString.get('size'), 50);
  const cat = getStr(queryString.get('cat'), 'cat1');

  const queryDefault = createSearchParams({ page, size, cat }).toString();

  const moveToMain = () => {
    navigate({ pathname: `../main` });
  };

  const moveToLogin = () => {
    navigate({ pathname: `../` });
  };

  const moveToMailDetail = (pageParam) => {
    let queryStr = '';
    if (pageParam) {
      const pageNum = getNum(pageParam[0], 1);
      const sizeNum = getNum(pageParam[1], 50);
      const mailNum = getNum(pageParam[2], 0);
      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
        mailNo: mailNum,
      }).toString();
    } else {
      navigate({ pathname: `../list`, search: queryStr });
    }
    navigate({ pathname: `../detail`, search: queryStr });
  };

  return { moveToMain, moveToLogin, moveToMailDetail };
};
export default useCustomPageMove;
