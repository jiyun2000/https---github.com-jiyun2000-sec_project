
const JobPageComponent = ({serverData, job, movePage}) => {
    return <div className="m-6 flex justify-center">
        {
        serverData.prev?(
            <div 
            className="m-2 p-2 w-16 text-center font-bold text-blue-400" 
            onClick={()=>{movePage({page:serverData.prevPage,jobNo:job.jobNo})}}>
                prev
            </div>
        ):(
            <></>
        )
    }

    {
        serverData.pageNumList.map(pageNum=>
            <div 
            className={`m-2 p-2 w-16 text-center rounded shadow-md text-blue ${serverData.current === pageNum}?'bg-gray-500':'bg-blue-400'}`}
            onClick={()=>movePage({page:pageNum,jobNo:job.jobNo})}
            key={pageNum}
            >
                {pageNum}
            </div>
        )
    }

    {
        serverData.next?(
            <div 
            className="m-2 p-2 w-16 text-center font-bold text-blue-400"
            onClick={()=>movePage({page:serverData.nextPage,jobNo:job.jobNo})}>
                next
            </div>
        ):(
            <></>
        )
    }
    </div>
}

export default JobPageComponent;