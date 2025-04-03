import ReactPaginate from "react-paginate"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  // react-paginate usa un índice base 0
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1)
  }

  return (
    <div className="flex justify-center mt-8">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="flex items-center px-2">
            <ChevronRight size={18} />
          </span>
        }
        previousLabel={
          <span className="flex items-center px-2">
            <ChevronLeft size={18} />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        forcePage={currentPage - 1} // base 0
        renderOnZeroPageCount={null}
        containerClassName="flex items-center space-x-1"
        pageClassName="flex items-center justify-center w-10 h-10 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
        pageLinkClassName="flex items-center justify-center w-full h-full"
        previousClassName="flex items-center justify-center w-10 h-10 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
        nextClassName="flex items-center justify-center w-10 h-10 rounded-md bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
        breakClassName="flex items-center justify-center w-10 h-10 text-gray-500"
        activeClassName="!bg-blue-600 !text-white border-blue-600"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  )
}

export default Pagination
