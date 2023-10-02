/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const EditGroup = (props) => {
  const group = props.group;

  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    setTitle(group.title);
    setDescription(group.description);
  }, [group]);

  useEffect(() => {
    // Enable the "Save" button only when the title and at least one tag are filled.
    if (title.trim() !== "") {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [title]);

  const handleSubmit = () => {
    try {
      fetch(`/api/group/${props.group._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCtx.userToken,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await res.json();
        props.onSave();
        return data;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/group/${props.group._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCtx.userToken,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete group with status ${response.status}`
        );
      }
      console.log("Group deleted successfully");
      props.handleClose();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Edit Group</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              fullWidth
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent={"flex-start"} pl={"3%"} pr={"3%"}>
          <Grid item>
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              color="error"
            >
              Delete Group
            </Button>
          </Grid>
          <Grid flexGrow={1}></Grid>
          <Grid item justifyContent={"space-between"}>
            <Button onClick={props.handleClose} color="warning">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              disabled={isSaveDisabled}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default EditGroup;
