import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, []);

  return <h1>Login effettuato...</h1>;
};

export default OAuthSuccess;