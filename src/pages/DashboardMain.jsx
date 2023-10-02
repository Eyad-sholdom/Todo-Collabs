import { useContext, useEffect, useState } from "react";
import { Grid, Typography, IconButton, Tooltip } from "@mui/material";
import Groups2Icon from "@mui/icons-material/Groups2";
import MyGroup from "../components/MyGroup";
import MyModal from "../components/modal/createModal/MyModal";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import "./css/dashboard.css";
import { UserContext } from "../contexts/userContext";
import ROUTES from "../routes/routesModel";
import { useNavigate } from "react-router";

const DashboardMain = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const theme = useTheme();
  const [openGroup, setOpenGroup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const getGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/group/groups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userContext.userToken,
        },
      });
      if (response.status === 401) {
        userContext.clearToken();
        navigate(ROUTES.LOGIN);
        return;
      }

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    } finally {
      setLoading(false);
      setGroups((prev) => prev);
    }
  };

  const onGroupCreatedHandler = () => {
    getGroups();
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleOpenGroup = () => setOpenGroup(true);
  const handleCloseGroup = () => setOpenGroup(false);

  const GroupsSections = () => {
    return (
      <>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={group._id}>
            <MyGroup groupData={group} handleOpenGroup={handleOpenGroup} />
          </Grid>
        ))}
        <IconButton
          className="create-group-IconeButton"
          sx={{
            backgroundColor: theme.palette.tertiary.main,
            position: "absolute",
            bottom: "15%",
            right: "20%",
          }}
          onClick={handleOpenGroup}
        >
          <Tooltip title="Create New Group">
            <AddIcon sx={{ ...theme.icons }} />
          </Tooltip>
        </IconButton>
      </>
    );
  };

  const NoGroupsSection = () => {
    return (
      <>
        <Grid>
          <Groups2Icon sx={{ ...theme.icons, fontSize: "15rem" }} />
          <Typography variant="h5" sx={theme.typography.title}>
            There are no groups joined or created, let&rsquo;s start
          </Typography>
          <Grid className="create-buttons-grid" item xs={12}>
            <IconButton
              className="create-group-IconeButton"
              sx={{
                backgroundColor: theme.palette.tertiary.main,
              }}
              onClick={handleOpenGroup}
            >
              <Tooltip title="Create Group">
                <AddIcon sx={{ ...theme.icons }} />
              </Tooltip>
            </IconButton>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid
          item
          container
          xs={12}
          md={12}
          lg={12}
          justifyContent={"center"}
          spacing={2}
        >
          {loading && <Typography variant="h5">Loading...</Typography>}
          {!loading && groups.length === 0 && NoGroupsSection()}
          {!loading && groups.length > 0 && GroupsSections()}
        </Grid>
      </Grid>
      <MyModal
        open={openGroup}
        handleClose={handleCloseGroup}
        onGroupCreated={onGroupCreatedHandler}
      />
    </>
  );
};

export default DashboardMain;
