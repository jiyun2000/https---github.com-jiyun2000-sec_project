import JobAddComponent from "../../components/job/JobAddComponent"

const JobAddPage = () => {
    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                직무 등록 페이지
            </div>

            <JobAddComponent/>
        </div>
    )
}

export default JobAddPage;