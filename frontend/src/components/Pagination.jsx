function Pagination({currentPage,setCurrentPage,totalItems,itemsPerPage,}) 

{

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (

        <>
            <div className="pagination">

                <button

                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>


                <button

                    onClick={() => setCurrentPage(currentPage + 1)}

                >
                    Next
                </button>


            </div>
        </>
    );
}
export default Pagination;