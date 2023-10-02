/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Divider, Grid, Typography, Tooltip, Link, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TaskIcon from "@mui/icons-material/Task";
import GroupIcon from "@mui/icons-material/Group";

import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import "./MyGroup.css";

import PropTypes from "prop-types";

import CustomCard from "../shared/components/UI/Card";

const MyGroup = (props) => {
  const { groupData } = props;
  const { title, description, membersCount, TasksCount } = groupData;

  const descriptionSection = () => {
    const muiDescription = description
      ? description
      : "No description for this Group";

    return (
      <Typography variant="body2" color="textSecondary">
        {muiDescription}
      </Typography>
    );
  };

  const theme = useTheme();
  const navigate = useNavigate();

  const SendUserToGroup = (id) => {
    navigate(`/group/${id}`);
  };

  return (
    <CustomCard
      onClick={() => {
        SendUserToGroup(props.groupData._id);
      }}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#dddddd",
          transition: "0.3s",
        },
      }}
    >
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      {descriptionSection()}
      <Box display="flex" alignItems="center" mt={2}>
        <GroupIcon color="primary" />
        <Typography variant="body1" ml={1}>
          {membersCount} Members
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={1}>
        <TaskIcon color="primary" />
        <Typography variant="body1" ml={1}>
          {TasksCount} Tasks
        </Typography>
      </Box>
    </CustomCard>
  );
};

export default MyGroup;
