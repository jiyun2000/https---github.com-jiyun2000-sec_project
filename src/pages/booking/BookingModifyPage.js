import { useParams } from "react-router-dom"
import BookingModifyComponent from "../../components/booking/BookingModifyComponent";

const BookingModifyPage = () => {
    const {bookNo} = useParams();
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Booking Modify {bookNo}
            </div>
            <BookingModifyComponent bookNo = {bookNo}/>
        </div>
    )
}

export default BookingModifyPage;