import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router";
import ROUTES from "../routes/routesModel";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loginLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  const login = (data, rememberMe) => {
    setLoading(true);
    const bodyObject = {
      email: data.email,
      password: data.password,
    };

    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyObject),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // TODO: add error Toast
          throw new Error("Login failed");
        }
      })
      .then((responseData) => {
        if (rememberMe) {
          localStorage.setItem("token", responseData.accessToken);
        } else {
          sessionStorage.setItem("token", responseData.accessToken);
        }
        userContext.setUserData(responseData.user);
        userContext.setToken(responseData.accessToken);
        navigate(ROUTES.DASHBOARD);
      })
      .catch((err) => {
        setError(err.message);
        console.log("Login error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { login, loginLoading, error };
};

export default useLogin;
