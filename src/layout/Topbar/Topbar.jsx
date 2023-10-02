import React, { useState, useContext, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

import ROUTES from "../../routes/routesModel";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import useGetUser from "../../hooks/useGetUser";

function ResponsiveAppBar() {
  const userContext = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // Define your breakpoint here

  const { isLoading, error, user, getUserDetails } = useGetUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.userToken,
      },
    });
    userContext.clearToken();
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSearch = (userId) => {
    navigate(`user/${userId}`);
  };

  // useEffect(() => {
  //   getAllUsers();
  //   console.log(users);
  // }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoDevIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TODO Collab
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(ROUTES.ABOUT);
                }}
              >
                <Typography textAlign="center">About</Typography>
              </MenuItem>

              {/* Dashboard  */}

              {!!userContext.userToken && (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(ROUTES.DASHBOARD);
                  }}
                >
                  <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
              )}

              {/* FAQ */}
              {!!userContext.userToken && (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(ROUTES.FAQ);
                  }}
                >
                  <Typography textAlign="center">FAQ</Typography>
                </MenuItem>
              )}

              {/* Search Bar */}
              {!!userContext.userToken && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <SearchBar onSearch={handleSearch} />
                </MenuItem>
              )}
            </Menu>
          </Box>

          {isSmallScreen && !!userContext.userToken ? (
            <IconButton
              size="large"
              aria-label="search"
              color="inherit"
              onClick={() => {
                // Handle the search icon click here
              }}
            >
              <SearchIcon />
            </IconButton>
          ) : (
            <>
              <LogoDevIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TODO Collab
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(ROUTES.ABOUT);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  About
                </Button>

                {/* Dashboard */}

                {!!userContext.userToken && (
                  <>
                    <Button
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate(ROUTES.DASHBOARD);
                      }}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Dashboard
                    </Button>

                    <Button
                      onClick={() => {
                        handleCloseNavMenu();
                        navigate(ROUTES.FAQ);
                      }}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      FAQ
                    </Button>

                    <Box display={"flex"} alignItems={"center"}>
                      <SearchBar onSearch={handleSearch} />
                    </Box>
                  </>
                )}
              </Box>
            </>
          )}

          {!!userContext.userToken && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={user.name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user.photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(ROUTES.USER_PROFILE);
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    handleLogout();
                  }}
                >
                  <Typography textAlign="center">Sign out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
