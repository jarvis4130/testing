import { useEffect, useState } from "react";
import { formatCurrency } from "../helper/helper";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAddtowishlistMutation } from "../slices/usersApiSlice";
import { USERS_URL } from "../../constant";
import axios from "axios";

function ProductCard({
  productId,
  ratings,
  mrp,
  priceAfterDiscount,
  shortDescription,
  discountPercentage,
  onClick,
  imgPath,
  brandName,
}) {
  const [wishlist, setWishlist] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  // console.log(userInfo?.data?.user);
  const id = userInfo?.data?.user?._id;

  const [productWishlist] = useAddtowishlistMutation();

  useEffect(() => {
    const fetchUserAndCheckWishlist = async () => {
      try {
        // Fetch the user data
        const userResponse = await axios.get(`${USERS_URL}/${id}`);
        // console.log(userResponse.data.data.doc.wishlist);
        const userWishlist = userResponse.data.data.doc.wishlist;

        // Check if the product is in the wishlist
        const isProductInWishlist = userWishlist.some(
          (item) => item.product === productId
        );
        // Update the wishlist state based on the result
        setWishlist(isProductInWishlist);
      } catch (error) {
        // toast.error(error?.data?.message || error.error)
        // console.error("Error fetching user or checking wishlist:", error);
      }
    };

    // Call the async function inside useEffect
    fetchUserAndCheckWishlist();
  }, []);

  async function addToWishlist(e) {
    e.stopPropagation();
    toast.success("Wishlist Updated.");
    setWishlist((value) => !value);

    const res = await productWishlist({
      userId: id,
      productData: { productId: productId },
    }).unwrap();
  }

  return (
    <div
      className=" bg-yellow-100 flex flex-col rounded-md border focus:outline-none focus:ring hover:-translate-y-2 shadow-lg p-2 cursor-pointer "
      onClick={onClick}
    >
      <div className=" bg-slate-50 relative border">
        <div
          className="absolute right-1 sm:right-5 top-5 cursor-pointer bg-slate-300 w-10 h-10 rounded-full flex items-center justify-center z-30 "
          onClick={
            userInfo
              ? addToWishlist
              : (e) => {
                  e.stopPropagation();
                  toast.error("Please Login.");
                }
          }
        >
          {wishlist ? <FaHeart /> : <CiHeart />}
        </div>
        <img src={imgPath} alt="" className="h-52 object-contain w-full " />
        {discountPercentage ? (
          <div className=" absolute right-1 sm:right-5 bottom-5 bg-red-400 w-10 h-10 rounded-full flex items-center justify-center z-30">
            <p> {discountPercentage}% </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <div className="flex justify-between">
          <s className="font-medium">{formatCurrency(mrp)} </s>
          <p className="font-medium"> {formatCurrency(priceAfterDiscount)} </p>
        </div>
        <div className="flex justify-between">
          <h1 className="font-bold">{brandName}</h1>
          <p className="font-medium">{ratings}</p>
        </div>
        <div className="hidden sm:block text-stone-700">{shortDescription}</div>
      </div>
    </div>
  );
}

export default ProductCard;
