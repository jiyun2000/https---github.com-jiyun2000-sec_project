import { useParams } from "react-router-dom"
import MenuModComponent from "../../components/menu/MenuModComponent";

const MenuModPage = () => {
    const { menuNo } = useParams();
    return(
        <>
            <MenuModComponent menuNo={menuNo} />
        </>
    )
}
export default MenuModPage;