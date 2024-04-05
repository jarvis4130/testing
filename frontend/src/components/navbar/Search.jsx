import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useParams, useNavigate, Link } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/app/search/${keyword}`);
    } else {
      navigate("/app");
    }
    // navigate()
    // console.log("clicked");
  };

  return (
    <div className=" bg-white-50 border-[1px] w-4/6 sm:w-full md:w-auto py-2 rounded-full  shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between ">
        <div className=" hidden sm:block text-sm font-semibold px-6 ">
          <Link to="/app/my-wishlist">My Wishlist</Link>
        </div>

        <Link
          to="/app/top-5-best"
          className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center "
        >
          {/* <div className="flex flex-row items-center gap-2">
            <div>Cart</div>
          </div> */}
          Top 5 Products.
        </Link>

        <div className=" text-sm pl-2 sm:pl-6 pr-2 text-gray-600  gap-2  items-center">
          <form onSubmit={handleSubmit} className="flex flex-row">
            <input
              type="text"
              name="search-items"
              className="border-none outline-none focus:outline-none "
              placeholder="Search an Item."
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <button
              type="submit"
              className="p-2 bg-rose-500 rounded-full text-white"
            >
              <BiSearch size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
