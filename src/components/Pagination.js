import React from "react";
import '../css/pagination.css'
const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const pages =[];

    for (let i =1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                disabled={currentPage === i}
            >
                {i}
            </button>
        );
    }
    return (
        <div className="pagination">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
            Previous
        </button>
        {pages}
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            Next
        </button>
    </div>
    )
}
export default Pagination