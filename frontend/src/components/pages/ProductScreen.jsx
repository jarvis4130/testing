import {
  useCreateReviewOnProductMutation,
  useGetProductDetailsQuery,
} from "../slices/productApiSlice";
import { useParams } from "react-router-dom";
import { useMoveBack } from "./../hooks/useMoveBack";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";

import { addItem } from "../slices/cartSlice";
import { formatCurrency } from "../helper/helper";
import { useDispatch, useSelector } from "react-redux";

import Button from "../ui/Button";
import Rating from "../ui/Rating";
import Loader from "./../ui/Loader";
import Error from "./../ui/Error";
import ImageSlider from "../ui/ImageSlider";
import UpdateItemQuantity from "../ui/UpdateItemQuantity";
import { getCurrentQuantityById } from "../slices/cartSlice";
import StarRating from "../ui/StarRating";
import { toast } from "react-hot-toast";

function ProductScreen() {
  const { productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetProductDetailsQuery(productId);
  const [showReviews, setShowReviews] = useState(false);
  const moveBack = useMoveBack();
  const product = data?.data?.doc;
  // console.log(product);
  const [userRating, setUserRating] = useState("");
  const [inputValue, setInputValue] = useState("");

  const currentQuantity = useSelector(getCurrentQuantityById(productId));

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    const newItem = {
      productId: product._id,
      brand: product.brandName,
      quantity: 1,
      unitPrice: product.priceAfterDiscount,
      totalPrice: product.priceAfterDiscount * 1,
      img: product.images[0],
      stock: product.countInStock,
    };
    // console.log(newItem);
    dispatch(addItem(newItem));
  };

  const [createReview] = useCreateReviewOnProductMutation();

  const publishReview = async () => {
    // console.log(userRating);
    // console.log(inputValue);
    // console.log(productId);
    // console.log(userInfo?.data?.user?._id);

    const payload = { rating: userRating, review: inputValue };

    try {
      const res = await createReview({
        productId,
        data: payload,
      }).unwrap();

      // console.log(res);
      toast.success("Review Submitted.");
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="my-5">
          {/* <div className="w-36 absolute z-40  sm:top-15 right-2 ">
            <Button
              onClick={moveBack}
              actionLabel={"Go back"}
              rounded={true}
              Icon={RiArrowGoBackFill}
            />
          </div> */}
          <div className=" flex flex-col gap-4 md:grid md:grid-cols-[2fr_1fr_1fr] mt-3 ">
            <div>
              <ImageSlider images={product.images} />
            </div>

            <div className="mr-5">
              <div className="border-b my-2 border-slate-400">
                <h1 className="text-xl font-bold">{product?.brandName}</h1>
                <p className="text-slate-500">{product?.shortDescription} </p>
              </div>

              <div className="font-semibold flex flex-col gap-3 border-b border-slate-400 ">
                <div>
                  <span className="flex flex-row gap-2">
                    {" "}
                    MRP:
                    <s>{formatCurrency(product.mrp)}</s>
                    <span>{formatCurrency(product.priceAfterDiscount)}</span>
                  </span>
                </div>
                <div>
                  <span className="">Flat: {product.discountPercentage}%</span>
                </div>
              </div>

              <div className="my-2 border-b border-slate-400">
                <h1 className="font-bold my-2">Product Details</h1>
                {product.productDetails.map((details, index) => (
                  <div key={index} className="my-1">
                    {details}
                  </div>
                ))}
              </div>

              <div className="flex flex-row justify-between my-1">
                <div>
                  <Rating value={product.ratingsAverage} />
                </div>
                <div className="flex flex-col">
                  <div className="text-slate-700">
                    {product.ratingsQuantity} reviews
                  </div>
                  {product.reviews.length >= 1 && (
                    <div
                      className={`text-slate-950 hover:text-slate-700 hover:cursor-pointer ${
                        showReviews ? "" : "mb-3"
                      }`}
                      onClick={() => setShowReviews((value) => !value)}
                    >
                      {showReviews ? " See Less " : " See More "}
                    </div>
                  )}
                </div>
              </div>
              {showReviews && (
                <div className="h-24 overflow-y-scroll scrollbar-width scrollbar-track scrollbar-handle scrollbar-hover">
                  {product.reviews.map((review) => (
                    <div key={review._id}>
                      <div className="flex flex-row items-center justify-between border-y  border-slate-200 py-3">
                        {review.review} <Rating value={review.rating} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-b border-slate-400">
                {userInfo ? (
                  <>
                    <div>
                      <p>Rate the product.</p>
                      <StarRating
                        maxRating={5}
                        size={24}
                        onSetRating={setUserRating}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Publish a review"
                      className=" px-4 w-full py-2 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed "
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="my-4">
                      <Button
                        actionLabel={"Publish Review"}
                        onClick={publishReview}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <h1 className="font-bold border-b border-slate-400 py-4">
                  Status:{" "}
                  {product.countInStock * 1 > 10
                    ? "InStock"
                    : product.countInStock * 1 < 0
                    ? "Out of Stock "
                    : `Hurry!!! Only ${product.countInStock} left.`}
                </h1>
                <div className="w-36">
                  <Button
                    onClick={moveBack}
                    actionLabel={"Go back"}
                    rounded={true}
                    Icon={RiArrowGoBackFill}
                  />
                </div>
              </div>
              <div>
                <div className="py-2 border-b border-slate-400">
                  <h1 className="font-bold my-2">Specifications</h1>
                  {Object.keys(product.specifications).map((key) => {
                    const value = product.specifications[key];

                    return (
                      <div key={key} className="my-1">
                        {`${key}: ${value}`}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="py-2 flex flex-col gap-2">
                {currentQuantity > 0 && (
                  <div className="flex items-center justify-center">
                    <UpdateItemQuantity
                      productId={productId}
                      currentQuantity={currentQuantity}
                    />
                  </div>
                )}
                <Button
                  actionLabel={"Add to Cart"}
                  Icon={FaCartShopping}
                  onClick={addToCartHandler}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
