import { useCallback, useEffect, useRef, useState } from "react";
import upload from "../../assets/icon/upload.png";

import { delImg, getEmpImageOne, modImg, register, updateImg } from "../../api/employeesImageApi"; 
import { getCookie, removeCookie } from "../../util/cookieUtil";
import { getOneEmp } from "../../api/employeesApi";
import m from "../../assets/icon/m.png";
import w from "../../assets/icon/w.png";
import mail from "../../assets/icon/mail.png";
import chat from "../../assets/icon/chat.png";
import colorChat from "../../assets/icon/colorChat.png";
import { Link, useNavigate } from "react-router-dom";
import BoardTitleComponent from "../board/BoardTitleComponent";

export const API_SERVER_HOST = 'http://localhost:8080';

const initState = {
    empNo: 0,
    url: '',
    files: [],

}

const EmpImageComponent = () => {
    const dndRef = useRef();

    const [fileList, setFileList] = useState({ ...initState });
    const fileId = useRef();
    const [cookEmpNo, setCookEmpNO] = useState(getCookie('member').empNo);
    const [empData, setEmpData] = useState('');
    const [getEmpImage, setGetEmpImage] = useState(null);
    const [uuidImg, setUuidImg] = useState('');
    const navigate = useNavigate();
    const [chatCntCook, setChatCntCook] = useState(getCookie("alert"));
    

    useEffect(() => {
        getOneEmp(cookEmpNo).then((data) => {
            setEmpData(data);
        }).catch((error) => {
            console.log(error);
        });
    }, [cookEmpNo]);

    useEffect(() => {
        console.log(cookEmpNo);
        getEmpImageOne(cookEmpNo).then((data) => {
            if (data != null) {
                setGetEmpImage(data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [cookEmpNo]);

    useEffect(() => {
        console.log("Image UUID:", getEmpImage?.uuid);
        if (getEmpImage?.uuid) {
            setUuidImg(`${API_SERVER_HOST}/api/empImage/view/${getEmpImage.uuid}`);
        }
    }, [getEmpImage]);

    const updateImage = () => {
        const fileList = fileId.current.files;
        if (fileList.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < fileList.length; i++) {
                formData.append('files', fileList[i]);
            }

            formData.append('empNo', cookEmpNo);
            formData.append('url', fileList[0].name);

            updateImg(formData, cookEmpNo, fileList).then((response) => {
                alert("프로필 사진이 변경되었습니다.");
            }).catch((error) => {
                console.log(error);
            });
        } else {
            alert("이미지를 선택하세요");
        }
    };

     const checkRemove = () => {
        removeCookie("alert");
    }

    const deleteImg = () => {
        delImg(cookEmpNo);
        alert("삭제되었습니다.");
    }

    const goToBoardList = () => {
        navigate(`/board/list`)
      }
    

    return (
        <>
        <div>
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-md mb-8">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-semibold text-blue-800 select-none  cursor-pointer" onClick={goToBoardList}>
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
                    <Link to={`/chat/empList/${cookEmpNo}?page=1`} className="w-12 cursor-pointer" onClick={()=>checkRemove()}>
                    {chatCntCook  ? 
                        <img src={colorChat} alt='colorChat' className='w-full' /> :
                        <img src={chat} alt="Chat" className="w-full" />
                    }
                    </Link>
                </div>
            </div>


            <div className="m-6">
                <h2 className="font-semibold text-2xl text-center">{empData.firstName} {empData.lastName}님</h2>
                <p className="text-2xl text-center m-3">프로필 사진 변경</p>
            </div>

            <div className="w-[50%] flex flex-col items-center justify-center m-5 gap-7">
                <p>현재 사진</p>

                
                {getEmpImage && getEmpImage.uuid ? (
                    <img src={`${API_SERVER_HOST}/api/empImage/view/${getEmpImage.uuid}`} alt="Profile" className="w-[200px] h-[200px]" />  
                ) : (
                    empData.gender === 'm' ? 
                        <img src={m} alt="man" className="w-[200px] h-[200px]" /> : 
                        <img src={w} alt="woman" className="w-[200px] h-[200px]" />
)}

            </div>

            <div className="flex flex-row">
                <div className="flex flex-row justify-center">
                    <label ref={dndRef} className="w-[50%] items-center justify-center inline-block">
                        <img src={upload} alt="upload" className="w-[20%]" />
                        <input ref={fileId} type="file" hidden="true" multiple="true" />
                    </label>
                </div>

                <div>
                    <div className="bg-[#83a3d0] text-white hover:bg-[#718aab] rounded-md p-2"
                        onClick={updateImage}>
                        이미지 변경
                    </div>
                    <div>
                        <button onClick={deleteImg}>이미지 삭제</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};


export default EmpImageComponent;