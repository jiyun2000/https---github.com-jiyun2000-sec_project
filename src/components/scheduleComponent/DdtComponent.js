import { Link } from "react-router-dom";

const DdtComponent = () => {
    return (
        <>
        <div>
            Board
        </div>
        <div className="flex flex-row">
            <ul>
                <li><Link to='/myPage'>MyPage</Link></li>
                <li><Link to='/empList'>Employees List</Link></li>
                <li><Link to='/board'>Board</Link></li>
                <li><Link to='/email'>Email</Link></li>
                <li><Link to='/cloud'>Cloud</Link></li>
                <li><Link to='/book'>Book</Link></li>
                <li><Link to='/document'>Document</Link></li>
                <li><Link to='/setting'>Setting</Link></li>
                <li><Link to='/quit'>Quit</Link></li>
            </ul>
        </div>
        <div className="flex flex-col">
            
            <div >
                달력
            </div>

            <div >
             리스트
            </div>
        </div>
        </>
    )
}
export default DdtComponent;