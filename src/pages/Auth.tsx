import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auth disabled - redirect to dashboard
    navigate("/dashboard");
  }, [navigate]);

  return null;
};

export default Auth;
