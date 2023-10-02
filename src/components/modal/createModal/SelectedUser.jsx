import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import { Typography, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useTheme } from "@mui/material/styles";

const SelectedUser = ({ user, roles, setAddedUsers, addedUsers }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    handleClose();
  };

  const handleDelete = (userToDelete) => {
    const updatedUsers = addedUsers.filter(
      (user) => user._id !== userToDelete._id
    );
    setAddedUsers(updatedUsers);
  };

  return (
    <div>
      {addedUsers.length === 0 ? (
        <p>No users selected</p>
      ) : (
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            backgroundColor: theme.palette.background.card,
            width: "98%",
            m: "1%",
            padding: "1%",
            borderRadius: "25px",
            boxShadow: `1px 1px 8px ${theme.palette.boxShadow.main}`, // Box shadow for admin avatars
            "@media (max-width: 600px)": {
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          {/* Avatar and Name */}
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Avatar alt={user.name} src={user.photo} />
            <Typography p={1}>{user.username.split("#")[0]}</Typography>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{ marginRight: "8px", borderRadius: "25px" }}
            >
              {selectedRole}
              {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleDelete(user);
              }}
              startIcon={<DeleteIcon />}
              sx={{ borderRadius: "25px" }}
            >
              Delete
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {roles.map((role) => (
                <MenuItem key={role} onClick={() => handleRoleSelect(role)}>
                  <ListItemText primary={role} />
                </MenuItem>
              ))}
            </Menu>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default SelectedUser;
