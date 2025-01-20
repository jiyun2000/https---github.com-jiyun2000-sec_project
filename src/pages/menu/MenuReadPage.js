import { useParams } from "react-router-dom";
import MenuReadComponent from "../../components/menu/MenuReadComponent"

    const MenuReadPage = () => {
     const { menuNo } = useParams();
     console.log(menuNo);
    return(
        <>
            <MenuReadComponent menuNo={menuNo}/>
        </>
    )
}
export default MenuReadPage;