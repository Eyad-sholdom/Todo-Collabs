import { useState, useContext } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import CustomCard from "../shared/components/UI/Card";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import TaskIcon from "@mui/icons-material/Task";
import GroupIcon from "@mui/icons-material/Group";
import { UserContext } from "../contexts/userContext";

const Home = () => {
  const user = useContext(UserContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const [description, setDescription] = useState(true);

  const SendUser = () => {
    if (user.token) navigate(`/dashboard}`);
    else navigate("/login");
  };

  const descriptionSection = () => {
    const muiDescription = description
      ? "This Page Show how You See Your Groups "
      : "THIS WILL BE THE Group Description";

    return (
      <Typography variant="body2" color="textSecondary">
        {muiDescription}
      </Typography>
    );
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CustomCard
          onClick={SendUser}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#dddddd",
              transition: "0.3s",
            },
          }}
        >
          <Typography variant="h5" component="div">
            let Get Started
          </Typography>
          {descriptionSection()}
          <Box display="flex" alignItems="center" mt={2}>
            <GroupIcon color="primary" />
            <Typography variant="body1" ml={1}>
              Members : 7
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <TaskIcon color="primary" />
            <Typography variant="body1" ml={1}>
              Tasks : 14
            </Typography>
          </Box>
        </CustomCard>
      </Grid>
      <Grid item xs={6}>
        <CustomCard
          onClick={SendUser}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#dddddd",
              transition: "0.3s",
            },
          }}
        >
          <Typography variant="h5" component="div">
            Group Title
          </Typography>
          {descriptionSection()}
          <Box display="flex" alignItems="center" mt={2}>
            <GroupIcon color="primary" />
            <Typography variant="body1" ml={1}>
              Members
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <TaskIcon color="primary" />
            <Typography variant="body1" ml={1}>
              Tasks
            </Typography>
          </Box>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default Home;
