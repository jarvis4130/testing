import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "./Button";

function Pagination({ pages }) {
  const pagesToShow = Math.min(pages, 3);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newPage = parseInt(queryParams.get("page")) || 1;
    setCurrentPage(newPage);
  }, [location.search]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        navigate(`/app?page=${newPage}`);
        return newPage;
      });
    }
  };

  const handleNextClick = () => {
    if (currentPage < pages) {
      setCurrentPage((nextPage) => {
        const newPage = nextPage + 1;
        navigate(`/app?page=${newPage}`);
        return newPage;
      });
    }
  };

  // console.log(currentPage);

  return (
    <>
      {pages > 1 && (
        <div className="flex justify-center gap-2 my-4">
          <div className="w-14">
            <Button actionLabel={"Prev"} onClick={handlePrevClick} />
          </div>
          <div className="flex flex-row gap-2">
            {[
              ...Array(Math.min(pagesToShow, pages - currentPage + 1)).keys(),
            ].map((x) => (
              <Link
                key={currentPage + x}
                to={`/app?page=${currentPage + x}`}
                className={`border border-neutral-300 px-4 py-3 rounded-md ${
                  currentPage + x === currentPage
                    ? "text-white bg-rose-900"
                    : "bg-neutral-100"
                }`}
              >
                <div>{currentPage + x}</div>
              </Link>
            ))}
          </div>
          <div className="w-14">
            {
              // currentPage<pages-pagesToShow+1 &&
              <Button actionLabel={"Next"} onClick={handleNextClick} />
            }
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
