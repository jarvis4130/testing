import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { toast } from "react-hot-toast";
import { useUpdatemypasswordMutation } from "../slices/usersApiSlice";

function Password() {
  const [passwordCurrent, setpasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [updateMyPassword, { isLoading }] = useUpdatemypasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(passwordCurrent, password, passwordConfirm);
      const res = await updateMyPassword({
        passwordCurrent,
        password,
        passwordConfirm,
      }).unwrap();
      // console.log(res);
      toast.success(res.message || "Password updated successfully");
      //   dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      // console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className=" w-full md:w-3/4">
      <Input
        id="passwordCurrent"
        label="Your Current Password"
        type="password"
        value={passwordCurrent}
        onChange={(e) => setpasswordCurrent(e.target.value)}
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
        label="Confirm password."
        type="password"
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
      />
      <div className="mx-4 mb-4">
        <Button actionLabel={"Submit"} disabled={isLoading} notRew={true} />
      </div>
    </form>
  );
}

export default Password;
