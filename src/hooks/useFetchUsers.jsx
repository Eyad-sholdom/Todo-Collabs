import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";

const useFetchUsers = () => {
  const userContext = useContext(UserContext);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API endpoint URL for fetching all users
    const allUsersApiUrl = "/api/users"; // Update with the actual endpoint for fetching all users

    // Fetch all users data from the API
    fetch(allUsersApiUrl, {
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
      .then((data) => {
        // Filter out the current user from the allUsers data
        const filteredUsers = data.filter((user) => user._id !== user._id);
        console.log(filteredUsers);
        setUsers(filteredUsers); // Update the allUsers state with the filtered data
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [users]);

  return { users, loading, error };
};

export default useFetchUsers;
