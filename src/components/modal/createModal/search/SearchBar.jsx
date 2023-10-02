import React, { useState, useRef } from "react";
import {
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItem,
  Grid,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/system";

function SearchBar({ allUsers, addToSelectedUsers }) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textFieldRef = useRef(null);

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setIsMenuOpen(true);

    if (value.trim() === "") {
      setSearchResults([]);
      setIsMenuOpen(false);
    } else {
      performSearch(value);
    }
  };

  const performSearch = (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const results = allUsers.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };
  const addUser = (user) => {
    addToSelectedUsers((prevSelectedUsers) => {
      // Check if the user already exists in prevSelectedUsers
      if (
        !prevSelectedUsers.some((existingUser) => existingUser._id === user._id)
      ) {
        // If the user doesn't exist, add them to the array
        return [...prevSelectedUsers, user];
      }

      // If the user already exists, return the current array as is
      return prevSelectedUsers;
    });
    setSearchQuery("");
    setIsMenuOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsMenuOpen(false);
    setSearchResults([]);
  };

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        marginBottom: "20px",
      }}
    >
      <TextField
        id="search-bar"
        fullWidth
        value={searchQuery}
        onChange={handleSearchInputChange}
        label="Search for a user"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {searchQuery ? (
                <IconButton onClick={clearSearch} edge="end">
                  <ClearIcon />
                </IconButton>
              ) : (
                <SearchIcon onClick={() => performSearch(searchQuery)} />
              )}
            </InputAdornment>
          ),
        }}
        inputRef={textFieldRef}
      />
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          padding: 3,
          display: isMenuOpen ? "block" : "none",
        }}
      >
        <Paper>
          <List>
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <ListItem key={user.id}>
                  <Grid container>
                    <Button
                      sx={{
                        display: "flex",
                        width: "35%",
                        justifyContent: "left",
                        borderRadius: "25px",
                        backgroundColor: theme.palette.background.card,
                        boxShadow: `1px 1px 8px ${theme.palette.boxShadow.main}`, // Box shadow for admin avatars
                      }}
                      onClick={() => {
                        addUser(user);
                      }}
                    >
                      <Grid item sx={{ pl: "1%" }}>
                        <Avatar alt={user.name} src={user.photo} />
                      </Grid>
                      <Grid item sx={{ pl: "2%" }}>
                        <Typography>{user.name}</Typography>
                      </Grid>
                    </Button>
                  </Grid>
                </ListItem>
              ))
            ) : (
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography>No User With This Name Found . . .</Typography>
              </ListItem>
            )}
          </List>
        </Paper>
      </div>
    </div>
  );
}

export default SearchBar;
