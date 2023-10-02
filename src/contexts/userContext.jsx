/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import useGetUser from "../hooks/useGetUser";

const initial_data = {
  UserId: "",
  userEmail: "",
  name: "",
  userName: "",
  bio: "",
  photo: "",
  friends: [],
  userToken: "",
  setUser: () => {},
  setToken: () => {},
  clearToken: () => {},
};

export const UserContext = React.createContext(initial_data);

export const UserProvider = ({ children }) => {
  const { user, getUserDetails } = useGetUser();
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userFriends, setUserFriends] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

  const [userToken, setUserToken] = useState(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );

  const getSessionOrLocalStorageToken = useCallback(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, []);

  useEffect(() => {
    const token = getSessionOrLocalStorageToken();
    if (token) {
      setUserToken(token);
      getUserDetails();
    }
  }, [userToken, getSessionOrLocalStorageToken, getUserDetails]);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const setUserData = (data) => {
    // setUserData(() => data);
    setUserId(() => data._id);
    setUserEmail(() => data.email);
    setName(() => data.name);
    setUserName(() => data.username);
    setUserBio(() => data.bio);
    setUserPhoto(() => data.photo);
    setUserFriends(() => data.friends);
    setJoinedGroups(() => data.joinedGroups);
  };

  const setToken = (token) => {
    setUserToken(() => token);
  };

  const clearToken = () => {
    setUserToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userEmail,
        name,
        userName,
        userBio,
        userPhoto,
        userFriends,
        joinedGroups,
        setUserData,
        setToken,
        userToken,
        clearToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
