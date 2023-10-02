/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import MembersLine from "./MembersLine";

import PropTypes from "prop-types";

const MembersList = ({ members }) => {
  const [admins, setAdmins] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [normalMembers, setNormalMembers] = useState([]);

  useEffect(() => {
    setAdmins(members.filter((member) => member.role === "Admin"));
    setModerators(members.filter((member) => member.role === "Moderator"));
    setNormalMembers(members.filter((member) => member.role === "Normal"));
  }, [members]);

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      sx={{
        backgroundColor: "background.default",
        borderRadius: 2,
        p: 2,
        gap: 2,
      }}
    >
      {[
        { role: "Admin", members: admins },
        { role: "Members", members: normalMembers },
      ].map(({ role, members }) => (
        <Grid item key={role}>
          <Typography variant="h6">{role}:</Typography>
          <MembersLine members={members} />
        </Grid>
      ))}
    </Grid>
  );
};

MembersList.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MembersList;
