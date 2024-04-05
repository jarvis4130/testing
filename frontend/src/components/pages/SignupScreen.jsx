import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Input from "../ui/Input";

import { useMoveBack } from "./../hooks/useMoveBack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-hot-toast";
import { useSignupMutation } from "../slices/usersApiSlice";

function SignupScreen() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/app";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({
        name,
        email,
        password,
        passwordConfirm,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      // toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="h-screen grid-rows-[auto_1fr] ">
      <Navbar />
      <div className=" flex items-center justify-center  h-5/6 max-w-[2520px] bg-red-50">
        <div className="bg-white flex flex-col gap-4  w-11/12 md:w-1/3 border rounded-md  translate-y-16 sm:translate-y-6 ">
          <Heading
            title="SignUp "
            subtitle="Welcome and Enjoy!"
            onClick={() => navigate("/app")}
          />
          <form onSubmit={handleSubmit}>
            <Input
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <Input
              id="passwordConfirm"
              label="Password Confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />

            <div className="mx-4 mb-4">
              <Button actionLabel={"Submit"} disabled={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupScreen;
