import { formatCurrency } from "../helper/helper";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Button from "./Button";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function ShowItems({ productId, booking }) {
  const { data, isLoading } = useGetProductDetailsQuery(productId);
  const product = data?.data?.doc;

  // console.log(product)

  // console.log(productId);

  const navigate = useNavigate();
  const { brandName, mrp, priceAfterDiscount, productType, images } = !isLoading
    ? product
    : {};

  return !isLoading ? (
    <div className="sm:flex sm:items-center sm:justify-between my-4">
      <div className="flex  flex-col items-start sm:flex-row gap-3 sm:items-center mt-2">
        <img src={images[0]} alt="" className="w-20" />
        <div className="flex flex-col sm:items-start sm:justify-center gap-3 sm:gap-6">
          <div>{brandName}</div>
          <div>
            <p>{productType}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 sm:items-end">
        <div>
          <s className="text-sm font-bold">{formatCurrency(mrp)}</s>
          <p className="text-sm font-bold">
            {" "}
            {formatCurrency(priceAfterDiscount)}{" "}
          </p>
        </div>
        <div className="w-44">
          <Button
            actionLabel={booking ? "Order Again" : "View Product"}
            onClick={() => navigate(`/app/product/${productId}`)}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default ShowItems;
