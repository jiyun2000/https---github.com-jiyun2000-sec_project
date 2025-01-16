import BookingAddComponent from "../../components/booking/BookingAddComponent"

const BookingAddPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                대실 등록 페이지
            </div>

            <BookingAddComponent/>
        </div>
    )
}

export default BookingAddPage;