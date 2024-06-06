import React from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrev, onNext }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className=" border rounded-sm flex items-center justify-between  bg-white">
      <button
        className={`hover:bg-gray-200 rounded-md p-2 border-r ${
          isFirstPage ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={onPrev}
        disabled={isFirstPage}
      >
        <ArrowBackIcon />
      </button>
      <div>
        Página {currentPage} de {totalPages}
      </div>
      <button
        className={`hover:bg-gray-200 rounded-md p-2 border-l ${
          isLastPage ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={onNext}
        disabled={isLastPage}
      >
        <ArrowForwardIcon />
      </button>
    </div>
  );
};

export default Pagination;
