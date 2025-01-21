import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove";
import { getOneCommute, putOne } from "../../api/commuteApi";
import BoardTitleComponent from '../board/BoardTitleComponent';
import { Link } from 'react-router-dom';
import mail from '../../assets/icon/mail.png';
import chat from '../../assets/icon/chat.png';

const initState = {
    commNo : 0 ,
    checkDate : '',
    checkInTime : '',
    checkOutTime : '',
    empNo : 0
}

const CommuteModifyComponent = ({commNo}) => {
    const [commute, setCommute] = useState({...initState});

    const {moveToCommuteList} = useCustomMove();

    useEffect(()=>{
        getOneCommute(commNo).then(data=>{
            setCommute(data);
        });
    },[commNo]);

    const handleClickModify = () => {
        putOne(commute.empNo,commute).then(()=>{
            moveToCommuteList(commute);
        }
        );
    }

    const handleChangeCommute = (evt) => {
        
        commute[evt.target.name] = evt.target.value;
        setCommute({...commute});
    }

    return (
        <div>
            <div className="flex justify-between items-center w-full bg-white shadow-lg rounded-md mb-8 px-6 py-4">
            <div className="flex items-center space-x-8">
                <div className="text-2xl font-semibold text-blue-800 select-none">
                    [공지사항]
                </div>
                <div className="w-64 text-2xl font-semibold cursor-pointer">
                    <BoardTitleComponent />
                </div>
            </div>
            <div className="flex space-x-4">
                <Link to="/mail" className="w-12 cursor-pointer">
                    <img src={mail} alt="Mail" className="w-full" />
                </Link>
                <Link to={`/chat/empList/${commute.empNo}?page=1`} className="w-12 cursor-pointer">
                    <img src={chat} alt="Chat" className="w-full" />
                </Link>
            </div>
        </div>


        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10 mb-4">
                <div className="w-1/5 p-6 text-right font-bold">CommuteNo</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{commute.commNo}</div>
            </div>

            <div className="flex justify-center mb-4">
                <div className="w-1/5 p-6 text-right font-bold">EmpNo</div>
                <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{commute.empNo}</div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Date</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="checkDate"
                    type={'date'} 
                    value={commute.checkDate}
                    onChange={handleChangeCommute}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Check In</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="checkInTime"
                    type={'time'} 
                    value={commute.checkInTime}
                    onChange={handleChangeCommute}></input>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Check Out</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" 
                    name="checkOutTime"
                    type={'time'} 
                    value={commute.checkOutTime}
                    onChange={handleChangeCommute}></input>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button"
                className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={handleClickModify}>
                    Modify
                </button>
            </div>
        </div>
    </div>
    )
}

export default CommuteModifyComponent;