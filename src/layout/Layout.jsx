import { Box, CssBaseline, Grid } from "@mui/material";
import Topbar from "./Topbar/Topbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <CssBaseline />
      <Grid container direction="column" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={12} lg={12}>
          <Topbar />
        </Grid>

        <Grid
          item
          container
          xs={12}
          md={12}
          lg={12}
          // this is the trick to make the footer stick to the bottom
          style={{ flex: "1 0 auto" }}
          p={2}
        >
          <Outlet />
        </Grid>

        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
