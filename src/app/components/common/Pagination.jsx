"use client";

const getVisiblePages = ({ currentPage, totalPages, visiblePageCount }) => {
  const safeTotalPages = Math.max(totalPages, 1);
  const pageCount = Math.min(visiblePageCount, safeTotalPages);
  const half = Math.floor(pageCount / 2);
  let startPage = currentPage - half;
  let endPage = startPage + pageCount - 1;

  if (startPage < 1) {
    startPage = 1;
    endPage = pageCount;
  }

  if (endPage > safeTotalPages) {
    endPage = safeTotalPages;
    startPage = Math.max(endPage - pageCount + 1, 1);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  visiblePageCount = 5,
}) {
  if (totalPages <= 1) return null;

  const visiblePages = getVisiblePages({
    currentPage,
    totalPages,
    visiblePageCount,
  });

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-panda-200 bg-white text-sm font-semibold transition-colors ${
          currentPage === 1
            ? "cursor-not-allowed bg-panda-50 text-panda-300"
            : "text-panda-600 hover:bg-panda-100"
        }`}
        aria-label="이전 페이지"
      >
        &lt;
      </button>

      {visiblePages.map((pageNumber) => (
        <button
          key={`page-${pageNumber}`}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
            currentPage === pageNumber
              ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
              : "bg-white border border-panda-200 text-panda-600 hover:bg-panda-100"
          }`}
          aria-current={currentPage === pageNumber ? "page" : undefined}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-panda-200 bg-white text-sm font-semibold transition-colors ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-panda-50 text-panda-300"
            : "text-panda-600 hover:bg-panda-100"
        }`}
        aria-label="다음 페이지"
      >
        &gt;
      </button>
    </div>
  );
}
