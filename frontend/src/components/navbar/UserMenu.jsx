import Avatar from "../ui/Avatar";
import MenuItem from "./MenuItem";

import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import { toast } from "react-hot-toast";

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      // toast.error(error?.data?.message || error.error)
      // console.log(error);
    }
  };

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative bg-white-50 z-40 ">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => navigate("app/cart")}
          className="hidden md:block text:sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          <div>
            <span className="block">
              <FaShoppingCart />
            </span>
            Your Cart
          </div>
        </div>
        <div
          onClick={() => navigate("/app/my-bookings")}
          className="hidden md:block text:sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          My Bookings
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row  items-center gap-3 rounded-full  cursor-pointer hover:shadow-md transition "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar userPic={userInfo?.data?.user?.photo} />
          </div>
          <div className=" hidden md:block">{userInfo?.data?.user?.name}</div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-50">
          <div className="flex flex-col cursor-pointer">
            <>
              {userInfo ? (
                <>
                  <MenuItem
                    label="Profile"
                    onClick={() => {
                      navigate("app/profile");
                      setIsOpen((value) => !value);
                    }}
                  />
                  <MenuItem label="Logout" onClick={logoutHandler} />
                </>
              ) : (
                <>
                  <MenuItem
                    label="Login"
                    onClick={() => {
                      navigate("/login");
                      setIsOpen((value) => !value);
                    }}
                  />
                  <MenuItem
                    onClick={() => {
                      navigate("/signup");
                      setIsOpen((value) => !value);
                    }}
                    label="SignUp"
                  />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
