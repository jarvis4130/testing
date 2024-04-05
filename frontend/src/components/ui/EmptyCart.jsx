import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import Button from "./Button";

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-3">
      {/* <LinkButton to="/menu">&larr; Back to menu</LinkButton> */}

      <div
        className="w-40
      "
      >
        <Button
          actionLabel={"Back to Menu"}
          onClick={() => navigate("/app")}
          Icon={RiArrowGoBackFill}
        />
      </div>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some products :)
      </p>
    </div>
  );
}

export default EmptyCart;
