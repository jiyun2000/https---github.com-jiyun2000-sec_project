import { useEffect, useState } from "react";
import { todayCommute } from "../../api/commuteApi"; 

const TodayCommuteComponent = ({empNo}) => {
    const [commuteData, setCommuteData] = useState(null);

    useEffect(() => {
        if (empNo) {
            todayCommute(empNo)  
                .then((response) => {
                    console.log(JSON.stringify(response)); 
                    const { data } = response; 
                    if (data) {
                        setCommuteData(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [empNo]);

    if (!commuteData) {
        return <p>오늘 출근 안함!</p>;
    }
    
    return (
        <div>
            <p>출근 시간: {commuteData.checkInTime}</p>
            <p>퇴근 시간: {commuteData.checkOutTime}</p>
        </div>
    );
};

export default TodayCommuteComponent;
