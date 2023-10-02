/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
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
  Box,
} from "@mui/material";

import { UserContext } from "../../../contexts/userContext";

const EditTask = (props) => {
  const userCtx = useContext(UserContext);
  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.description);
  const [deadline, setDeadline] = useState(props.task.deadline);
  const [priority, setPriority] = useState(props.task.priority);
  const [assignedTo, setAssignedTo] = useState(props.task.assigned_to || ""); // Initialize with an initial value
  const [tagsInput, setTagsInput] = useState(props.task.tags);

  useEffect(() => {
    setTitle(props.task.title);
    setDescription(props.task.description);
    setDeadline(props.task.deadline);
    setPriority(props.task.priority);
    setAssignedTo(props.task.assignedTo._id || "");
    setTagsInput(props.task.tags);
  }, [props.task]);

  const handleSubmit = () => {
    const data = {
      title,
      description,
      dueDate: deadline,
      priority,
      assignedTo: assignedTo,
    };

    const groupId = props.groupId;
    try {
      fetch(`/api/group/task/${groupId}/${props.task._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: userCtx.userToken,
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await Promise.resolve(res.json());
        props.onSave(data);
        props.onClose();
        return;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12}>
            <TextField
              name="task_name"
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
            <FormControl fullWidth>
              <InputLabel>Assigned To</InputLabel>
              <Select
                name="assigned_to"
                value={assignedTo}
                label="Assigned To"
                onChange={(event) => {
                  setAssignedTo(event.target.value);
                }}
              >
                {props.GroupMembers.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button sx={{ ml: 2 }} onClick={props.onDelete} color="error">
          Delete
        </Button>

        <Box sx={{ flexGrow: 1 }}></Box>

        <Button onClick={props.onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTask;
