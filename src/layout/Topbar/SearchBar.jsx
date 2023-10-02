/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  styled,
  alpha,
  InputBase,
  Grid,
  Popper,
  useTheme,
  Divider,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  Avatar,
} from "@mui/material";

import { Box } from "@mui/system";
import { UserContext } from "../../contexts/userContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = ({ onSearch }) => {
  const userContext = useContext(UserContext);
  const theme = useTheme();

  const [users, setUsers] = useState([]);

  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);

  const inputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/user/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userContext.userToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json(); // Invoking the json() method
      })
      .then((data) => {
        // Handle the data here
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [userContext.userToken]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);

    const filteredResults = users.filter((user) => {
      const name = user.name.toLowerCase();
      const username = user.username.toLowerCase();
      const email = user.email.toLowerCase();
      const query = value.toLowerCase();

      return (
        name.includes(query) ||
        username.includes(query) ||
        email.includes(query)
      );
    });
    setFilteredResults(() => filteredResults);
    setOpen(() => filteredResults.length > 0);
  };

  return (
    <Grid container>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          inputRef={inputRef}
          onChange={handleSearch}
          onClick={() => query.length && setOpen(true)}
          value={query}
        />
      </Search>

      {/* Popper with searched result  */}

      {open && (
        <Popper
          ref={wrapperRef}
          open={open}
          anchorEl={inputRef.current}
          placement="bottom-start"
          style={{ zIndex: 999 }} // Ensure the popper appears above other elements
        >
          <Box
            sx={{
              p: 2,
              width: "auto",
              maxWidth: 250,
              minWidth: 250,
              borderRadius: 1,
              backgroundColor: theme.palette.background.paper,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              maxHeight: 400,
              overflowY: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <Typography variant="body1" color="primary">
              Search results
            </Typography>
            <Divider sx={{ my: 1 }} />

            {loading && (
              <Typography variant="body1" color="primary">
                Loading...
              </Typography>
            )}

            {filteredResults.map((result) => (
              <Stack
                key={result._id}
                onClick={() => {
                  onSearch(result._id);
                  setOpen(false);
                }}
                mb={2}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: 1,
                  },
                }}
              >
                <Grid container gap={1} flexWrap={"nowrap"}>
                  <Tooltip title="Open settings">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt={result.name} src={result.photo} />
                    </IconButton>
                  </Tooltip>

                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ flexGrow: 1, fontWeight: 600 }}
                  >
                    {result.name}
                    <Typography
                      variant="caption"
                      color="tertiary"
                      sx={{ flexGrow: 1 }}
                    >
                      #{result.username.split("#")[1]}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      fontSize={12}
                      sx={{ flexGrow: 1 }}
                    >
                      {result.email}
                    </Typography>
                  </Typography>
                </Grid>
              </Stack>
            ))}
          </Box>
        </Popper>
      )}
    </Grid>
  );
};

export default SearchBar;
