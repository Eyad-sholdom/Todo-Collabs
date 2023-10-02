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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { UserContext } from "../../../contexts/userContext";

const AddTask = (props) => {
  const userCtx = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (title.trim() !== "") {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [title, tags]);

  const handleSubmit = () => {
    const parsedTags = tagsInput.split(",").map((tag) => tag.trim());
    setTags(parsedTags);
    const data = {
      title,
      description,
      deadline,
      priority,
      assignedTo,
      tags,
    };
    try {
      fetch(`/api/group/task/${props.group._id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCtx.userToken,
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
      });
    } catch (error) {
      console.error(error);
    }
    props.handleTaskClose();
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Add Task</DialogTitle>
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
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={priority}
                onChange={(event) => {
                  setPriority(event.target.value);
                }}
              >
                <MenuItem value="high">high</MenuItem>
                <MenuItem value="medium">medium</MenuItem>
                <MenuItem value="low">low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="deadline"
              label="Deadline"
              type="date"
              fullWidth
              value={deadline}
              onChange={(event) => {
                setDeadline(event.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="tags"
              label="Tags (comma-separated)"
              fullWidth
              value={tagsInput}
              onChange={(event) => {
                setTagsInput(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Assigned To</InputLabel>
              <Select
                name="assignedTo"
                value={assignedTo}
                label="Assigned To"
                onChange={(event) => {
                  setAssignedTo(event.target.value);
                }}
              >
                {props.group.members.map((member) => (
                  <MenuItem key={member._id} value={member._id}>
                    {member.name}#{member.username.split("#")[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={isSaveDisabled}
        >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
