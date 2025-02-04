import { useEffect, useState } from "react";
import { countRead } from "../../api/annualLeaveApi";

const initState = {
    hours : 0
}
const AnnualLeaveCountComponent = ({empNo}) => {
        console.log(empNo); //받음

    const [annual, setAnnual] = useState(initState);

    useEffect(()=>{
        console.log(empNo)
        countRead(empNo).then((data) => {
            console.log(data); //undefined
            setAnnual(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [empNo])
    return (
        <>
            <div>
                {annual ? annual.hours : '0'} 시간
            </div>
        </>
    )
}
export default AnnualLeaveCountComponent;