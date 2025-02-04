import { useEffect, useState } from "react";
import { getTodayMenu } from "../../api/menuApi";
const MenuComponent = () => {
    const menuDate = new Date();
    const [menuData, setMenuData] = useState(null);
  
    useEffect(() => {
      getTodayMenu(menuDate).then((response) => {
        const { data } = response;
        if (data) {
          setMenuData(data);
        }
      }).catch((error) => {
        console.log(error);
      });
    }, []);
  
    if (!menuData) {
      return <p>오늘은 메뉴가 없습니다.</p>;
    }
  
    return (
      <>
        <div>
          <div className="flex flex-col">
            <div className="font-medium text-lg">{menuData.mainMenu}</div>
            <div className="font-medium text-lg">
              {menuData.firSideDish} | {menuData.secSideDish} | {menuData.thirdSideDish}
            </div>
            <div className="font-medium text-lg">{menuData.dessert}</div>
          </div>
        </div>
      </>
    );
  };
  
export default MenuComponent;