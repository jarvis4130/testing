import { useSelector } from "react-redux";
import NotLogged from "./NotLogged";
import { useGetMyProductsQuery } from "../slices/bookingApiSlice";
import ShowItems from "../ui/ShowItems";
import Loader from "../ui/Loader";

function BookingScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetMyProductsQuery();
  // console.log(data?.products);

  const products = data?.products;
  // console.log(products);

  return (
    <>
      {userInfo ? (
        !isLoading ? (
          <div className="px-4 py-3 flex flex-col gap-2">
            <h2 className="mt-7 text-xl font-semibold">
              Your Bookings, {userInfo?.data?.user?.name}
            </h2>
            <div className="mt-3 flex flex-col divide-y divide-stone-200 border-b">
              {products &&
                products.map((product) => (
                  <ShowItems
                    key={product._id}
                    productId={product._id}
                    booking={true}
                  />
                ))}
            </div>
          </div>
        ) : (
          <Loader />
        )
      ) : (
        <NotLogged />
      )}
    </>
  );
}

export default BookingScreen;
