import { useGetTopSellingProductsQuery } from "../slices/productApiSlice";
import { useNavigate } from "react-router-dom";
import Error from "../ui/Error";
import Loader from "../ui/Loader";
import ProductCard from "../ui/ProductCard";

function TopSellingScreen() {
  const { data, isLoading, error } = useGetTopSellingProductsQuery();
  const navigate = useNavigate();

  const products = data?.data?.data;
  // console.log(products);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className=" grid gap-3 grid-cols-2 my-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 md:grid-cols-3 md:gap-x-5 md:gap-y-3 lg:gap-x-5 lg:gap-y-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              productId={product._id}
              mrp={product.mrp}
              imgPath={product.images[0]}
              priceAfterDiscount={product.priceAfterDiscount}
              brandName={product.brandName}
              onClick={() => {
                navigate(`/app/product/${product._id}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TopSellingScreen;
