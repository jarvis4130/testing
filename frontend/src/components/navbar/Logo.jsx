import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/app">
      <img
        src={"img/logo/A2Z-logos_transparent.png"}
        alt="A2Z logo"
        className="hidden sm:block cursor-pointer "
        height={100}
        width={100}
      />
    </Link>
  );
}

export default Logo;
