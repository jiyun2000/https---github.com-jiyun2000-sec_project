import { useNavigate } from "react-router-dom";

const UseCustomMove = () => {

    const naviagte = useNavigate();

    const moveToDdt = () => {
        naviagte({pathname:`../ddt`})
    }

    return {moveToDdt};
}
export default UseCustomMove;