function Avatar({ userPic }) {
  return (
    <img
      src={userPic ? `/dist/img/user/${userPic}` : "/img/user/placeholder.jpg"}
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
    />
  );
}

export default Avatar;
