import { useParams } from "react-router-dom";
import TodayListComponent from "../../components/scheduleComponent/TodayListComponent";

const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        console.log(date);
        return null;
    }
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
};

const TodayListPage = () => {
    const { empNo, deptNo, selectDate } = useParams();

    console.log(empNo);  
    console.log(deptNo);
    console.log(selectDate);

    return (
        <TodayListComponent deptNo={deptNo} empNo={empNo} selectDate={formatDate(selectDate)} />
    );
};

export default TodayListPage;

