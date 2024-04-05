import { useDispatch } from "react-redux";
import Button from "./Button";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "./../slices/cartSlice";
import { FaPlus, FaMinus } from "react-icons/fa";

function UpdateItemQuantity({ productId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row gap-5">
      <div className="w-10">
        <Button
          rounded={true}
          onClick={() => dispatch(decreaseItemQuantity(productId))}
          Icon={FaMinus}
        />
      </div>
      <div className="font-bold flex items-center justify-center">
        <span className="">{currentQuantity}</span>
      </div>
      <div className="w-10">
        <Button
          rounded={true}
          onClick={() => dispatch(increaseItemQuantity(productId))}
          Icon={FaPlus}
        />
      </div>
    </div>
  );
}

export default UpdateItemQuantity;
