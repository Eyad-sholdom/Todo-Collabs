/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Tooltip,
  CircularProgress,
  IconButton,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MembersList from "./MembersList";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import "./css/GroupDetails.css";
import AddTask from "./modal/AddTask";
import EditGroup from "./modal/EditGroup";
import Task from "./Task";
import { UserContext } from "../../contexts/userContext";
import AddMember from "./modal/AddMember";
import useGetUser from "../../hooks/useGetUser";

const GroupDetails = () => {
  const userContext = useContext(UserContext);

  const { isLoading, error: userError, user, getUserDetails } = useGetUser();

  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isAddModalOpen, closeAddModal] = useState(false);

  const [hasPremium, setHasPremium] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    getGroup();
    getTasks();
  }, []);

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (!!user && !!group) {
      return;
    }
    const isAdmin = group?.members.find(
      (member) => member._id === user._id && member.role === "Admin"
    );
    const isModerator = group?.members.find(
      (member) => member._id === user._id && member.role === "Moderator"
    );
    const isCreator = group?.createdBy === user._id;

    if (isAdmin || isModerator || isCreator) {
      setHasPremium(true);
    }
  }, [user, group]);

  const getGroup = async () => {
    try {
      const response = await fetch(`/api/group/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.userToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setGroup(() => data);
      getTasks();
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch(`/api/group/task/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.userToken,
        },
      });

      if (!response.ok) {
        setTasks([]);
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setTasks(() => data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openGroupEditModal = () => {
    setIsGroupModalOpen(true);
  };

  const closeGroupEditModal = () => {
    setIsGroupModalOpen(false);
  };

  const openAddGroupEditModal = () => {
    closeAddModal(true);
  };

  const closeAddGroupEditModal = () => {
    closeAddModal(false);
  };

  const onTaskDelete = async (taskId) => {
    try {
      fetch(`/api/group/task/${group._id}/${taskId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.userToken,
        },
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const data = await Promise.resolve(res.json());
        getGroup();
        getTasks();
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onTaskEdit = async () => {
    getGroup();
    getTasks();
  };

  const onAddMember = async (member) => {
    closeAddModal(false);
    try {
      fetch(`/api/group/${group._id}/addMember`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.userToken,
        },
        body: JSON.stringify({
          memberIds: [member],
        }),
      }).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        await Promise.resolve(res.json());
        getGroup();
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (group) {
    if (group) {
      return (
        <Paper className="group-details-container" sx={{ mb: 2 }}>
          <Grid container className="group-details-grid" height={"auto"}>
            <Grid item lg={8} md={11} sm={11} xs={11}>
              <Typography variant="h2" sx={{ fontWeight: 500 }} gutterBottom>
                {group.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {group.description}
              </Typography>

              {/* Edit Group Button if admin or moderator */}

              {hasPremium && (
                <IconButton onClick={openGroupEditModal}>
                  <Tooltip title="Edit Group">
                    <EditIcon sx={theme.icons} />
                  </Tooltip>
                </IconButton>
              )}

              <Divider style={{ margin: "20px 0" }} />
              <Grid
                className="tasks-grid"
                p={"5%"}
                container
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  maxHeight: "100%",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "5px", // Width of the scrollbar
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#888", // Color of the scrollbar thumb
                    borderRadius: "5px", // Rounded corners for the thumb
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#f1f1f1", // Color of the scrollbar track
                  },
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    ...theme.typography.title,
                    marginLeft: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Tasks: {group.tasks.length}
                </Typography>
                {tasks?.map((task, index) => (
                  <Grid item key={index}>
                    <Task
                      task={task}
                      group={group}
                      handleTaskDelete={onTaskDelete}
                      handleTaskEdit={onTaskEdit}
                    />
                  </Grid>
                ))}

                {/** check if user admin of not dont display  */}
                <Grid item justifyContent={"center"}>
                  <IconButton
                    className="create-group-IconeButton"
                    sx={{
                      backgroundColor: theme.palette.tertiary.main,
                    }}
                    onClick={openModal}
                  >
                    <Tooltip title="Add Task">
                      <AddIcon sx={{ ...theme.icons }} />
                    </Tooltip>
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid
                  className="members-grid"
                  container
                  pl={"5%"}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    minHeight: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={openAddGroupEditModal}
                  >
                    Add Members
                    <AddIcon
                      sx={{
                        color: "white",
                      }}
                    />
                  </Button>
                  <MembersList members={group.members} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <AddTask
            open={isModalOpen}
            handleClose={closeModal}
            group={group}
            handleTaskClose={() => getGroup()}
          />
          <EditGroup
            open={isEditGroupModalOpen}
            handleClose={closeGroupEditModal}
            group={group}
            onSave={() => {
              setIsGroupModalOpen(false);
              window.location.reload();
            }}
          />
          <AddMember
            open={isAddModalOpen}
            handleClose={closeAddGroupEditModal}
            group={group}
            handleAddMember={onAddMember}
          />
        </Paper>
      );
    }
    return null;
  }
};

export default GroupDetails;
