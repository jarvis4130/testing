import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(
    function () {
      if (!userInfo) {
        navigate("/login");
      }
    },
    [userInfo,navigate]
  );

  return userInfo ? children : null;
}

export default ProtectedRoute;
