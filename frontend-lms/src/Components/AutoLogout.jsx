import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../Redux/Slices/authSlice";

const AutoLogout = () => {
  const dispatch = useDispatch();
  const jwtToken = useSelector((state) => state.auth.jwtToken);
  const jwtTokenValidity = useSelector((state) => state.auth.jwtTokenValidity);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiry = () => {
      const currentTime = Date.now() / 1000;

      const secondsUntilExpiry = jwtTokenValidity === 0 ? 11 : jwtTokenValidity - Date.now() / 1000;
      // console.log("Time Left to expire: " + secondsUntilExpiry);
      if ((Math.floor(secondsUntilExpiry)) <= 10 && (Math.floor(secondsUntilExpiry)) > 9) {
        toast.info(`Your session will expire in 10 seconds!!`);
      }
      if (jwtToken && jwtTokenValidity && currentTime > jwtTokenValidity) {
        dispatch(logout());
        toast.error("Session expired");
        navigate("/login");

      }
    };

    const intervalId = setInterval(checkTokenExpiry, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, jwtToken, jwtTokenValidity]);

  return null;
};

export default AutoLogout;
