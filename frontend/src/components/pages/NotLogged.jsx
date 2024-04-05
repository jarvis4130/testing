import { Link } from "react-router-dom";

export default function NotLogged() {
  return (
    <div className="text-2xl flex items-center justify-center flex-col gap-5 mx-auto my-10">
      <div className="text-4xl text-red-700">Please Login in.</div>
      <Link
        to="/login"
        className="cursor-pointer text-4xl text-slate-900 hover:text-neutral-700 "
      >
        Click Me to Login!
      </Link>
      <div className="text-4xl">ERROR!!! 404</div>
    </div>
  );
}
