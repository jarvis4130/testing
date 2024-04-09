import { Link, useNavigate } from "react-router-dom";

function LandingScreen() {
  const navigate = useNavigate();
  return (
    <div className=" h-5/6">
      <div className="flex justify-center items-center">
        <img
          src="/img/logo/A2Z-logos_transparent.png"
          width={150}
          alt="Logo.png"
          onClick={() => navigate("/app")}
        />
        <h1 className="text-3xl my-2">Welcome To A2Z Housing</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="m-4">
          <Link to="/app" className="text-xl hover:text-neutral-700 border-b">
            Explore Product
          </Link>
        </div>
        <div className="m-4">
          <Link to="login" className="text-xl hover:text-neutral-700 border-b">
            Login
          </Link>
        </div>
        <div className="m-4">
          <Link to="signup" className="text-xl hover:text-neutral-700 border-b">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingScreen;
