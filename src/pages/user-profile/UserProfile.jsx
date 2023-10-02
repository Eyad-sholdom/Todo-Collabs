import { useContext, useEffect, useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import { UserContext } from "../../contexts/userContext";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";

import {
  Divider,
  Button,
  TextField,
  IconButton,
  Typography,
  Grid,
  Avatar,
  Tooltip,
} from "@mui/material";

import { Delete, UploadFile } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  // Get user details
  const userCtx = useContext(UserContext);
  const { isLoading, error, user, getUserDetails } = useGetUser();

  // Edit profile
  const [editMode, setEditMode] = useState(false);
  const [updatedBio, setUpdatedBio] = useState(user.bio);
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedEmail, setUpdatedEmail] = useState(user.email);
  const [updatedPhoto, setUpdatedPhoto] = useState(user.photo);

  // Password change
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  useEffect(() => {
    if (user) {
      setUpdatedBio(user.bio);
      setUpdatedName(user.name);
      setUpdatedEmail(user.email);
      setUpdatedPhoto(user.photo);
    }
  }, [user]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setUpdatedPhoto(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setEditMode(false);
    // Reset the state
    setUpdatedBio(user.bio);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedPhoto(user.photo);
  };

  const handleSubmit = async () => {
    // get changed data from state
    const editedName = updatedName;
    const editedBio = updatedBio;
    const editedEmail = updatedEmail;
    const editedPhoto = updatedPhoto;

    // compare changed data with original data
    const changedData = {};
    if (editedName !== user.name) {
      changedData.name = editedName;
    }
    if (editedBio !== user.bio) {
      changedData.bio = editedBio;
    }
    if (editedEmail !== user.email) {
      changedData.email = editedEmail;
    }
    if (editedPhoto !== user.photo) {
      changedData.photo = editedPhoto;
    }

    // send changed data to server
    const response = await fetch("/api/user/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: userCtx.userToken,
      },
      body: JSON.stringify(changedData),
    });

    if (!response.ok) {
      console.log("somthing went wrong no changes saved!!!");
      // TODO: Show the error message to the user
    }
    getUserDetails();
    setEditMode(false);
  };

  const handlePasswordDialogOpen = () => {
    setPasswordDialogOpen(true);
  };

  const handlePasswordDialogClose = () => {
    setPasswordDialogOpen(false);
  };

  const handlePasswordChange = async () => {
    const response = await fetch("/api/user/change-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: userCtx.userToken,
      },
      body: JSON.stringify({
        oldPassword: currentPassword,
        newPassword: newPassword,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      // TODO: Show the error message to the user
      console.log(data.resultMessage || "Something went wrong");
    } else {
      data.user;
    }
    getUserDetails();
    setPasswordDialogOpen(false);
  };

  const handleClickOnFriend = (friendId) => {
    navigate(`/user/${friendId}`, { replace: true });
  };

  return (
    <>
      {isLoading && <div>Loading</div>}

      {error && (
        <>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Button variant="outlined" onClick={getUserDetails}>
            Try again
          </Button>
        </>
      )}

      {!isLoading && !error && (
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
                src={user.photo}
                alt={user.name}
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Typography variant="h4" color="primary">
                {user.name}
                <Typography variant="caption" color="primary">
                  #{user.username?.split("#")[1]}
                </Typography>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {user.email}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {user.bio || "No bio available."}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Last Login: {new Date(user.lastLogin).toLocaleDateString()} -{" "}
                {new Date(user.lastLogin).toLocaleTimeString()}
              </Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button variant="outlined" onClick={handleEditClick}>
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handlePasswordDialogOpen}
                >
                  Change Password
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 1, mt: 4 }} />
            <Box sx={{ mt: 4, width: "100%" }}>
              <Typography variant="h6">Friends</Typography>
              <List>
                {user.friends?.length === 0 && (
                  <Typography
                    component="span"
                    sx={{ cursor: "pointer", fontWeight: 700 }}
                  >
                    You have no friends yet. Add some!
                  </Typography>
                )}
                <Grid container justifyContent={"center"}>
                  {user.friends?.map((friend) => (
                    <ListItem
                      key={friend._id}
                      sx={{
                        width: "auto",
                        "&:hover": {
                          borderRadius: 1,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => handleClickOnFriend(friend._id)}
                    >
                      <ListItemAvatar>
                        <Avatar src={friend.photo} alt={friend.username} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          friend.name + "#" + friend.username?.split("#")[1]
                        }
                        secondary={`Last Login: ${new Date(
                          friend.lastLogin
                        ).toLocaleString()}`}
                      />
                    </ListItem>
                  ))}
                </Grid>
              </List>
            </Box>
          </Paper>

          <Dialog open={editMode} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              <TextField
                margin="dense"
                id="bio"
                label="Bio"
                type="text"
                fullWidth
                multiline
                rows={4} // Adjust this number as needed
                value={updatedBio}
                onChange={(e) => setUpdatedBio(e.target.value)}
              />
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" component="label">
                  Upload Profile Photo
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleImageUpload(e)}
                    accept="image/*"
                  />
                  <IconButton
                    onClick={() => setUpdatedPhoto(null)}
                    sx={{ ml: 1 }}
                  >
                    <UploadFile sx={{ color: "white" }} />
                  </IconButton>
                </Button>
                {updatedPhoto && (
                  <>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" color="textSecondary">
                        Selected profile photo
                        {/* Red Delete Button   */}
                        <Tooltip title="Delete selected Photo">
                          <IconButton
                            onClick={() => setUpdatedPhoto(null)}
                            sx={{ ml: 1 }}
                          >
                            <Delete sx={{ color: "red" }} />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <img
                        src={updatedPhoto}
                        alt="Selected profile"
                        style={{
                          width: "100%",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={passwordDialogOpen}
            onClose={handlePasswordDialogClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="current-password"
                label="Current Password"
                type="password"
                fullWidth
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <TextField
                margin="dense"
                id="new-password"
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                margin="dense"
                id="confirm-password"
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePasswordDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handlePasswordChange} color="primary">
                Change Password
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default UserProfile;
