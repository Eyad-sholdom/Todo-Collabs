import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import SelectedUser from "./SelectedUser";
import { useTheme } from "@mui/material/styles";

const SelectedUsersList = ({ users, setAddedUsers, addedUsers }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRole, setSelectedRole] = useState("normal member");

  const roles = ["normal member", "moderator", "admin"];

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

  return (
    <Grid
      container
      sx={{
        backgroundColor: theme.palette.background.paper,
        dispaly: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        height: "auto",
        maxHeight: "30vh",
        minHeight: "30vh",
        border: "1px solid grey",
        overflowY: "scroll",
        overflowX: "hidden",
        borderRadius: "7px",
        mb: "0.5%",
        "&::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#2f2f2f",
          borderRadius: "5px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-corner": {
          background: "#f1f1f1",
        },
      }}
    >
      {users.length > 0 ? (
        users.map((user) => (
          <Grid item key={user._id} sx={{ width: "100%" }}>
            <SelectedUser
              user={user}
              id={user._id}
              roles={roles}
              setAddedUsers={setAddedUsers}
              addedUsers={addedUsers}
            />
          </Grid>
        ))
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "#828282" }}>No users selected.</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default SelectedUsersList;
