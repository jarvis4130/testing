import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./../slices/cartSlice";
import CartItem from "../ui/CartItem";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../ui/EmptyCart";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_API_KEY } from "../../constant";
import axios from "axios";
import { toast } from "react-hot-toast";

function Cart() {
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector(getCart);
  // console.log(cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  if (!cart.length) return <EmptyCart />;

  console.log(cart)

  const handleSubmit = async () => {
    // 1)Get Checkout Session From API
    const stripe = await loadStripe(STRIPE_API_KEY);
    // 2)Create Checkout from+ credit card
    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const session = await axios.post(
      "/api/bookings/checkout-session",
      body,
      { headers: headers }
    );

    const result = stripe.redirectToCheckout({
      sessionId: session.data.id,
    });

    if (result.error) {
      toast.error(result.error);
    }
  };
  return (
    <div className="px-4 py-3 flex flex-col gap-2">
      <h2 className="mt-7 text-xl font-semibold">
        Your cart, {userInfo?.data?.user?.name}
      </h2>
      <div className="mt-3 flex flex-col divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.productId} />
        ))}
      </div>

      <div className="flex flex-row gap-3">
        <div className="w-44">
          {localStorage.getItem("userInfo") ? (
            <Button
              type="primary"
              onClick={() => handleSubmit()}
              actionLabel={"Order Products"}
            />
          ) : (
            <Button
              type="primary"
              actionLabel={"Login to Order"}
              onClick={() => {
                navigate("/login?redirect=/app/cart");
              }}
            />
          )}
        </div>

        <div className="w-44">
          <Button
            type="secondary"
            onClick={() => dispatch(clearCart())}
            actionLabel={"Clear Cart"}
          />
        </div>
      </div>
    </div>
  );
}

export default Cart;
