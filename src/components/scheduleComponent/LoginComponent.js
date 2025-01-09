import UseCustomMove from "../../useCustom/UseCustomMove";

const LoginComponent = () => {

    const {moveToDdt} = UseCustomMove();

    const goMainPage = (e) => {
        e.preventDefault();
        moveToDdt();
    }

    return (
        <div className="flex flex-col items-center justify-center bg-blue-200 max-w-sm w-full">
            <div>
                {/* 회사 로고 들어가면 됨. */}
                <img />
            </div>
            <div className="bg-blue-200 ">
                <form onSubmit={goMainPage}>
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