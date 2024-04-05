import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdatemeMutation } from "../slices/usersApiSlice";
import { toast } from "react-hot-toast";
import Input from "./Input";
import Button from "./Button";
import { setCredentials } from "../slices/authSlice";

function Profile() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(userInfo?.data?.user?.name || "");
  const [email, setEmail] = useState(userInfo?.data?.user?.email || "");
  const [photo, setPhoto] = useState(null);

  const [updateMe, { isLoading }] = useUpdatemeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("photo", photo);

      const res = await updateMe(formData).unwrap();
      // console.log(res);
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      // console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className=" w-full md:w-3/4">
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
        id="Profile Pic"
        label="Profile Pic"
        accept="image/*"
        type="file"
        onChange={(e) => {
          setPhoto(e.target.files[0]);
        }}
      />
      <div className=" hidden md: flex items-center justify-center text-neutral-500">
        <p>If Profile pic doesn't change, Login Again!</p>
      </div>
      <div className="mx-4 mb-4">
        <Button actionLabel={"Submit"} disabled={isLoading} notRew={true} />
      </div>
    </form>
  );
}

export default Profile;
