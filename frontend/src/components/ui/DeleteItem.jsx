import { useDispatch } from "react-redux";
import Button from "./Button";
import { deleteItem } from "../slices/cartSlice";
import { MdDelete } from "react-icons/md";

function DeleteItem({ productId }) {
  const dispatch = useDispatch();

  return (
    <div className="w-10">
      <Button onClick={() => dispatch(deleteItem(productId))} Icon={MdDelete} />
    </div>
  );
}

export default DeleteItem;
