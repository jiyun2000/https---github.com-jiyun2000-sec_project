import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultValue) => {
    if(!param){
        return defaultValue;
    }

    return parseInt(param);
}

const useCustomMove = () => {
    const navigate = useNavigate();

    const[queryString] = useSearchParams();

    const page = getNum(queryString.get('page'),1);
    const size = getNum(queryString.get('size'),10);

    const queryDefault = createSearchParams({page,size}).toString();

    const moveToRead = (num) => {
        navigate({pathname:`../read/${num}`, search:queryDefault});
    }

    const moveToReceivedReportRead = (num) => {
        navigate({pathname:`../read/received/${num}`, search:queryDefault});
    }

    const moveToSentReportRead = (num) => {
        navigate({pathname:`../read/sent/${num}`, search:queryDefault});
    }

    const moveToReportSent = (num) => {
        navigate({pathname:`../../report/list/sent/${num}`,search:queryDefault});
    }


    const moveToJobRead = (num) => {
        navigate({pathname:`../read/${num}`});
    }

    const moveToModify = (num) => {
        navigate({pathname:`../modify/${num}`,search:queryDefault});
    }

    const modifyAnnualLeave = (num) => {
        navigate({pathname:`../annualleave/modify/${num}`,search:queryDefault});
    }

    const moveToModifyCommute = (num) => {
        navigate({pathname:`../commute/modify/${num}`,search:queryDefault});
    }

    const moveToAddReport = (num) => {
        navigate({pathname:`../add/${num}`,search:queryDefault});
    }

    const moveToReportReceived = (num) => {
        navigate({pathname:`../../report/list/received/${num}`,search:queryDefault});
    }

    const moveToReportSentPage = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../../report/list/sent`,search:queryStr})
    
    };

    const moveToReportReceivedPage = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../../report/list/received`,search:queryStr})
    
    };

    const moveToList = (pageParam) => {
        let queryStr = '';
        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../list`,search:queryStr})
    };

    const moveToJobList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../read/${pageParam.jobNo}`,search:queryStr})
    };

    const moveToCommuteList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../commute/${pageParam.empNo}`,search:queryStr})
    };

    const moveToDeptInfoList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../read/${pageParam.deptNo}`,search:queryStr})
    };

    const moveToRoomList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname:`../read/${pageParam.roomNo}`,search:queryStr})
    };

    const moveToAdd = () => {
        navigate({pathname:`../add`});
    }

    const moveToAddExcel = () => {
        navigate({pathname:`../add/excel`});
    }

    const moveToAnnualLeave = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page,1);
            const sizeNum = getNum(pageParam.size,10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname : `../annualleave/${pageParam.empNo}`})
    }

    const moveToMenuList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);

            queryStr = createSearchParams({
                page : pageNum,
                size : sizeNum
            }).toString();
        }else{
            queryStr = queryDefault;
        }

        navigate({pathname: `../menu/list`, search: queryStr});
    };


    return {page, size,moveToReceivedReportRead, modifyAnnualLeave, moveToSentReportRead, moveToReportReceivedPage, moveToReportSentPage, moveToReportSent, moveToAddReport, moveToAddExcel, moveToReportReceived, moveToModifyCommute, moveToCommuteList, moveToAnnualLeave, moveToJobRead, moveToRead, moveToModify, moveToList, moveToJobList, moveToDeptInfoList, moveToRoomList, moveToAdd, moveToMenuList};
}

export default useCustomMove;