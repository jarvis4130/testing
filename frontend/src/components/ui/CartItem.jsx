import { useSelector } from "react-redux";
import { formatCurrency } from "../helper/helper";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "../slices/cartSlice";

function CartItem({ item }) {
  const { productId, brand, quantity, unitPrice, totalPrice, img } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(productId));

  return (
    <div className="py-3 sm:flex sm:items-center sm:justify-between">
      <div className="flex  flex-col items-start sm:flex-row gap-3 sm:items-center ">
        <img src={img} alt="This is an image" className="w-20" />
        <p className="mb-1 sm:mb-0">
          {quantity}&times; {brand}
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        <div>
          <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        </div>

        <UpdateItemQuantity
          productId={productId}
          currentQuantity={currentQuantity}
        />

        <DeleteItem productId={productId} />
      </div>
    </div>
  );
}

export default CartItem;
