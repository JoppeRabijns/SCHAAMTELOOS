import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRouter = ({ route }) => {
  const facebookLoggedIn = useSelector((state) => state.data.facebook);

  useEffect(() => {}, [facebookLoggedIn]);

  if (!facebookLoggedIn) return <Navigate to={"/"} />;
  return route;
};

export default AuthRouter;
