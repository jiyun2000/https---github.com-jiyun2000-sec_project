import { useEffect } from 'react';
import { getCookie } from '../util/cookieUtil';
import useCustomPageMove from '../hooks/CustomPageMove';

const BasicMenu = () => {
  return (
    <>
      <div className="fixed w-[15%] min-w-[200px] h-screen bg-green-300">
        BasicMenu
      </div>
    </>
  );
};
export default BasicMenu;
