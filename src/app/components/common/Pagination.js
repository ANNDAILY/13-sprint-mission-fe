// src/components/common/Pagination.js
"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-xl border border-panda-200 text-sm font-semibold bg-white transition-colors ${
          currentPage === 1
            ? "text-panda-300 cursor-not-allowed bg-panda-50"
            : "text-panda-600 hover:bg-panda-100"
        }`}
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={`page-${pageNumber}`}
          onClick={() => onPageChange(pageNumber)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
            currentPage === pageNumber
              ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
              : "bg-white border border-panda-200 text-panda-600 hover:bg-panda-100"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-xl border border-panda-200 text-sm font-semibold bg-white transition-colors ${
          currentPage === totalPages
            ? "text-panda-300 cursor-not-allowed bg-panda-50"
            : "text-panda-600 hover:bg-panda-100"
        }`}
      >
        &gt;
      </button>
    </div>
  );
}
