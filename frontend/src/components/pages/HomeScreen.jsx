import { useGetProductsQuery } from "../slices/productApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "./../ui/ProductCard";
import Loader from "./../ui/Loader";
import Error from "./../ui/Error";
import Pagination from "../ui/Pagination";

function HomeScreen() {
  const { keyword } = useParams();

  const queryParams = new URLSearchParams(location.search);

  // Get the values of 'page' and 'limit' from the query parameters
  const page = queryParams.get("page") || 1;
  const limit = 5;
  const { data, isLoading, error } = useGetProductsQuery({
    page,
    limit,
    keyword,
  });
  const navigate = useNavigate();

  const products = data?.data?.data;
  // console.log(data);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <div className=" grid gap-3 grid-cols-1 my-5 sm:grid-cols-1 sm:gap-5 lg:grid-cols-4 md:grid-cols-1 md:gap-x-5 md:gap-y-3 lg:gap-x-5 lg:gap-y-8">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                productId={product._id}
                ratings={product.ratingsAverage}
                mrp={product.mrp}
                imgPath={product.images[0]}
                priceAfterDiscount={product.priceAfterDiscount}
                shortDescription={<p>{product.shortDescription}</p>}
                discountPercentage={product.discountPercentage}
                brandName={product.brandName}
                onClick={() => {
                  navigate(`/app/product/${product._id}`);
                }}
              />
            ))}
          </div>
          <div className="">
            <Pagination pages={data.pages} />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
