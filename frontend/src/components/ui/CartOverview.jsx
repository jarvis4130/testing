import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./../slices/cartSlice";
import { formatCurrency } from "./../helper/helper";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-red-200 px-4 py-4 text-sm uppercase text-black-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-black-200 sm:space-x-6">
        <span>{totalCartQuantity} Items</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/app/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
