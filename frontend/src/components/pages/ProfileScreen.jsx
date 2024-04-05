import { Link } from "react-router-dom";
import { useState } from "react";
import Profile from "../ui/Profile";
import Password from "../ui/Password";

function ProfileScreen() {
  const [profileUpdate, setProfileUpdate] = useState(true);

  return (
    <div className="grid grid-cols-[1fr_3fr] my-5">
      <div className=" flex flex-col gap-5">
        <div
          className="bg-white p-4 border border-slate-300 hover:-translate-y-2 focus:outline-none focus:ring rounded-lg shadow-md"
          onClick={() => setProfileUpdate((value) => !value)}
        >
          My Profile
        </div>
        <div
          onClick={() => setProfileUpdate((value) => !value)}
          className="bg-white p-4 border border-slate-300 hover:-translate-y-2 focus:outline-none focus:ring rounded-lg shadow-md"
        >
          Password
        </div>
        <Link
          to="/app/my-bookings"
          className="bg-white p-4 border border-slate-300 hover:-translate-y-2 focus:outline-none focus:ring rounded-lg shadow-md"
        >
          My Orders
        </Link>
        <Link
          to="/app/my-wishlist"
          className="bg-white p-4 border border-slate-300 hover:-translate-y-2 focus:outline-none focus:ring rounded-lg shadow-md"
        >
          My Wishlist
        </Link>
        <Link
          to="/app/cart"
          className="bg-white p-4 border border-slate-300 hover:-translate-y-2 focus:outline-none focus:ring rounded-lg shadow-md"
        >
          My cart
        </Link>
      </div>
      <div className="bg-red-100 flex flex-col items-center justify-center">
        {profileUpdate ? <Profile /> : <Password />}
      </div>
    </div>
  );
}

export default ProfileScreen;
