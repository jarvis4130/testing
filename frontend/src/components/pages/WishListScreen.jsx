import { useSelector } from "react-redux";
import NotLogged from "./NotLogged";
import ShowItems from "../ui/ShowItems";
import { useGetMeQuery } from "../slices/usersApiSlice";

function WishListScreen() {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetMeQuery();

  const productIds = data?.data?.doc?.wishlist;
  // console.log(productIds);

  return (
    <>
      {userInfo ? (
        <div className="px-4 py-3 flex flex-col gap-2">
          <h2 className="mt-7 text-xl font-semibold">
            Your WishList, {userInfo?.data?.user?.name}
          </h2>
          {productIds ? (
            <div className="mt-3 divide-y divide-stone-500 border-b">
              {!isLoading &&
                productIds?.map((productId) => (
                  <ShowItems
                    productId={productId.product}
                    key={productId.product}
                  />
                ))}
            </div>
          ) : (
            <div className="mt-3 divide-y divide-stone-500 border-b">
              <p className="p-4">No Items in WishList.</p>
            </div>
          )}
        </div>
      ) : (
        <NotLogged />
      )}
    </>
  );
}

export default WishListScreen;
