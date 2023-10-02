import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";

import { Divider, Button, Typography, Avatar, IconButton } from "@mui/material";
import { Cancel, PersonAddAlt1, PersonRemove } from "@mui/icons-material";

import useGetUser from "../../hooks/useGetUser";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const MemberProfile = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();

  const {
    user: member,
    getUserDetails: getMemberDetails,
    isLoading: memberLoading,
  } = useGetUser();

  const { user, getUserDetails, isLoading: userLoading } = useGetUser();

  const [friendStatus, setFriendStatus] = useState(null); // null, "pending", "friend"

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!memberId) {
      navigate(-1);
    }
  }, [memberId, navigate]);

  useEffect(() => {
    // get user Id from the URL using the useParams hook
    getMemberDetails(memberId);
    getUserDetails();
  }, [getUserDetails, getMemberDetails, memberId]);

  useEffect(() => {
    if (!member?._id || !user?._id) return;

    // check if the user is itself
    if (member._id === user._id) {
      navigate(ROUTES.USER_PROFILE);
    }

    setFriendStatus(member.friendStatus);
  }, [member, user, navigate]);

  const handleSendFriendRequest = async () => {
    // Handle the logic to send a friend request here
    const url = "/api/user/friend";
    const data = {
      userId: memberId,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.userToken,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const result = await response.json();
    if (result.status === 200 || result.message === "Friend request sent") {
      setFriendStatus("pending");
    }
  };

  const handleCancelFriendRequest = async () => {
    // Handle the logic to cancel a friend request here
    // router.delete("/friend-response", auth, responseFriendRequest);
    const url = "/api/user/friend";
    const data = {
      userId: memberId,
    };
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.userToken,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      setFriendStatus(() => null);
    }
  };

  const handleUnfriend = async () => {
    const url = "/api/user/friend";
    const data = {
      userId: memberId,
    };
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.userToken,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      setFriendStatus(() => null);
    }
  };

  const handleClickOnFriend = (friendId) => {
    navigate(`/user/${friendId}`, { replace: true });
  };

  return (
    <>
      {memberLoading && <div>Loading</div>}

      {!memberLoading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 3,
            width: "100%",
          }}
        >
          <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={member.photo}
                alt={member.name}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h4">{member.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {member.email}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {member.username}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {member.bio || "No bio available."}
              </Typography>
              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ mt: 2 }}
              >
                Last Login: {new Date(member.lastLogin).toLocaleString()}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Joined: {new Date(member.createdAt).toLocaleDateString()}
              </Typography>
              {friendStatus === "pending" && (
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: "gray",
                    "&:hover": {
                      opacity: [0.9, 0.8, 0.7],
                      backgroundColor: "red",
                    },
                  }}
                  onClick={handleCancelFriendRequest}
                >
                  Cancel Friend Request
                  <Cancel sx={{ color: "white", ml: 1 }} />
                </Button>
              )}
              {friendStatus === "friend" && (
                <Button
                  variant="contained"
                  sx={{ mt: 2, bgcolor: "red" }}
                  onClick={handleUnfriend}
                >
                  Unfriend
                  <PersonRemove sx={{ color: "white", ml: 1 }} />
                </Button>
              )}

              {!friendStatus && (
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleSendFriendRequest}
                >
                  Send Friend Request
                  <PersonAddAlt1 sx={{ color: "white" }} />
                </Button>
              )}
            </Box>

            <Divider sx={{ mt: 3 }} />

            <Box sx={{ mt: 4, width: "100%" }}>
              <Typography variant="h6">Friends</Typography>
              {member.friends?.length === 0 && (
                <Typography variant="caption">
                  No friends yet. Send a friend request!
                </Typography>
              )}
              <List>
                <Grid container justifyContent={"center"}>
                  {member.friends?.map((member) => (
                    <ListItem
                      key={member._id}
                      sx={{
                        width: "auto",
                        "&:hover": {
                          borderRadius: 1,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => handleClickOnFriend(member._id)}
                    >
                      <ListItemAvatar>
                        <Avatar src={member.photo} alt={member.username} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          member.name + "#" + member.username?.split("#")[1]
                        }
                        secondary={`Last Login: ${new Date(
                          member.lastLogin
                        ).toLocaleString()}`}
                      />
                    </ListItem>
                  ))}
                </Grid>
              </List>
            </Box>

            <Divider sx={{ mt: 3 }} />

            <Box sx={{ mt: 4, width: "100%" }}>
              <Typography variant="h6">Joined Groups</Typography>
              <List>
                {!member.joinedGroups?.length && (
                  <Typography variant="caption">No groups yet.</Typography>
                )}
                {member.joinedGroups?.map((group) => (
                  <ListItem key={group._id}>
                    <ListItemText
                      primary={group.name}
                      secondary={group.description}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default MemberProfile;
