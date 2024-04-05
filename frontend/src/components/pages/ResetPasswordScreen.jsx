import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import { useResetpasswordMutation } from "../slices/usersApiSlice";
import { toast } from "react-hot-toast";

function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { token } = useParams();

  const [resetPassword] = useResetpasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { password, passwordConfirm };
      const result = await resetPassword({ token, data: payload }).unwrap();
      //   console.log(result);
      toast.success("Password Updated!");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div>
      <div className=" flex items-center justify-center h-screen max-w-[2520px] bg-red-50">
        <div className="bg-white flex flex-col gap-4  w-11/12 md:w-1/3 border rounded-md translate-y-4 sm:-translate-y-5">
          <Heading
            title="Welcome back"
            subtitle="Please Enter your new password!"
          />
          <form onSubmit={handleSubmit}>
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
              <Button
                actionLabel={"Submit"}
                //   disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordScreen;
