import { useCallback, useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";

const useGetUser = () => {
  const userContext = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  const getUserDetails = useCallback(
    (userId) => {
      setIsLoading(true);
      const url = userId ? `/api/user/search/${userId}` : "/api/user";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.userToken,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
          return response.json();
        })
        .then((responseData) => {
          setUser(responseData);
        })
        .catch((err) => {
          setError(err);
          console.log("Login error:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [userContext.userToken]
  );

  return { isLoading, error, user, getUserDetails };
};

export default useGetUser;
