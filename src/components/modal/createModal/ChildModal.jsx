import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import SearchBar from "./search/SearchBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ChildModal({ open, handleClose, selectedUsers, setAddedUsers }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" sx={{ color: "black" }}>
          Add People to Group
        </Typography>
        <Divider sx={{ height: "20px", bgColor: "black" }} />
        <Grid>
          <SearchBar
            handleAddUserFromSearch={() => {
              const handleAddUserFromSearch = (user) => {
                setAddedUsers((prev) => [...prev, user]);
              };
            }}
          />
        </Grid>
      </Box>
    </Modal>
  );
}

export default ChildModal;
