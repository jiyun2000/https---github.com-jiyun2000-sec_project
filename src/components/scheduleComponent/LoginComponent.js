import { NavItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({empNo, deptNo}) => {


    const navigate = useNavigate();
    const goToMain = () => {
        navigate(`/ddt/${empNo}/${deptNo}`);
    }

    return (
        <div className="flex flex-col items-center justify-center bg-blue-200 max-w-sm w-full">
            <div className="bg-blue-200" onSubmit={goToMain}>
                <form >
                    <div>
                        아이디 : <div className="border border-black flex shadow-md"><input type="text" name="id"/></div>
                    </div>

                    <div>
                        비밀번호 : <div className="border border-black flex shadow-md"><input type="password" name="pw"/></div>
                    </div>

                    <div className="rounded p-4 m-2 text-xl w-32 text-blue-400 border border-blue-400 bg-white hover:text-white hover:border-blue-500 hover:bg-blue-400 cursor-pointer">
                        <button type="submit">로그인</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
export default LoginComponent;