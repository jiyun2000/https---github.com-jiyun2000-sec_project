import { useCallback, useEffect, useRef, useState } from "react";
import upload from "../../assets/icon/upload.png";
import { getEmpImageOne, register } from "../../api/employeesImageApi";
import { getCookie } from "../../util/cookieUtil";
import { getOneEmp } from "../../api/employeesApi";

const initState = {
    empImgNo : 0,
    empNo : 0,
    url : '',
    files : [],
    uploadFileNames : ''
}

const EmpImageComponent = () => {
    const dndRef = useRef();
    const [isExtraShow, setIsExtraShow] = useState();
    const [fileList, setFileList] = useState({...initState});
    const fileId = useRef();
    const [cookEmpNo, setCookEmpNO] = useState(getCookie('member').empNo);
    console.log("이 사람 empNo = " + cookEmpNo);
    const [empData, setEmpData] = useState('');
    const [getEmpImage, setGetEmpImage] = useState('');
    

    useEffect(()=>{
        getOneEmp(cookEmpNo).then((data)=>{
            setEmpData(data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    // const onChangeFile = useCallback(
    //     (evt) => {
    //         console.log('file change');
  
    //         let files = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
    //         let listTemp = [...fileList];
    //         for (let file of files) {
    //         listTemp.push({ id: fileId.current++, file: file });
    //         }
    //         if (evt.type === 'change') {
    //         evt.target.value = null;
    //         }
    //         setFileList(listTemp);
    //     },
    //     [fileList]
    //     );

        const sendImage = () => {
            const fileList = fileId.current.files;

            const formData = new FormData();
            
            for(let i = 0; i<fileList.length; i++){
                formData.append('files',fileList[i]);
            };

            formData.append('empImgNo', fileList.empImgNo);
            formData.append('empNo',fileList.empNo);
            formData.append('url',fileList.url);
            formData.append('uploadFileNames',fileList.uploadFileNames);
            console.log(formData.files);
            
            register(formData);  
            console.log("등록 성공");//실패잖아 ;;;;;;;;;;;;;;;
           
            }


    useEffect(()=>{
        console.log(cookEmpNo); //잘받음
        getEmpImageOne(cookEmpNo).then((data) => {
            console.log("dd" + data);
            if(data != null){
                setGetEmpImage(data);
            }else{
                return;
            }
            
        }).catch((error)=>{
            console.log(error);
        })
    }, []);

    return(
        <>
        <div className="m-6">
            <h2 className="font-semibold text-2xl text-center">{empData.firstName}{empData.lastName}</h2>
            <p className="text-xl text-center m-3">프로필 사진을 등록하세요</p>
        </div>

        <div className="w-[50%] flex flex-row items-center justify-center m-5 gap-7">
            <p>현재 사진</p>
            {getEmpImage ? <img src={getEmpImage.url}/> : <></> }
            {/* {getEmpImage.url} */}
        </div>

        <div className='flex flex-row'>
            <div className='flex flex-row justify-center'>
                <label ref={dndRef} className='w-[50%] items-center justify-center'>
                        <img src={upload} alt='upload' className='w-[20%]'/>
                        <input
                            ref={fileId}
                            type="file"
                            hidden="true"
                            multiple="true"
                            // onChange={(evt) => {
                            //     onChangeFile(evt);
                            // }}
                        ></input>
                </label>
            </div>
            <div
            onClick={() => {
                setIsExtraShow(true);
            }}
            ></div>
        
            
            <div>
                <div className='bg-[#83a3d0] text-white hover:bg-[#718aab] rounded-md p-2 '
                    onClick={() => {
                        sendImage({
                            files: fileList,
                        });
                        }}
                >
                    이미지 변경
                </div>
            </div>
        </div>   
        </>
    )
}
export default EmpImageComponent;