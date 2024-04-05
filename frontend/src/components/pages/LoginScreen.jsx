import Navbar from "../navbar/Navbar";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useForgotpasswordMutation,
  useLoginMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-hot-toast";

function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const [reset] = useForgotpasswordMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  // console.log(search);
  const sp = new URLSearchParams(search);
  // console.log(sp);
  const redirect = sp.get("redirect") || "/app";
  // console.log(redirect);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email==="" || password===""){
      toast.error("Please enter your email");
      return;
    }
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error)
      // toast.error(error?.data?.message || error.error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please enter your email");
      return;
    }
    try {
      const res = await reset({ email }).unwrap();
      console.log(res)
      // console.log(res);
      toast.success("Reset Link sent to your Mail.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      // console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen grid-rows-[auto_1fr]">
          <Navbar />
          <div className=" flex items-center justify-center  h-5/6 max-w-[2520px] bg-red-50">
            <div className="bg-white flex flex-col gap-4  w-11/12 md:w-1/3 border rounded-md translate-y-4 sm:-translate-y-5">
              <Heading
                title="Welcome back"
                subtitle="Login to your account!"
                onClick={() => navigate("/app")}
              />
              <form onSubmit={handleSubmit}>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <p
                  className="text-neutral-700 px-5 mb-2"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </p>
                <div className="mx-4 mb-4">
                  <Button actionLabel={"Submit"} disabled={isLoading} />
                </div>
                <p className="px-5 mb-4 text-neutral-700">
                  Don't have an account{" "}
                  <Link className="border-b border-neutral-700 hover:cursor-pointer hover:border-blue-700 hover:text-blue-700" to="/signup">
                    SignUp
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginScreen;
