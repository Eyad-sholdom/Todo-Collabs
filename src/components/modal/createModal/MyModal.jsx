/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { UserContext } from "../../../contexts/userContext";
import { Box } from "@mui/system";

const MyModal = ({ open, handleClose, onGroupCreated }) => {
  const userCtx = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleCreate = async () => {
    try {
      const response = await fetch("/api/group/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCtx.userToken,
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error(`Failed to create group: ${response.statusText}`);
      }
      const data = await response.json();

      handleClose();
      onGroupCreated();

      setTitle("");
      setDescription("");

      return data;
    } catch (error) {
      console.error("Error creating group:", error);
      throw error;
    }
  };

  const handleCancel = () => {
    setDescription("");
    setTitle("");
    handleClose();
  };

  const allowCreate = title.length > 0 && description.length > 0;

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        handleCancel();
      }}
    >
      <Dialog open={open} onClose={handleClose}>
        <Grid container direction="column">
          <DialogTitle>Create Group</DialogTitle>
          <DialogContent sx={{ width: 400 }}>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="space-between"
              gap={2}
              p={2}
            >
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline // added multiline prop
                rows={5} // number of visible rows
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!allowCreate} onClick={handleCreate}>
              Create Group
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </Modal>
  );
};

export default MyModal;
