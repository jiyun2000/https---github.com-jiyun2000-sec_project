import { useParams } from "react-router-dom";
import TodayCommuteComponent from "../../components/employees/TodayCommuteComponent";

const TodayCommutePage = ({empNo}) => {

    return(
        <TodayCommuteComponent empNo={empNo} />
    )
}
export default TodayCommutePage;