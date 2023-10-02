/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import {
  Card,
  Typography,
  Grid,
  MenuItem,
  Select,
  IconButton,
  Collapse,
  CardContent,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditTask from "./modal/EditTask";
import { UserContext } from "../../contexts/userContext";
import { format } from "date-fns";

const Task = ({ group, task, handleTaskEdit, handleTaskDelete }) => {
  const userContext = useContext(UserContext);

  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(task.status);
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "MMMM dd, yyyy")
    : "N/A";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = (editedTask) => {
    handleTaskEdit(editedTask);
    closeModal();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    const newStatus = event.target.value;
    const data = {
      status: newStatus,
    };

    try {
      fetch(`/api/group/task/${group._id}/${task._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.userToken,
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await Promise.resolve(res.json());
        return data;
      });
    } catch (error) {
      console.log(error);
    }
    setStatus(newStatus);
  };

  const handleDeleteTask = () => {
    handleTaskDelete(task._id);
    setIsModalOpen(false);
  };

  const statusStyles = {
    borderRadius: "5px",
    color: getStatusColor(status),
  };

  function getStatusColor(status) {
    switch (status) {
      case "not-started":
        return "#a3a2a2";
      case "in-progress":
        return "#72a4e6";
      case "done":
        return "#39dc7f";
      default:
        return "black";
    }
  }

  if (task) {
    return (
      <Card sx={{ marginBottom: 2, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">{task.title}</Typography>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant="body">
                <Tooltip title={task.assignedTo?.name || ""}>
                  Assigned to:{" "}
                  {task.assignedTo ? (
                    <Typography variant="body1" color="primary">
                      {task.assignedTo.username}
                    </Typography>
                  ) : (
                    "None"
                  )}
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Select
                value={status}
                onChange={handleChange}
                style={statusStyles}
                fullWidth
              >
                <MenuItem value="not-started">Not Started</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item>
              <IconButton onClick={handleExpandClick}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={openModal}>
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2">
              <strong>Description:</strong> {task.description}
            </Typography>
            <Typography variant="body2">
              <strong>Tags:</strong> {task.tags.join(", ")}
            </Typography>
            <Typography variant="body2">
              <strong>Deadline:</strong> {formattedDueDate}
            </Typography>
          </CardContent>
        </Collapse>
        <EditTask
          open={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          task={task}
          GroupMembers={group.members}
          groupId={group._id}
        />
      </Card>
    );
  }
};

export default Task;
