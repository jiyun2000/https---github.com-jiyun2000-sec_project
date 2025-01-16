import { useParams } from "react-router-dom"
import BookingModifyComponent from "../../components/booking/BookingModifyComponent";

const BookingModifyPage = () => {
    const {bookNo} = useParams();
    return (
        <div >
           
            <BookingModifyComponent bookNo = {bookNo}/>
        </div>
    )
}

export default BookingModifyPage;